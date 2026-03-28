import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { Alert, Text, View, ActivityIndicator } from 'react-native';
import { uploadDocuments, getMyDocuments } from '../../../api/services/documentService';
import CustomButton from '../../../components/CustomButton';
import DocumentFieldCard from '../../../components/DocumentFieldCard';
import DocumentUploadCard from '../../../components/DocumentUploadCard';
import ScreenLayout from '../../../components/ScreenLayout';

const DrivingLicense = () => {
    const router = useRouter();

    const [licenseNumber, setLicenseNumber] = useState('');
    const [frontUri, setFrontUri] = useState<string | null>(null);
    const [backUri, setBackUri] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [docStatus, setDocStatus] = useState<string | null>(null);
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        const verifyStatus = async () => {
            try {
                const docs = await getMyDocuments();
                const myDoc = docs.find((d: any) => d.idtipdocusu === 2); // 2 = Licencia
                if (myDoc) {
                    setDocStatus(myDoc.estado);
                }
            } catch (error) {
                console.log('Error al verificar estado:', error);
            } finally {
                setIsChecking(false);
            }
        };
        verifyStatus();
    }, []);

    const handleUpload = async () => {
        if (!licenseNumber.trim()) {
            Alert.alert('Faltan datos', 'Por favor ingresa tu número de licencia.');
            return;
        }
        if (!frontUri || !backUri) {
            Alert.alert('Faltan fotos', 'Debes tomar la foto del anverso y reverso de tu licencia.');
            return;
        }

        setIsLoading(true);
        try {
            // Enviamos el código 2 (Licencia de Conducción en tu BD)
            await uploadDocuments(2, licenseNumber, frontUri, backUri);

            Alert.alert('¡Licencia guardada!', 'Tus fotos se enviaron correctamente para revisión.', [
                { text: 'OK', onPress: () => router.back() }
            ]);
        } catch (error: any) {
            Alert.alert('Error', error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ScreenLayout>
            <View className="flex-row items-center mt-4 mb-10">
                <CustomButton
                    variant="textOnly"
                    iconLeft={<MaterialIcons name="arrow-back" size={24} color="#111111" />}
                    onPress={() => router.back()}
                />
                <View className="flex-1 items-center mr-8">
                    <Text className="text-xl font-roboto-bold text-secondary">Licencia de Conducción</Text>
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
                            {docStatus === 'APROBADO' ? "Licencia Aprobada" : "En Revisión"}
                        </Text>
                        <Text className="text-gray-500 text-center mt-2 font-roboto-light text-base">
                            {docStatus === 'APROBADO' 
                                ? "Tu licencia ha sido verificada exitosamente."
                                : "Tu licencia está siendo revisada por nuestro equipo. Te notificaremos pronto."}
                        </Text>
                    </View>
                ) : (
                    <>
                        <View>
                            {docStatus === 'RECHAZADO' && (
                                <View className="bg-red-50 p-4 rounded-xl mb-4 border border-red-200">
                                    <Text className="text-red-600 font-roboto-bold text-base mb-1">Licencia Rechazada</Text>
                                    <Text className="text-red-500 font-roboto-light text-sm">Por favor, asegúrate de que la licencia esté vigente y vuelve a intentarlo.</Text>
                                </View>
                            )}
                            <DocumentFieldCard
                                label="Número de Licencia"
                                value={licenseNumber}
                                onChangeText={setLicenseNumber}
                                placeholder="Ej. 1000222333"
                                maxLength={10}
                                keyboardType="numeric"
                            />

                    <DocumentUploadCard
                        label="Fotos de la Licencia (Anverso y Reverso)"
                        onImagesSelected={(front, back) => {
                            setFrontUri(front);
                            setBackUri(back);
                        }}
                    />
                </View>

                <View className="mb-24 mt-6">
                    <CustomButton
                        title={isLoading ? "SUBIENDO..." : "SUBIR LICENCIA"}
                        onPress={handleUpload}
                        disabled={isLoading}
                        style={{ borderRadius: 12, opacity: isLoading ? 0.7 : 1 }}
                    />
                </View>
                    </>
                )}
            </View>
        </ScreenLayout>
    );
};

export default DrivingLicense;
