import { View, Text, Platform } from "react-native";
import React from "react";
import {
  SimpleLineIcons,
  Fontisto,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { COLORS } from "../constants";
import { Create, Home, Library, Messages, Profile, Settings } from "../screens";
import Ionicons from '@expo/vector-icons/Ionicons';
import Search from "../screens/Search";

const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarHideOnKeyboard: true,
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    backgroundColor: COLORS.white,
    paddingBottom: 0,
  },
};
const BottomTabNav = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <SimpleLineIcons
                name="home"
                size={24}
                color={focused ? COLORS.primary : COLORS.black}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="Messages"
        component={Messages}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialCommunityIcons
                name="message-text-outline"
                size={24}
                color={focused ? COLORS.primary : COLORS.black}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: "Search",
          headerShown: false,
          tabBarLabelStyle: { color: "white", marginBottom: 3 },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="search-circle" size={32} color="black" />
            ) : (
              <Ionicons name="search-circle-outline" size={32} color="black" />
            ),
        }}
      />

      <Tab.Screen
        name="Library"
        component={Library}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaterialCommunityIcons
                name="music-box-multiple"
                size={24}
                color="black"
              />
            ) : (
              <MaterialCommunityIcons
                name="music-box-multiple-outline"
                size={24}
                color="black"
              />
            ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialIcons
                name="person-outline"
                size={24}
                color={focused ? COLORS.primary : COLORS.black}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNav;
