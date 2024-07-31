import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'
import {Tabs, Redirect } from 'expo-router'
import {icons} from '../../constants';


const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="flex items-center justify-center">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-5 h-5"
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};


const TabsLayout = () => {
  return (
    <>
        <Tabs
         screenOptions = {{
            tabBarShowLabel: false,
            tabBarActiveTintColor: '#FFA001',
            tabBarInactiveTintColor: '#CDCDE0',
            tabBarStyle: {
                backgroundColor: '#161622',
                borderTopWidth: 1,
                borderTopColor: '#232533',
                height: 84
            }
         }}>
            <Tabs.Screen
            name = "home"
            options = {{
                title: "Home",
                headerShown: false,
                tabBarIcon: ({color, focused}) => (
                    <TabIcon
                        icon = {icons.home}
                        color = {color}
                        name = "Home"
                        focused = {focused}
                    />
                ),
            }}
            /><Tabs.Screen
            name = "bookmarks"
            options = {{
                title: "Bookmarks",
                headerShown: false,
                tabBarIcon: ({color, focused}) => (
                    <TabIcon
                        icon = {icons.bookmark}
                        color = {color}
                        name = "Bookmarks"
                        focused = {focused}
                    />
                ),
            }}
            /><Tabs.Screen
            name = "create"
            options = {{
                title: "Create",
                headerShown: false,
                tabBarIcon: ({color, focused}) => (
                    <TabIcon
                        icon = {icons.plus}
                        color = {color}
                        name = "Create"
                        focused = {focused}
                    />
                ),
            }}
            /><Tabs.Screen
            name = "profile"
            options = {{
                title: "Profile",
                headerShown: false,
                tabBarIcon: ({color, focused}) => (
                    <TabIcon
                        icon = {icons.profile}
                        color = {color}
                        name = "Profile"
                        focused = {focused}
                    />
                ),
            }}
            />
        </Tabs>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    justify: 'center',
    align: 'center',
    width: 24, // Corresponds to `w-6` in Tailwind (6 * 4 = 24)
    height: 24, // Corresponds to `h-6` in Tailwind (6 * 4 = 24)
  },
});

export default TabsLayout;
