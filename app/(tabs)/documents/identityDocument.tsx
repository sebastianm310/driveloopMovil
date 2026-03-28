import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { Alert, Text, View, ActivityIndicator, Modal, FlatList, TouchableOpacity } from 'react-native';
import { uploadDocuments, getMyDocuments, getDocumentTypes } from '../../../api/services/documentService';
import CustomButton from '../../../components/CustomButton';
import DocumentFieldCard from '../../../components/DocumentFieldCard';
import DocumentUploadCard from '../../../components/DocumentUploadCard';
import ScreenLayout from '../../../components/ScreenLayout';

const IdentityDocument = () => {
    const router = useRouter();

    // 1. Estados para atrapar los datos del usuario
    const [docNumber, setDocNumber] = useState('');
    const [frontUri, setFrontUri] = useState<string | null>(null);
    const [backUri, setBackUri] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [docStatus, setDocStatus] = useState<string | null>(null);
    const [isChecking, setIsChecking] = useState(true);
    const [docTypes, setDocTypes] = useState<any[]>([]);
    const [selectedDocType, setSelectedDocType] = useState<any>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    // Consulta inicial del estado y los tipos en Laravel
    useEffect(() => {
        const loadInitialData = async () => {
            try {
                // 1. Cargar todos los tipos de documento desde Laravel
                const types = await getDocumentTypes();
                setDocTypes(types);
                if (types.length > 0) {
                    setSelectedDocType(types[0]); // Dejar uno seleccionado por defecto para que no estè vacio
                }

                // 2. Verificar si el usuario ya subió algo
                const docs = await getMyDocuments();
                // Evitamos el tipo 2 que es licencia. Asumimos el resto como identidad
                const myDoc = docs.find((d: any) => d.idtipdocusu !== 2); 
                if (myDoc) {
                    setDocStatus(myDoc.estado);
                }
            } catch (error) {
                console.log('Error al verificar estado:', error);
            } finally {
                setIsChecking(false);
            }
        };
        loadInitialData();
    }, []);

    // 2. Función maestra que conecta los datos con Laravel
    const handleUpload = async () => {
        // Validación básica
        if (!docNumber.trim()) {
            Alert.alert('Faltan datos', 'Por favor ingresa tu número de documento.');
            return;
        }
        if (!frontUri || !backUri) {
            Alert.alert('Faltan fotos', 'Debes tomar la foto del anverso y reverso.');
            return;
        }

        setIsLoading(true);
        try {
            // Enviamos el ID del tipo de documento seleccionado dinámicamente y los datos
            await uploadDocuments(selectedDocType.id, docNumber, frontUri, backUri);

            Alert.alert('¡Documento guardado!', 'Tus fotos se enviaron correctamente para revisión.', [
                { text: 'OK', onPress: () => router.back() } // Lo mandamos de regreso a la lista
            ]);
        } catch (error: any) {
            Alert.alert('Error', error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ScreenLayout>
            {/* Header */}
            <View className="flex-row items-center mt-4 mb-10">
                <CustomButton
                    variant="textOnly"
                    iconLeft={<MaterialIcons name="arrow-back" size={24} color="#111111" />}
                    onPress={() => router.back()}
                />
                <View className="flex-1 items-center mr-8">
                    <Text className="text-xl font-roboto-bold text-secondary">Documento de Identidad</Text>
                </View>
            </View>

            <View className="flex-1 justify-between">
                {isChecking ? (
                    <View className="flex-1 justify-center items-center">
                        <ActivityIndicator size="large" color="#C91843" />
                        <Text className="text-gray-500 mt-4 font-roboto-medium">Consultando estado...</Text>
                    </View>
                ) : docStatus === 'PENDIENTE' || docStatus === 'APROBADO' ? (
                    <View className="flex-1 justify-center items-center px-4">
                        <MaterialIcons 
                            name={docStatus === 'APROBADO' ? "check-circle" : "hourglass-empty"} 
                            size={80} 
                            color={docStatus === 'APROBADO' ? "#10B981" : "#F59E0B"} 
                        />
                        <Text className="text-2xl font-roboto-bold text-secondary mt-6 text-center">
                            {docStatus === 'APROBADO' ? "Documento Aprobado" : "En Revisión"}
                        </Text>
                        <Text className="text-gray-500 text-center mt-2 font-roboto-light text-base">
                            {docStatus === 'APROBADO' 
                                ? "Tu documento de identidad ha sido verificado exitosamente."
                                : "Tu documento está siendo revisado por nuestro equipo. Te notificaremos pronto."}
                        </Text>
                    </View>
                ) : (
                    <>
                        <View>
                            {docStatus === 'RECHAZADO' && (
                                <View className="bg-red-50 p-4 rounded-xl mb-4 border border-red-200">
                                    <Text className="text-red-600 font-roboto-bold text-base mb-1">Documento Rechazado</Text>
                                    <Text className="text-red-500 font-roboto-light text-sm">Por favor, asegúrate de que tus fotos sean nítidas y vuelve a enviarlas.</Text>
                                </View>
                            )}
                            <DocumentFieldCard
                                label="Tipo de Documento"
                                isDropdown={true}
                                value={selectedDocType ? selectedDocType.nom : 'Cargando...'}
                                onPressDropdown={() => setIsModalVisible(true)}
                            />

                            {/* Atrapamos el número limitando a 10 dígitos numéricos */}
                            <DocumentFieldCard
                                label="Número de Documento"
                                value={docNumber}
                                onChangeText={setDocNumber}
                                placeholder="Ej. 1000222333"
                                maxLength={10}
                                keyboardType="numeric"
                            />

                    {/* Atrapamos las rutas de las fotos */}
                    <DocumentUploadCard
                        label="Fotos del Documento (Anverso y Reverso)"
                        onImagesSelected={(front, back) => {
                            setFrontUri(front);
                            setBackUri(back);
                        }}
                    />
                </View>

                {/* Botón Inteligente */}
                <View className="mb-24 mt-6">
                    <CustomButton
                        title={isLoading ? "SUBIENDO..." : "SUBIR IDENTIDAD"}
                        onPress={handleUpload}
                        disabled={isLoading}
                        style={{ borderRadius: 12, opacity: isLoading ? 0.7 : 1 }}
                    />
                </View>
                    </>
                )}
            </View>

            {/* Modal flotante personalizado para elegir tipo de documento */}
            <Modal visible={isModalVisible} transparent animationType="fade">
                <View className="flex-1 justify-end bg-black/50">
                    <View className="bg-white rounded-t-3xl p-6 h-1/2">
                        <Text className="text-xl font-roboto-bold text-secondary mb-4">Selecciona un tipo</Text>
                        <FlatList
                            data={docTypes}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity 
                                    className="py-4 border-b border-gray-100"
                                    onPress={() => {
                                        setSelectedDocType(item);
                                        setIsModalVisible(false);
                                    }}
                                >
                                    <Text className="text-base font-roboto-medium text-secondary px-2">{item.nom}</Text>
                                    {item.des && <Text className="text-sm text-gray-500 mt-1 px-2">{item.des}</Text>}
                                </TouchableOpacity>
                            )}
                        />
                        <View className="mt-4">
                            <CustomButton 
                                title="CANCELAR" 
                                variant="outline" 
                                onPress={() => setIsModalVisible(false)} 
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </ScreenLayout>
    );
};

export default IdentityDocument;
