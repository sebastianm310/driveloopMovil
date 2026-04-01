import React from 'react';
import { Text, View } from 'react-native';

interface ReservationCardProps {
  res: any;
}

export default function ReservationCard({ res }: ReservationCardProps) {
  // Manejo seguro de fechas
  let startDate = 'N/A';
  let endDate = 'N/A';
  let creationDate = 'N/A';

  if (res.fecini) startDate = new Date(res.fecini).toLocaleDateString();
  if (res.fecfin) endDate = new Date(res.fecfin).toLocaleDateString();
  if (res.fecrea) creationDate = new Date(res.fecrea).toLocaleDateString();

  const value = res.valor_reserva 
    ? Number(res.valor_reserva).toLocaleString('es-CO', { minimumFractionDigits: 0 }) 
    : '0';
  const brand = res.marca_vehiculo || 'Vehículo';
  const line = res.linea_vehiculo || '';
  const model = res.modelo_vehiculo || '';
  const status = res.estado_reserva || 'Procesando';

  return (
    <View className="bg-white rounded-2xl p-4 mb-4 border border-gray-100 shadow-sm" style={{ elevation: 2 }}>
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-xs font-roboto-medium text-gray-400">
          Creada: {creationDate}
        </Text>
        <View className="bg-[#fadadd] px-3 py-1 rounded-full">
          <Text className="text-xs font-roboto-bold text-[#C91843] uppercase">
            {status}
          </Text>
        </View>
      </View>

      <Text className="text-lg font-roboto-bold text-gray-900 mb-1" numberOfLines={1}>
        {brand} {line} {model}
      </Text>

      <View className="flex-row items-center mt-3 bg-gray-50 p-3 rounded-xl border border-gray-100 justify-between">
        <View className="flex-1 items-center">
          <Text className="text-[10px] font-roboto-bold text-gray-500 uppercase">Inicio</Text>
          <Text className="text-sm font-roboto-bold text-primary mt-1">{startDate}</Text>
        </View>
        <View className="h-4 w-[1px] bg-gray-300 mx-2" />
        <View className="flex-1 items-center">
          <Text className="text-[10px] font-roboto-bold text-gray-500 uppercase">Fin</Text>
          <Text className="text-sm font-roboto-bold text-primary mt-1">{endDate}</Text>
        </View>
      </View>

      <View className="border-t border-gray-100 mt-4 pt-3 flex-row justify-between items-center">
        <Text className="text-sm font-roboto-medium text-gray-500">Valor Rentado</Text>
        <Text className="font-extrabold text-[#C91843] text-lg">${value}</Text>
      </View>
    </View>
  );
}
