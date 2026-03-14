import React from 'react';
import { Text, View } from 'react-native';
import CustomButton from './CustomButton';

interface InfoCardProps {
    title: string;
    info: string;
    showButton?: boolean;         // Si es true, renderiza el botón
    onPressButton?: () => void;
    buttonTitle?: string;   // Función a ejecutar al presionar el botón
}

export default function InfoCard({
    title,
    info,
    showButton = false,
    buttonTitle,
    onPressButton
}: InfoCardProps) {
    return (
        <View className="border border-red-400 rounded-xl p-4 mb-4 bg-white">
            {/* 
            Ajustamos un poco el margen dependiendo de si hay botón o no 
            para que coincida con el diseño de tus tarjetas originales 
            */}
            <Text className={`text-center font-roboto-bold ${showButton ? 'mb-2' : 'mb-1'}`}>
                {title}
            </Text>

            <Text className={`text-center text-gray-700 ${showButton ? 'mb-3' : ''}`}>
                {info}
            </Text>

            {/* Renderizado condicional del botón */}
            {showButton && (
                <View className="border-t border-gray-300 pt-3">
                    <CustomButton title={buttonTitle || ""} onPress={onPressButton} />
                </View>
            )}
        </View>
    );
}
