import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Genres from "../components/Genres";
import Config from "../components/Config";
import Profile from "../components/Profile";
import History from "../components/History";
import { Feather } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function AuthenticatedApp() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          height: 60,
          paddingHorizontal: 5,
          paddingTop: 0,
          backgroundColor: "white",
          position: "absolute",
        },
      })}
    >
      <Tab.Screen
        name="Generos"
        component={Genres}
        options={{
          tabBarIcon: ({ size }) => (
            <Feather name="film" color="white" size={size} />
          ),
          tabBarLabel: "",
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Profile}
        options={{
          tabBarIcon: ({ size }) => (
            <Feather name="user" color="white" size={size} />
          ),
          tabBarLabel: "",
        }}
      />
      <Tab.Screen
        name="Historico"
        component={History}
        options={{
          tabBarIcon: ({ size }) => (
            <Feather name="list" color="white" size={size} />
          ),
          tabBarLabel: "",
        }}
      />
      <Tab.Screen
        name="Config"
        component={Config}
        options={{
          tabBarIcon: ({ size }) => (
            <Feather name="settings" color="white" size={size} />
          ),
          tabBarLabel: "",
        }}
      />
    </Tab.Navigator>
  );
}
