import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Dimensions, View } from 'react-native';
import Animated, {
    Easing,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSequence,
    withTiming
} from 'react-native-reanimated';
import Logo from '../components/Logo';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const SplashScreen = () => {
    const router = useRouter();

    const translateX = useSharedValue(-SCREEN_WIDTH);
    const scale = useSharedValue(1);
    const opacity = useSharedValue(0);

    const onAnimationComplete = () => {
        router.replace('/login');
    };

    const triggerHaptic = () => {
        // Genera una pequeña vibración cuando el carro frena
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    };

    useEffect(() => {

        opacity.value = withSequence(
            withTiming(1, { duration: 800 }),             // Aparece al inicio
            withDelay(2050, withTiming(0, { duration: 500 })) // Desaparece al final (2850ms total)
        );

        // 2. Movimiento Principal (TRANSLAXION)
        translateX.value = withSequence(
            // ENTRADA: Llega al centro con un ligero rebote de suspensión (Easing.back)
            withTiming(0, {
                duration: 1500,
                easing: Easing.out(Easing.back(1.5))
            }, () => {
                // Al llegar al centro (frenar), disparamos la vibración haptica
                runOnJS(triggerHaptic)();
            }),

            // FRENO: Se queda quieto un momento
            withDelay(1000, withTiming(0, { duration: 0 })),

            // SALIDA: Acelera de forma exponencial hacia la derecha
            withTiming(SCREEN_WIDTH, {
                duration: 800,
                easing: Easing.in(Easing.exp)
            }, (finished) => {
                if (finished) {
                    runOnJS(onAnimationComplete)();
                }
            })
        );

        // 3. Efecto de SUSPENSIÓN (SCALE)
        // Animamos el tamaño justo cuando el carro "frena" en el centro para simular inercia
        scale.value = withSequence(
            withDelay(1200, withTiming(0.92, { duration: 150 })), // Se "aplasta" al frenar
            withTiming(1, { duration: 300 }),                      // Vuelve a su forma
            withDelay(900, withTiming(1.05, { duration: 200 })),  // Se estira un poco al arrancar
            withTiming(1, { duration: 200 })
        );


    }, []);

    // ESTILO ANIMADO
    // Vincula los valores de Reanimated con el componente de la UI
    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [
            { translateX: translateX.value },
            { scale: scale.value }
        ],
    }));

    return (
        <View className="flex-1 bg-white justify-center items-center">
            {/* Animated.View es el contenedor que permite las animaciones fluidas */}
            <Animated.View style={animatedStyle} className="w-full">
                <Logo />
            </Animated.View>
        </View>
    );
};

export default SplashScreen;
