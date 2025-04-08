import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import LocationsScreen from "./screens/LocationsScreen";
import AddLocationScreen from "./screens/AddLocationScreen";
import MapScreen from "./screens/MapScreen";
import CapitalsScreen from "./screens/CapitalsScreen";
import { LocationsProvider } from "./context/LocationsContext";

const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem("userToken");
      setIsLoggedIn(!!token);
      setLoading(false);
    };
    checkLoginStatus();
  }, []);

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  return (
    <LocationsProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={isLoggedIn ? "Home" : "Login"} // ✅ Set dynamically
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Locations" component={LocationsScreen} />
          <Stack.Screen name="AddLocation" component={AddLocationScreen} />
          <Stack.Screen name="Map" component={MapScreen} />
          <Stack.Screen name="Capitals" component={CapitalsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </LocationsProvider>
  );
}
