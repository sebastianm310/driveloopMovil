import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Button, Text, View } from "react-native";
import CustomButton from "../../../components/CustomButton";
import InfoCard from "../../../components/InfoCard";
import ScreenLayout from "../../../components/ScreenLayout";

// Importa los servicios
import { logoutUser } from "../../../api/services/authService";
import { getInfoUser } from "../../../api/services/infoUserService";

export default function ProfileInfo() {
  const router = useRouter();

  // 1. Estados de la vista
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 2. Disparador de la petición (Ciclo de Vida)
  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Llamamos al servicio (El interceptor inyecta el token)
      const data = await getInfoUser();
      setUserData(data);

    } catch (err: any) {
      console.error("Error en perfil:", err.message);
      setError(err.message);

      // Si la API dice que no está autorizado, lo mandamos al login
      if (err.message.includes('Unauthenticated') || err.message.includes('No Autorizado')) {
        Alert.alert('Sesión expirada', 'Por favor vuelve a iniciar sesión.');
        await logoutUser();
        router.replace('/login');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 3. Renderizado: Interfaz de Carga
  if (isLoading) {
    return (
      <ScreenLayout paddingHorizontal={8}>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#0000ff" />
          <Text className="mt-4 text-gray-500">Cargando información...</Text>
        </View>
      </ScreenLayout>
    );
  }

  // 4. Renderizado: Interfaz de Error
  if (error) {
    return (
      <ScreenLayout paddingHorizontal={8}>
        <View className="flex-1 justify-center items-center">
          <Text className="text-red-500 mb-4 text-center font-roboto-bold text-lg">{error}</Text>
          {/* Usamos un Botón nativo aquí para evitar errores de Props con CustomButton, cámbialo si quieres */}
          <Button title="Intentar de nuevo" onPress={fetchProfileData} />
        </View>
      </ScreenLayout>
    );
  }

  // 5. Renderizado Principal (Datos Reales)
  return (
    <ScreenLayout>
      {/* Boton Volver */}
      <View className="flex-row items-center mt-4">
        <CustomButton
          variant="textOnly"
          iconLeft={<MaterialIcons name="arrow-back" size={24} color="#111111" />}
          onPress={() => router.back()}
        />
        <View className="flex-1 items-center mr-8">
          <Text className="text-xl font-roboto-bold text-secondary">Información de perfil</Text>
        </View>
      </View>

      {/* Tarjetas de Información Dinámicas */}
      <View className="flex-1 justify-center pb-12">

        <InfoCard
          title="Nombre"
          info={userData?.nom || "No especificado"}
        />

        <InfoCard
          title="Apellido"
          info={userData?.ape || "No especificado"}
        />

        <InfoCard
          title="Teléfono"
          info={userData?.tel || "No especificado"}
          showButton={true}
          buttonTitle="MODIFICAR"
          onPressButton={() => {
            router.push('/profile/updatePhoneNumber');
          }}
        />

        <View className="mb-6">
          <InfoCard
            title="Correo electrónico"
            info={userData?.email || "No especificado"}
            showButton={true}
            buttonTitle="MODIFICAR"
            onPressButton={() => {
              router.push('/profile/updateEmail');
            }}
          />
        </View>

      </View>
    </ScreenLayout>
  );
}
