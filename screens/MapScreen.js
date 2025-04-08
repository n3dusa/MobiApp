import React, { useState } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useRoute } from "@react-navigation/native"; // Import useRoute hook
import { Ionicons } from "@expo/vector-icons"; // Optional: for an icon in the back button

const MapScreen = ({ navigation }) => {
  const route = useRoute(); // Get the route object
  const location = route.params?.location || null; // Extract location, if provided

  const [loading, setLoading] = useState(false);

  // Default map region (if no location is provided)
  const defaultRegion = {
    latitude: 37.7749, // Example: San Francisco
    longitude: -122.4194,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };

  const initialRegion = location
    ? {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }
    : defaultRegion;

  return (
    <View style={{ flex: 1 }}>
      {/* Back Button */}
      <TouchableOpacity
        style={{
          position: "absolute",
          top: 40,
          left: 10,
          zIndex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          padding: 10,
          borderRadius: 30,
        }}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      {/* Map View */}
      <MapView style={{ flex: 1 }} initialRegion={initialRegion}>
        {location && (
          <Marker
            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
            title={location.name}
            description={location.description}
          />
        )}
      </MapView>

      {/* Message when no specific location is selected */}
      {!location && (
        <View style={{ position: "absolute", top: 100, left: 10, right: 10 }}>
          <Text style={{ color: "white", backgroundColor: "rgba(0,0,0,0.5)", padding: 10, textAlign: "center", borderRadius: 5 }}>
            No specific location selected. Showing default view.
          </Text>
        </View>
      )}
    </View>
  );
};

export default MapScreen;

