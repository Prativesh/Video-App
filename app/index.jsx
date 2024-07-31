import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView, Image } from 'react-native';
import React from 'react';
import { Redirect, router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../constants'
import { useGlobalContext } from '../context/GlobalProvider';
import CustomButton from '../components/CustomButton';


export default function App() {

  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/home" />

  return (
    <SafeAreaView className = 'bg-primary h-full'>
        <ScrollView contentContainerStyle = {{height: '100%'}}>
            <View className = 'justify-center items-center mx-4 h-[84vh]'>
                <Image
                    source = {images.logo}
                    resizeMode = 'contain'
                    className = 'w-[130px] h-[84px]'
                />

                <Image
                    source = {images.cards}
                    resizeMode = 'contain'
                    className = 'max-w-[380px] w-full h-[298px]'
                />

                <View className="relative mt-5 justify-center items-center">
                    <Text className="text-3xl text-white font-bold text-center">
                      Discover Endless{"\n"}
                      Possibilities with{" "}
                      <Text className="text-secondary-200">Aora</Text>
                    </Text>

                    <Image
                        source={images.path}
                        className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
                        resizeMode="contain"
                      />
                  </View>

                <CustomButton
                    handlePress = {() => {router.push("./sign-in")}}
                    title = {'Continue with email'}
                    containerStyles = "w-full mt-40"
                    textStyles = "text-primary font-psemibold text-lg"
                />
            </View>
         </ScrollView>

         <StatusBar backgroundColor= "#161622" style = "light"/>
    </SafeAreaView>
  );
}
