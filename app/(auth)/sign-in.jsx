import React, {useState} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text, StyleSheet, ScrollView, Image, Alert } from 'react-native'
import {images} from '../../constants'
import {Link, router} from 'expo-router';
import { getCurrentUser, signIn } from '../../lib/appwrite';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { useGlobalContext } from '../../context/GlobalProvider';

const SignIn = () => {

    const [form, setForm] = useState ({
        email: "",
        password: ""
    })

    const { setUser, setIsLogged } = useGlobalContext();
    const [isSubmitting, setSubmitting] = useState(false);


    const submit = async () => {
      if(!form.email || !form.password){
        Alert.alert('Error', "Fill in the details")
      }

      setSubmitting(true)
      try {
        await signIn(form.email, form.password)
        const result = await getCurrentUser();
        setUser(result);
        setIsLogged(true);
        router.replace("/home")
        
      } catch (error) {
        throw new Error(error)
      } finally {
         setSubmitting(false)
      }
      
  }


  return (
    <>
        <SafeAreaView className = "bg-primary h-full">
            <ScrollView>
                <View className="w-full flex justify-center min-h-[85vh] px-4 my-6">
                    <Image
                        source = {images.logo}
                        resizeMode = 'contain'
                        className = "w-[115px] h-[34px]"
                    />
                    <Text className = "text-white text-2xl mt-10 font-psemibold"> Log In </Text>
                    <FormField
                        title="Email"
                        value={form.email}
                        handleChangeText={(e) => setForm({ ...form, email: e })}
                        otherStyles="mt-7"
                        keyboardType="email-address"
                      />

                      <FormField
                        title="Password"
                        value={form.password}
                        handleChangeText={(e) => setForm({ ...form, password: e })}
                        otherStyles="mt-7"
                      />

                      <CustomButton
                        title = 'Sign-In'
                        handlePress = {submit}
                        containerStyles = 'mt-7'
                      />

                      <View className="flex justify-center pt-5 flex-row gap-2">
                          <Text className="text-lg text-gray-100 font-pregular">
                            Don't have an account?
                          </Text>
                          <Link
                            href="/sign-up"
                            className="text-lg font-psemibold text-secondary"
                          > Signup </Link>
                      </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    </>
  );
};

export default SignIn;
