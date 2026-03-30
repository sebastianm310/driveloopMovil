import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// Configuramos la instancia de axios
const api = axios.create({
    baseURL: 'https://driveloop.ddns.net/api',
    // Lo dejo aqui para ajustarlo con la url real de la api
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // Esto es porque laravel me devuelve errores de validacion en formato JSON

    },
});

// El Interceptor, esta funcion se ejecutara antes de cada peticion
api.interceptors.request.use(
    async (config) => {
        try {
            //Aca se busca si tenemos un token guardado en la bobeda de la app
            const token = await SecureStore.getItemAsync('userToken');


            //Si existe, se lo pega como un "carnet" a todas las peticiones
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (error) {
            console.error("Error al obtener el token de SecureStore:", error);
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Exportamos esto para usarlo en toda la app
export default api;