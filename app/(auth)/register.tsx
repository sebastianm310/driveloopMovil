import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import Logo from '../../components/Logo';
import ScreenLayout from '../../components/ScreenLayout';

const Register = () => {
    const router = useRouter();
    const [accepted, setAccepted] = useState(false);

    return (
        <ScreenLayout>
            {/* Header con botón Volver */}
            <View className="flex-row items-center mt-4">
                <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
                    <MaterialIcons name="arrow-back" size={24} color="#111111" />
                </TouchableOpacity>
                <View className="flex-1 items-center mr-8">
                    <Text className="text-xl font-roboto-bold text-secondary">Registro</Text>
                </View>
            </View>

            {/* Logo */}
            <Logo className="mt-6 mb-8" />

            {/* Formulario */}
            <View className="space-y-2">
                <CustomInput
                    placeholder="Nombre"
                    icon={<MaterialIcons name="person-outline" size={20} color="#6B7280" />}
                />

                <CustomInput
                    placeholder="Apellido"
                    icon={<MaterialIcons name="person-outline" size={20} color="#6B7280" />}
                />

                <CustomInput
                    placeholder="Correo electrónico"
                    keyboardType="email-address"
                    icon={<MaterialIcons name="mail-outline" size={20} color="#6B7280" />}
                />

                <CustomInput
                    placeholder="Contraseña"
                    secureTextEntry
                    icon={<MaterialIcons name="lock-outline" size={20} color="#6B7280" />}
                />

                <CustomInput
                    placeholder="Confirmar contraseña"
                    secureTextEntry
                    icon={<MaterialIcons name="lock-outline" size={20} color="#6B7280" />}
                />

                {/* Términos y Condiciones */}
                <TouchableOpacity
                    className="flex-row items-center mt-4"
                    onPress={() => setAccepted(!accepted)}
                >
                    <MaterialCommunityIcons
                        name={accepted ? "checkbox-marked" : "checkbox-blank-outline"}
                        size={24}
                        color={accepted ? "#C91843" : "#6B7280"}
                    />
                    <Text className="ml-3 text-gray-500 text-sm font-roboto-light">
                        Acepto los <Text className="text-blue-400">términos y condiciones</Text>
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Botón de Registro */}
            <View className="mt-10 mb-8">
                <CustomButton title="Registrarse" onPress={() => console.log('Register press')} />
            </View>

        </ScreenLayout>
    );
};

export default Register;
