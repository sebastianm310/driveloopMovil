import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import MenuCard from '../components/MenuCard';
import ScreenLayout from '../components/ScreenLayout';

const AccountSettings = () => {
    const router = useRouter();

    return (
        <ScreenLayout>
            {/* Header con botón Volver */}
            <View className="flex-row items-center mt-4 mb-10">
                <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
                    <MaterialIcons name="arrow-back" size={24} color="#111111" />
                </TouchableOpacity>
                <View className="flex-1 items-center mr-8">
                    <Text className="text-xl font-roboto-bold text-secondary">Configuración de cuenta</Text>
                </View>
            </View>

            <View className="flex-1">
                <View className="flex-1 justify-center pb-12">
                    <View className="flex-row">
                        <MenuCard 
                            title="Información de perfil" 
                            onPress={() => router.push('/configUser' as any)} 
                        />
                    </View>
                    <View className="flex-row">
                        <MenuCard 
                            title="Actualizar contraseña" 
                            onPress={() => router.push('/updatePassword' as any)} 
                        />
                    </View>
                    <View className="flex-row">
                        <MenuCard 
                            title="Borrar cuenta" 
                            onPress={() => console.log('Borrar cuenta')} 
                        />
                    </View>
                </View>
                
                <View className="mb-10">
                    <View className="flex-row">
                        <MenuCard 
                            title="Cerrar sesión" 
                            onPress={() => console.log('Cerrar sesión')} 
                        />
                    </View>
                </View>
            </View>
        </ScreenLayout>
    );
};

export default AccountSettings;
