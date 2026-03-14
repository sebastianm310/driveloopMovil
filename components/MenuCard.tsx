import { LucideIcon } from 'lucide-react-native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface MenuCardProps {
    title: string;
    Icon?: LucideIcon;
    onPress?: () => void;
}

const MenuCard = ({ title, Icon, onPress }: MenuCardProps) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            className="flex-1 border border-primary/20 bg-white rounded-2xl p-6 items-center shadow-sm active:bg-gray-50 m-2"
        >
            {Icon && (
                <View className="mb-4">
                    <Icon size={64} color="#C91843" strokeWidth={1.5} />
                </View>
            )}
            <Text className="text-secondary font-roboto-bold text-center text-lg">
                {title}
            </Text>
        </TouchableOpacity>
    );
};

export default MenuCard;
