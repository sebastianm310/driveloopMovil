import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Text, View } from 'react-native';
import { updatePhoneNumberUser } from '../../../api/services/infoUserService';
import CustomButton from '../../../components/CustomButton';
import CustomInput from '../../../components/CustomInput';
import ScreenLayout from '../../../components/ScreenLayout';

export default function UpdatePhoneNumber() {
    const router = useRouter();
    const [newPhoneNumber, setNewPhoneNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    //Metodo para actualizar el correo y demas validaciones
    const handleUpdate = async () => {
        //Validacion de que sea un numero de telefono
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(newPhoneNumber) || !newPhoneNumber) {
            Alert.alert('Precaución', 'Debes ingresar un número de teléfono válido');
            return;
        }
        setIsLoading(true);
        try {
            await updatePhoneNumberUser(newPhoneNumber);
            Alert.alert('Éxito', 'Número de teléfono actualizado correctamente');
            router.replace('/(tabs)/profile/profileInfo');
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
                    <Text className="text-xl font-roboto-bold text-secondary">Actualizar Número de Teléfono</Text>
                </View>
            </View>

            <View className="flex-1 mt-72 px-4">
                <Text className="text-base text-gray-600 mb-4">
                    Ingresa tu nuevo número de teléfono.
                </Text>
                <View className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8">
                    <CustomInput
                        placeholder="Nuevo Número de Teléfono"
                        icon={<MaterialIcons name="phone" size={20} color="#6B7280" />}
                        value={newPhoneNumber}
                        onChangeText={setNewPhoneNumber}
                        keyboardType="phone-pad"
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
