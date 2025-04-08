// LocationsScreen.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Layout from "../components/Layout"; // Import the Layout component

const LocationsScreen = ({ navigation }) => {
  return (
    <Layout navigation={navigation}>
      <Text style={styles.welcomeText}>Home Screen</Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default LocationsScreen;



