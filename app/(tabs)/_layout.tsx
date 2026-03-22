import { MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

const TabsLayout = () => {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: '#FFFFFF',
                    borderTopWidth: 0,
                    elevation: 10,
                    shadowOpacity: 0.1,
                    height: 70,
                    position: 'absolute',
                    bottom: 20,
                    left: 20,
                    right: 20,
                    borderRadius: 30,
                },

                tabBarActiveTintColor: '#3b82f6',
                tabBarInactiveTintColor: '#9ca3af',
            }}
        >
            <Tabs.Screen
                name="dashboard"
                options={{
                    title: "Inicio",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="home" size={28} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="documents"
                options={{
                    title: "Documentos",
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="folder-copy" size={28} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name='profile'
                options={{
                    title: "Perfil",
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="person" size={28} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
};

export default TabsLayout;