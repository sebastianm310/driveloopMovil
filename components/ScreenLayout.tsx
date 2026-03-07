import React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ScreenLayoutProps {
    children: React.ReactNode;
    scrollable?: boolean;
    paddingHorizontal?: number;
}

const ScreenLayout = ({ children, scrollable = true, paddingHorizontal = 24 }: ScreenLayoutProps) => {
    if (scrollable) {
        return (
            <SafeAreaView className="flex-1 bg-white">
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, paddingHorizontal }}
                    className="flex-1"
                >
                    {children}
                </ScrollView>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View style={{ flex: 1, paddingHorizontal }}>
                {children}
            </View>
        </SafeAreaView>
    );
};

export default ScreenLayout;
