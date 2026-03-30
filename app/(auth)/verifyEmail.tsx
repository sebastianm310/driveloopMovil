import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { logoutUser } from '../../api/services/authService';
import { getInfoUser, resendVerificationEmail } from '../../api/services/infoUserService';
import CustomButton from '../../components/CustomButton';
import ScreenLayout from '../../components/ScreenLayout';

export default function VerifyEmailScreen() {
    const router = useRouter();
    const [isResending, setIsResending] = useState(false);

    // 1. Función para Reenviar el Correo
    const handleResend = async () => {
        try {
            setIsResending(true);
            await resendVerificationEmail();
            Alert.alert('¡Enviado!', 'Hemos enviado un nuevo enlace de verificación a tu bandeja de entrada.');
        } catch (error: any) {
            Alert.alert('Error', error.message || 'No se pudo reenviar el correo en este momento.');
        } finally {
            setIsResending(false);
        }
    };
    const [isChecking, setIsChecking] = useState(false);

    // 2. Función para comprobar si ya se verificó
    const checkVerification = async () => {
        try {
            setIsChecking(true);
            // Consultamos a Laravel por los datos actuales del usuario
            const userData = await getInfoUser();

            // Si ya hay una fecha, significa que es éxito
            if (userData.email_verified_at !== null) {
                // Actualizamos la bóveda para que la app lo recuerde
                await SecureStore.setItemAsync('userData', JSON.stringify(userData));

                Alert.alert('¡Excelente!', 'Tu correo ha sido verificado con éxito.');
                // Lo enviamos a tu Home Normal (ej. Dashboard)
                router.replace('/dashboard' as any);
            } else {
                // Si sigue siendo null, el usuario pulsó el botón sin haber clickeado el enlace
                Alert.alert(
                    'Aviso',
                    'Aún no hemos detectado la verificación. Asegúrate de hacer clic en el enlace enviado a tu correo.'
                );
            }
        } catch (error: any) {
            Alert.alert('Error', error.message || 'No pudimos validar tu información.');
        } finally {
            setIsChecking(false);
        }
    };


    // 3. Función para Cerrar Sesión
    const handleLogout = async () => {
        await logoutUser();
        router.replace('/login'); // Expulsa al usuario
    };

    return (
        <ScreenLayout paddingHorizontal={16}>
            <View className="flex-1 justify-center items-center px-4">
                <MaterialIcons name="mark-email-unread" size={90} color="#b91c1c" style={{ marginBottom: 24 }} />
                <Text className="text-base text-gray-700 text-center leading-6 mb-10">
                    ¡Gracias por registrarte! Antes de comenzar verifica tu correo electrónico haciéndo clic en el enlace que te acabamos de enviar. Si no recibiste el correo electrónico, con gusto te enviaremos otro, haz click <CustomButton title={isResending ? "Enviando..." : "aquí"} variant="textOnly" textClassName='text-md' onPress={handleResend} />
                </Text>
                <View className="w-full">
                    <View className="mb-4">
                        <CustomButton
                            title={isChecking ? "Verificando..." : "Ya verifiqué mi correo"}
                            onPress={checkVerification}
                            disabled={isChecking}
                        />
                    </View>
                    <CustomButton
                        title="Cerrar Sesión"
                        onPress={handleLogout}
                        variant="outline"
                    />

                </View>
            </View>
        </ScreenLayout>
    );
}
