import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import PasswordUpdateCard from '../components/PasswordUpdateCard';
import ScreenLayout from '../components/ScreenLayout';

const UpdatePassword = () => {
    const router = useRouter();

    const handleConfirm = (password: string) => {
        console.log("Contraseña confirmada:", password);
        // Implementar lógica de actualización
    };

    return (
        <ScreenLayout>
            {/* Header con botón Volver */}
            <View className="flex-row items-center mt-4 mb-10">
                <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
                    <MaterialIcons name="arrow-back" size={24} color="#111111" />
                </TouchableOpacity>
                <View className="flex-1 items-center mr-8">
                    <Text className="text-xl font-roboto-bold text-secondary">Actualizar contraseña</Text>
                </View>
            </View>

            <View className="flex-1">
                <PasswordUpdateCard 
                    label="Ingresa tu contraseña actual" 
                    onConfirm={handleConfirm} 
                />
                
                <PasswordUpdateCard 
                    label="Ingresa la contraseña nueva" 
                    onConfirm={handleConfirm} 
                />
                
                <PasswordUpdateCard 
                    label="Confirmar contraseña" 
                    onConfirm={handleConfirm} 
                />
            </View>
        </ScreenLayout>
    );
};

export default UpdatePassword;
