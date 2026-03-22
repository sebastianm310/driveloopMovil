import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import CustomButton from '../../../components/CustomButton';
import PasswordUpdateCard from '../../../components/PasswordUpdateCard';
import ScreenLayout from '../../../components/ScreenLayout';

const UpdatePassword = () => {
    const router = useRouter();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleConfirm = () => {
        console.log("Actualizando contraseña...");
        console.log("Actual:", currentPassword);
        console.log("Nueva:", newPassword);
        console.log("Confirmación:", confirmPassword);
        
        // Aquí iría la validación y la llamada al backend
    };

    return (
        <ScreenLayout>
            <View className="flex-row items-center mt-4 mb-10">
                <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
                    <MaterialIcons name="arrow-back" size={24} color="#111111" />
                </TouchableOpacity>
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

                <View className="mb-10 mt-6">
                    <CustomButton 
                        title="CONFIRMAR" 
                        onPress={handleConfirm} 
                        style={{ borderRadius: 12 }} 
                    />
                </View>
            </View>
        </ScreenLayout>
    );
};

export default UpdatePassword;
