import * as SecureStore from 'expo-secure-store';
import api from '../axiosConfig';

export const loginUser = async (email: string, password: string) => {
    try {
        //Armamos el "paquete" con los 3 datos que nos da la api de Laravel
        const requestData = {
            email: email,
            password: password,
            device_name: 'Mobile'

            //Mantenemos la sesion identificada en Sanctum
        };
        //Se dispara la peticion, Axios le sumara el baseURL automaticamente
        //El destino final sera http://[IP_ADDRESS]/api/login
        const response = await api.post('/login', requestData);

        //Si todo sale bien, la API nos devuelve el Token y los datos del usuario
        const token = response.data.data.user.token;
        const userData = response.data.data.user;
        console.log(token);
        console.log(userData);

        //Guardamos el Token de forma segura en el dispositivo
        await SecureStore.setItemAsync('userToken', token);
        await SecureStore.setItemAsync('userData', JSON.stringify(userData));

        //Devolvemos la informacion al formulario que hizo el llamado
        return userData;
    } catch (error: any) {
        // Si laravel devuelve el error 422, Axios salta de una para aca
        if (error.response && error.response.status === 422) {
            throw new Error(error.response.data.message || 'Credenciales incorrectas');
        } else {
            throw new Error('Error de conexion o el servidor no responde');
        }
    }
};

//Esta seria la funcion de cerrar sesion
export const logoutUser = async () => {
    await SecureStore.deleteItemAsync('userToken');
    await SecureStore.deleteItemAsync('userData');
};

export const requestPasswordReset = async (email: string) => {
    try {
        // Se hace la petición POST al endpoint de tu backend Laravel
        const response = await api.post('/forgot-password', { email });
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.status === 400) {
            throw new Error(error.response.data.message || 'No se pudo enviar el correo de recuperación.');
        } else {
            throw new Error('Error de conexión o el servidor no responde.');
        }
    }
};
/**
 * Registra un nuevo usuario enviando los datos a la API de Laravel.
 * Si el registro es exitoso, guarda el token y los datos del usuario localmente.
 * 
 * @param userData Objeto con name, last_name, email, password y password_confirmation.
 * @returns Los datos del usuario registrado.
 * @throws Error con un mensaje descriptivo si la validación falla o hay error de red.
 */
export const registerUser = async (userData: any) => {
    try {
        // Combinamos los datos del formulario con el nombre del dispositivo requerido por Sanctum
        const requestData = {
            ...userData,
            device_name: 'Mobile' // Identificador para la sesión de este dispositivo
        };

        // Realizamos la petición POST al endpoint definido en el backend Laravel (/api/register)
        const response = await api.post('/register', requestData);

        // Extraemos el token y el perfil del usuario de la respuesta estructurada de la API
        const token = response.data.data.user.token;
        const user = response.data.data.user;

        // Almacenamos el Token de forma segura para usarlo en futuras peticiones (Bearer Auth)
        await SecureStore.setItemAsync('userToken', token);
        // Guardamos los datos básicos del usuario para mostrarlos en el perfil sin consultar la API de nuevo
        await SecureStore.setItemAsync('userData', JSON.stringify(user));

        return user;
    } catch (error: any) {
        console.error("DEBUG: Error en registro:", error);

        // El servidor respondió con un error (4xx o 5xx)
        if (error.response) {
            const status = error.response.status;
            const data = error.response.data;

            if (status === 422) {
                // Error de validación (ej. email duplicado)
                const errors = data.errors;
                const firstError = Object.values(errors)[0] as string[];
                throw new Error(firstError[0] || 'Error de validación');
            } else if (status === 419) {
                throw new Error('Sesión expirada o falta de protección CSRF');
            } else if (status === 500) {
                // Error interno del servidor; mostramos el mensaje que mande Laravel si está disponible
                throw new Error(data.message || 'Error interno en el servidor de la web');
            } else {
                throw new Error(`Error ${status}: ${data.message || 'Respuesta inesperada del servidor'}`);
            }
        }
        // El servidor no respondió o la petición no se mandó (caída de internet, URL invalida)
        else if (error.request) {
            throw new Error('No se pudo establecer conexión con el servidor. Verifica tu internet o la URL de la API.');
        }
        // Algo pasó al configurar la petición
        else {
            throw new Error(error.message || 'Error desconocido al procesar el registro');
        }
    }
};
