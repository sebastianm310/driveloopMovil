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
