import { MaterialIcons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Text, TouchableOpacity, View } from 'react-native';
import { loginUser } from '../../api/services/authService';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import Logo from '../../components/Logo';
import ScreenLayout from '../../components/ScreenLayout';

const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Cuidado', 'Debes ingresar correo y contraseña');
            return;
        }

        setLoading(true);

        try {
            const userData = await loginUser(email, password);
            console.log("Logueado con exito!");
            router.replace('/dashboard' as any);
        } catch (error: any) {
            Alert.alert('Error', error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <ScreenLayout>
            {/* Logo */}
            <Logo className="mt-10 mb-12" />

            {/* Formulario */}
            <View className="space-y-4">
                <CustomInput
                    placeholder="Correo electrónico"
                    keyboardType="email-address"
                    icon={<MaterialIcons name="mail-outline" size={20} color="#6B7280" />}
                    value={email}
                    onChangeText={setEmail}
                />

                <CustomInput
                    placeholder="Contraseña"
                    secureTextEntry
                    icon={<MaterialIcons name="lock-outline" size={20} color="#6B7280" />}
                    value={password}
                    onChangeText={setPassword}
                />

                <View className="flex-row justify-between mt-2">
                    <Text className="text-gray-500 text-sm font-roboto-light">
                        ¿Olvidaste la contraseña?
                    </Text>
                    <TouchableOpacity>
                        <Text className="text-primary font-roboto-bold text-sm">
                            Clic aquí
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Botón de Acción */}
            <View className="mt-10">
                {loading ? (
                    <ActivityIndicator size="large" color="#C91843" />
                ) : (
                    <CustomButton title="Iniciar sesión" onPress={handleLogin} />
                )}
            </View>

            {/* Registro */}
            <View className="flex-row justify-center mt-8">
                <Text className="text-gray-500 font-roboto-light">¿No tienes una cuenta? </Text>
                <Link href={"/register" as any} asChild>
                    <TouchableOpacity>
                        <Text className="text-primary font-roboto-bold">Regístrate</Text>
                    </TouchableOpacity>
                </Link>
            </View>
        </ScreenLayout>
    );
};

export default Login;
