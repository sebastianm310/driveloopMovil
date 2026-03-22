import { router } from "expo-router";
import { FileText, User } from "lucide-react-native";
import React from "react";
import { View } from "react-native";
import Logo from "../../components/Logo";
import MenuCard from "../../components/MenuCard";
import ScreenLayout from "../../components/ScreenLayout";

const Dashboard = () => {
  return (
    <ScreenLayout paddingHorizontal={4}>
      <Logo className="mt-8 mb-12" />

      {/* Opciones del menú */}
      <View className="space-y-4">
        <View className="flex-row">
          <MenuCard
            title="Configuración de cuenta"
            Icon={User}
            onPress={() => router.push('/accountSettings' as any)}
          />
        </View>

        <View className="flex-row">
          <MenuCard
            title="Documentos"
            Icon={FileText}
            onPress={() => router.push('/documents' as any)}
          />
        </View>
      </View>
    </ScreenLayout>
  );
};

export default Dashboard;
