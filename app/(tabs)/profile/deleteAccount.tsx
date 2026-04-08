import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Text, View } from 'react-native';

// Importa el nuevo servicio de borrado y el de logout
import { deleteAccountUser, logoutUser } from '../../../api/services/authService';

import CustomButton from '../../../components/CustomButton';
import CustomInput from '../../../components/CustomInput';
import ScreenLayout from '../../../components/ScreenLayout';

export default function DeleteAccount() {
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // 1. Método para pedir confirmación antes de eliminar
    const confirmDelete = () => {
        if (!password) {
            Alert.alert('Precaución', 'Debes ingresar tu contraseña actual para continuar.');
            return;
        }

        // UX: Doble confirmación en pantalla
        Alert.alert(
            'Confirmación Crítica',
            '¿Estás completamente seguro de que quieres eliminar tu cuenta?\nEsta acción es irreversible y perderás todos tus datos.',
            [
                { text: 'Cancelar', style: 'cancel' },
                // Si el usuario presiona "Sí", ejecutamos el borrado
                { text: 'Sí, eliminar cuenta', style: 'destructive', onPress: executeDelete }
            ]
        );
    };

    // 2. Método que se conecta al proyecto web
    const executeDelete = async () => {
        setIsLoading(true);
        try {
            // Procesa y valida la contraseña
            await deleteAccountUser(password);

            Alert.alert('Éxito', 'Tu cuenta ha sido eliminada permanentemente.');

            // Si el proyecto web dijo OK, limpiamos el SecureStore de la sesión actual
            await logoutUser();

            // Lo enviamos fuera de la app
            router.replace('/login');
        } catch (error: any) {
            // Si la contraseña era incorrecta o hubo error, caerá aquí
            Alert.alert('Error', error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ScreenLayout>
            {/* Header / Botón Volver */}
            <View className="flex-row items-center mt-4">
                <CustomButton
                    variant="textOnly"
                    iconLeft={<MaterialIcons name="arrow-back" size={24} color="#111111" />}
                    onPress={() => router.back()}
                />
                <View className="flex-1 items-center mr-8">
                    <Text className="text-xl font-roboto-bold text-red-600">Eliminar Cuenta</Text>
                </View>
            </View>

            {/* Contenido */}
            <View className="flex-1 mt-60 px-4">
                <Text className="text-base text-gray-600 mb-8 leading-6 text-justify">
                    Una vez que se elimine su cuenta, todos sus recursos y datos se eliminarán de forma permanente.
                    Ingrese su contraseña actual para confirmar su identidad y proceder.
                </Text>

                {/* Input de Contraseña */}
                <View className="bg-white p-4 rounded-xl shadow-sm border border-red-100 mb-8">
                    <CustomInput
                        placeholder="Contraseña actual"
                        icon={<MaterialIcons name="lock" size={20} color="#6B7280" />}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={true} // Obligatorio para ocular la contraseña
                        autoCapitalize="none"
                    />
                </View>

                {/* Botón de Acción */}
                {isLoading ? (
                    <ActivityIndicator size="large" color="#C91843" />
                ) : (
                    <CustomButton
                        title="Eliminar mi cuenta"
                        onPress={confirmDelete}
                        variant="outline"
                    />
                )}
            </View>
        </ScreenLayout>
    );
}
