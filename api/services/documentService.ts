import api from '../axiosConfig';

export const uploadDocuments = async (
    idtipdocusu: number,
    num: string,
    frontImageUri: string,
    backImageUri: string
) => {
    try {
        const formData = new FormData();

        // 1. Datos normales de texto
        formData.append('idtipdocusu', idtipdocusu.toString());
        formData.append('num', num);

        // 2. Extraer nombre de la foto (Anverso) y adjuntarlo
        const frontFilename = frontImageUri.split('/').pop() || 'front_doc.jpg';
        formData.append('anverso', {
            uri: frontImageUri,
            name: frontFilename,
            type: 'image/jpeg',
        } as any);

        // 3. Extraer nombre de la foto (Reverso) y adjuntarlo
        const backFilename = backImageUri.split('/').pop() || 'back_doc.jpg';
        formData.append('reverso', {
            uri: backImageUri,
            name: backFilename,
            type: 'image/jpeg',
        } as any);

        // 4. Enviar con Axios (Nuestra configuración interceptará esto y le pegará tu Token de Sanctum)
        const response = await api.post('/user/documents/upload', formData, {
            headers: {
                // Obligatorio para enviar archivos pesados en React Native
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error: any) {
        if (error.response && error.response.status === 422) {
            console.error('Laravel rechazó esto por validación:', error.response.data);
            throw new Error(error.response.data.message || 'Datos incompletos o fotos muy pesadas');
        } else {
            console.error('Error subiendo:', error);
            throw new Error('Hubo un error de conexión al tratar de subir los archivos');
        }
    }
};

// Esta segunda función servirá para saber si el Administrador ya lo aprobó
export const getMyDocuments = async () => {
    try {
        const response = await api.get('/user/documents');
        return response.data.data;
    } catch (error) {
        throw new Error('No se pudo verificar el estado de tus documentos');
    }
};

// Esta función obtiene los tipos de documentos disponibles (Cédula, etc)
export const getDocumentTypes = async () => {
    try {
        const response = await api.get('/user/documents/types');
        return response.data.data; // Devuelve [{id: 1, nom: 'Cédula', des: '...'}, ...]
    } catch (error) {
        throw new Error('No se pudieron cargar los tipos de documento');
    }
};
