import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Text, View } from 'react-native';
import { updateEmailUser } from '../../../api/services/infoUserService';
import CustomButton from '../../../components/CustomButton';
import CustomInput from '../../../components/CustomInput';
import ScreenLayout from '../../../components/ScreenLayout';

export default function UpdateEmail() {
    const router = useRouter();
    const [newEmail, setNewEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    //Metodo para actualizar el correo y demas validaciones
    const handleUpdate = async () => {
        if (!newEmail) {
            Alert.alert('Precaución', 'Debes ingresar un correo electrónico');
            return;
        }
        setIsLoading(true);
        try {
            await updateEmailUser(newEmail);
            Alert.alert('Éxito', 'Correo electrónico actualizado correctamente');
            //debe verificar su correo para continuar en la app
            router.replace('/(auth)/verifyEmail');
        } catch (error: any) {
            Alert.alert('Error', error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ScreenLayout>
            <View className="flex-row items-center mt-4">
                <CustomButton
                    variant="textOnly"
                    iconLeft={<MaterialIcons name="arrow-back" size={24} color="#111111" />}
                    onPress={() => router.back()}
                />
                <View className="flex-1 items-center mr-8">
                    <Text className="text-xl font-roboto-bold text-secondary">Actualizar Correo</Text>
                </View>
            </View>

            <View className="flex-1 mt-72 px-4">
                <Text className="text-base text-gray-600 mb-4">
                    Ingresa tu nuevo correo electrónico. Te enviaremos un enlace de verificación.
                </Text>

                <View className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8">
                    <CustomInput
                        placeholder="Nuevo Correo"
                        icon={<MaterialIcons name="email" size={20} color="#6B7280" />}
                        value={newEmail}
                        onChangeText={setNewEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>
                {isLoading ? (
                    <ActivityIndicator size="large" color="#C91843" />
                ) : (
                    <CustomButton
                        title="Guardar Cambios"
                        onPress={handleUpdate}
                    />
                )}
            </View>
        </ScreenLayout>
    );
}
