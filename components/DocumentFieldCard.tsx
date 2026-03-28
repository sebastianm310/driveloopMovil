import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

interface DocumentFieldCardProps {
    label: string;
    placeholder?: string;
    value?: string;
    onChangeText?: (text: string) => void;
    isDropdown?: boolean;
    onPressDropdown?: () => void;
    maxLength?: number;
    keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
}

const DocumentFieldCard = ({ 
    label, 
    placeholder, 
    value, 
    onChangeText, 
    isDropdown = false,
    onPressDropdown,
    maxLength,
    keyboardType
}: DocumentFieldCardProps) => {
    return (
        <View className="border border-primary/40 rounded-xl p-4 mb-4 bg-white">
            <Text className="text-secondary font-roboto-bold mb-2 text-sm">{label}</Text>

            {isDropdown ? (
                <TouchableOpacity 
                    onPress={onPressDropdown}
                    className="flex-row items-center border-b border-primary/40 pb-1 mt-2"
                >
                    <Text className="flex-1 text-base font-roboto-light text-secondary">
                        {value || placeholder || "Seleccionar"}
                    </Text>
                    <MaterialIcons name="keyboard-arrow-down" size={24} color="#C91843" />
                </TouchableOpacity>
            ) : (
                <View className="border-b border-primary/40 pb-1 mt-2">
                    <TextInput
                        className="text-base font-roboto-light text-secondary"
                        placeholderTextColor="#9CA3AF"
                        placeholder={placeholder}
                        value={value}
                        onChangeText={onChangeText}
                        maxLength={maxLength}
                        keyboardType={keyboardType}
                    />
                </View>
            )}
        </View>
    );
};

export default DocumentFieldCard;
