import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Text, View, Alert } from 'react-native';
import CustomButton from '../../../components/CustomButton';
import PasswordUpdateCard from '../../../components/PasswordUpdateCard';
import ScreenLayout from '../../../components/ScreenLayout';
import api from '../../../api/axiosConfig';

const UpdatePassword = () => {
    const router = useRouter();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleConfirm = async () => {
        // Validamos que el usuario haya llenado todos los campos antes de intentar enviar
        if (!currentPassword || !newPassword || !confirmPassword) {
            Alert.alert("Error", "Todos los campos son obligatorios.");
            return;
        }

        // Verificamos que la nueva contraseña y la confirmación coincidan exactamente
        if (newPassword !== confirmPassword) {
            Alert.alert("Error", "Las contraseñas nuevas no coinciden.");
            return;
        }

        try {
            // Activamos el indicador de carga para evitar toques dobles al botón
            setIsLoading(true);
            
            // Enviamos los datos al backend. 'api' automáticamente inyectará el token 
            // de autorización del usuario guardado en SecureStore (axiosConfig.ts).
            const response = await api.put('/update-password', {
                current_password: currentPassword,
                password: newPassword,
                password_confirmation: confirmPassword
            });
            
            // Si Laravel procesa bien el cambio, mostramos un mensaje de éxito
            Alert.alert("Éxito", "La contraseña se actualizó correctamente.");
            // Limpiamos los campos
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            // Devolvemos al usuario a la pantalla anterior del perfil
            router.back();
        } catch (error: any) {
            // Si Laravel devuelve error (ej. contraseña actual inválida o error 500)
            // sacamos el mensaje que Laravel nos manda en error.response.data.message
            const errorMessage = error.response?.data?.message || "Hubo un error al actualizar la contraseña.";
            Alert.alert("Error", errorMessage);
        } finally {
            // Apagamos el estado de carga, sin importar si tuvo éxito o falló
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
                    <Text className="text-xl font-roboto-bold text-secondary">Actualizar contraseña</Text>
                </View>
            </View>

            <View className="flex-1 justify-between">
                <View>
                    <PasswordUpdateCard
                        label="Ingresa tu contraseña actual"
                        value={currentPassword}
                        onChangeText={setCurrentPassword}
                    />

                    <PasswordUpdateCard
                        label="Ingresa la contraseña nueva"
                        value={newPassword}
                        onChangeText={setNewPassword}
                    />

                    <PasswordUpdateCard
                        label="Confirmar contraseña"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                </View>

                <View className="mb-24 mt-6">
                    {/* Al presionar confirmación ejecutamos handleConfirm, y cuando está enviando datos mostramos un mensaje visual y desactivamos interacciones */}
                    <CustomButton
                        title={isLoading ? "ACTUALIZANDO..." : "CONFIRMAR"}
                        onPress={handleConfirm}
                        disabled={isLoading}
                        style={{ borderRadius: 12, opacity: isLoading ? 0.7 : 1 }}
                    />
                </View>
            </View>
        </ScreenLayout>
    );
};

export default UpdatePassword;
