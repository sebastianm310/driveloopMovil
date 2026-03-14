import React from "react";
import { ScrollView, Text, View } from "react-native";
import CustomButton from "../components/CustomButton";

export default function ProfileInfo() {
  return (
    <ScrollView className="flex-1 bg-gray-100 px-5 pt-10">
      {/* Título */}
      <Text className="text-2xl font-roboto-bold text-center mb-8">
        Información de perfil
      </Text>

      {/* Nombre */}
      <View className="border border-red-400 rounded-xl p-4 mb-4 bg-white">
        <Text className="text-center font-roboto-bold mb-1">Nombre</Text>
        <Text className="text-center text-gray-700">Juan Camilo</Text>
      </View>

      {/* Apellido */}
      <View className="border border-red-400 rounded-xl p-4 mb-4 bg-white">
        <Text className="text-center font-roboto-bold mb-1">Apellido</Text>
        <Text className="text-center text-gray-700">Gonzalez Giraldo</Text>
      </View>

      {/* Teléfono */}
      <View className="border border-red-400 rounded-xl p-4 mb-4 bg-white">
        <Text className="text-center font-roboto-bold mb-2">Teléfono</Text>
        <Text className="text-center text-gray-700 mb-3">+57 305 8191471</Text>

        <View className="border-t border-gray-300 pt-3">
          <CustomButton title="MODIFICAR" />
        </View>
      </View>

      {/* Correo */}
      <View className="border border-red-400 rounded-xl p-4 mb-10 bg-white">
        <Text className="text-center font-roboto-bold mb-2">
          Correo electrónico
        </Text>

        <Text className="text-center text-gray-700 mb-3">
          juanvelez@gmail.com
        </Text>

        <View className="border-t border-gray-300 pt-3">
          <CustomButton title="MODIFICAR" />
        </View>
      </View>
    </ScrollView>
  );
}
