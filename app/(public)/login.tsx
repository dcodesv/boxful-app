import LogoBoxFul from '@/assets/images/logo-boxful.svg';
import { router } from 'expo-router';
import { Eye, EyeOff, Fingerprint } from 'lucide-react-native';
import React, { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    console.log("Iniciando sesión con:", email, password);
    router.replace('/(tabs)/delivery');
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-6 py-4 justify-between">
      
      {/* Encabezado */}
      <View className="items-center mt-10">
        {/* Logo de Boxful (SVG sería ideal aquí) */}
        <LogoBoxFul width={100} height={100} />
      </View>

      {/* Formulario */}
      <View className="w-full">
        <Text className="text-2xl font-bold text-blue-700 mb-2">
            Bienvenido a boxful 👋
        </Text>
        <Text className="text-gray-500 mb-8">
            Ingresa tu correo electrónico
        </Text>

        {/* Input Email */}
        <View className="mb-4">
            <Text className="text-blue-600 text-xs font-bold mb-1 ml-1">Email</Text>
            <TextInput
                className="w-full border border-blue-200 rounded-xl px-4 py-3 text-gray-800 bg-white"
                placeholder="ejemplo@boxful.sv"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
        </View>

        {/* Input Password */}
        <View className="mb-6">
            <Text className="text-gray-400 text-xs mb-1 ml-1">Password</Text>
            <View className="w-full border border-gray-200 rounded-xl px-4 py-3 flex-row items-center bg-white">
                <TextInput
                    className="flex-1 text-gray-800"
                    placeholder="••••••••"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                />
                <Pressable onPress={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                        <EyeOff color="#9ca3af" size={20} />
                    ) : (
                        <Eye color="#9ca3af" size={20} />
                    )}
                </Pressable>
            </View>
        </View>

        {/* Passkey / FaceID (Simulado como en tu diseño) */}
        <Pressable className="flex-row items-center justify-center mb-6 space-x-2">
            <Fingerprint color="#3b82f6" size={20} />
            <Text className="text-blue-600 font-semibold">Ingresar con passkey</Text>
        </Pressable>

        {/* Botón Iniciar Sesión */}
        <Pressable 
            onPress={handleLogin}
            className="w-full bg-blue-700 rounded-full py-4 items-center shadow-lg shadow-blue-200"
        >
            <Text className="text-white font-bold text-lg">Iniciar sesión</Text>
        </Pressable>

        <View className="flex-row justify-center mt-6">
            <Text className="text-gray-500">o también </Text>
        </View>

        <Pressable className="mt-2 items-center">
             <Text className="text-blue-600 font-bold">Registrar cuenta</Text>
        </Pressable>
      </View>

      {/* Footer vacío o versión */}
      <View />
    </SafeAreaView>
  );
}