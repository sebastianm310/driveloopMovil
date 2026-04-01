import api from "../axiosConfig";

//Metodo para obtener la informacion del usuario
export const getInfoUser = async () => {
    try {
        // Gracias a axiosConfig, el token viaja automáticamente
        const response = await api.get('/info-user');
        // Retornamos la respuesta con la info del usuario
        return response.data.data;
    } catch (error: any) {
        // Manejamos el error de forma segura en caso de que la respuesta venga vacía
        const message = error.response?.data?.message || 'Error al obtener la información del usuario';
        throw new Error(message);
    }
};

//Metodo para actualizar el correo
/**
 * Envía el nuevo correo electrónico a Laravel.
 * @param newEmail El nuevo correo electrónico ingresado
 */
export const updateEmailUser = async (newEmail: string) => {
    try {
        const response = await api.put('/user/email', {
            email: newEmail,
        });
        // Retornamos toda la data de la respuesta, que incluirá el 'message'
        return response.data;
    } catch (error: any) {
        // 1. Manejo específico para errores de validación de Laravel (HTTP 422)
        if (error.response && error.response.status === 422) {
            // Laravel envía los errores de validación dentro de un objeto "errors"
            const validationErrors = error.response.data.errors;
            if (validationErrors && validationErrors.email) {
                // validationErrors.email es un arreglo, tomamos el primer mensaje de error
                throw new Error(validationErrors.email[0]);
            }
        }
        // 2. Manejo genérico para cualquier otro error (ej. 401, 500, etc.)
        const message = error.response?.data?.message || 'Error al intentar actualizar el correo';
        throw new Error(message);
    }
};

//Metodo para reenviar el correo de verificacion
export const resendVerificationEmail = async () => {
    try {
        const response = await api.post('/user/email/resend');
        return response.data;
    } catch (error: any) {
        const message = error.response?.data?.message || 'Error al reenviar el correo';
        throw new Error(message);
    }
};

//Metodo para actualizar el numero de telefono
/**
 * Envía el nuevo número de teléfono a Laravel.
 * @param newPhoneNumber El nuevo número de teléfono ingresado
 */
export const updatePhoneNumberUser = async (newPhoneNumber: string) => {
    try {
        const response = await api.put('/user/phone', {
            tel: newPhoneNumber,
        });
        // Retornamos toda la data de la respuesta, que incluirá el 'message'
        return response.data;
    } catch (error: any) {
        // 1. Manejo específico para errores de validación de Laravel (HTTP 422)
        if (error.response && error.response.status === 422) {
            // Laravel envía los errores de validación dentro de un objeto "errors"
            const validationErrors = error.response.data.errors;
            if (validationErrors && validationErrors.tel) {
                // validationErrors.phone es un arreglo, tomamos el primer mensaje de error
                throw new Error(validationErrors.tel[0]);
            }
        }
        // 2. Manejo genérico para cualquier otro error (ej. 401, 500, etc.)
        const message = error.response?.data?.message || 'Error al intentar actualizar el número de teléfono';
        throw new Error(message);
    }
};

export const getReservationsUser = async () => {
    try {
        const response = await api.get('/user/reservations');
        return response.data;
    } catch (error: any) {
        const message = error.response?.data?.message || 'Error al obtener las reservas';
        throw new Error(message);
    }
};



