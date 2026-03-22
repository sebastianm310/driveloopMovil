import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import CustomButton from '../../../components/CustomButton';
import DocumentFieldCard from '../../../components/DocumentFieldCard';
import DocumentUploadCard from '../../../components/DocumentUploadCard';
import ScreenLayout from '../../../components/ScreenLayout';

const IdentityDocument = () => {
    const router = useRouter();

    return (
        <ScreenLayout>
            <View className="flex-row items-center mt-4 mb-10">
                <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
                    <MaterialIcons name="arrow-back" size={24} color="#111111" />
                </TouchableOpacity>
                <View className="flex-1 items-center mr-8">
                    <Text className="text-xl font-roboto-bold text-secondary">Documento de Identidad</Text>
                </View>
            </View>

            <View className="flex-1 justify-between">
                <View>
                    <DocumentFieldCard 
                        label="Tipo de Documento" 
                        isDropdown={true}
                        onPressDropdown={() => console.log('Abrir selector de documento')}
                    />

                    <DocumentFieldCard label="Número de Documento" />
                    
                    <DocumentUploadCard 
                        label="Anverso" 
                        onPressUpload={() => console.log('Upload Anverso ID')} 
                    />
                    
                    <DocumentUploadCard 
                        label="Reverso" 
                        onPressUpload={() => console.log('Upload Reverso ID')} 
                    />
                </View>
                
                <View className="mb-10 mt-6">
                    <CustomButton 
                        title="SUBIR IDENTIDAD" 
                        onPress={() => console.log('Subir identidad id')} 
                        style={{ borderRadius: 12 }} 
                    />
                </View>
            </View>
        </ScreenLayout>
    );
};

export default IdentityDocument;
