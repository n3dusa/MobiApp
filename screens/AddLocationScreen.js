import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from "react-native";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { auth } from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Layout from "../components/Layout";
import { LocationsContext } from "../context/LocationsContext";
import { Ionicons } from "@expo/vector-icons"; // Import icons

const GEOCODING_API_KEY = "374db153d2244a2eb6793afafc47eaa6"; // Replace with your API key

const AddLocationScreen = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0); // Default 0 stars
  const navigation = useNavigation();
  const db = getFirestore();
  const { setLocations } = useContext(LocationsContext);

  const handleAddLocation = async () => {
    const user = auth.currentUser;
    if (!user) {
      Alert.alert("Error", "You must be logged in to add a location.");
      return;
    }

    try {
      // Fetch coordinates from geocoding API
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${name}&key=${GEOCODING_API_KEY}`
      );

      if (response.data.results.length === 0) {
        Alert.alert("Error", "Invalid location name.");
        return;
      }

      const { lat, lng } = response.data.results[0].geometry;

      // Add location to Firestore with latitude & longitude
      const docRef = await addDoc(collection(db, "users", user.uid, "locations"), {
        name,
        description,
        rating, // Store selected rating
        latitude: lat,
        longitude: lng,
        createdAt: new Date(),
      });

      // Update locations context
      setLocations((prevLocations) => [
        ...prevLocations,
        { id: docRef.id, name, description, rating, latitude: lat, longitude: lng },
      ]);

      Alert.alert("Success", "Location added!");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  // Function to handle star selection
  const handleStarPress = (selectedRating) => {
    setRating(selectedRating);
  };

  return (
    <Layout navigation={navigation}>
      <View style={styles.container}>
        <Text style={styles.title}>Add a New Location</Text>

        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />

        <TextInput
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
        />

        {/* Star Rating System */}
        <View style={styles.starContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star} onPress={() => handleStarPress(star)}>
              <Ionicons
                name={star <= rating ? "star" : "star-outline"}
                size={32}
                color={star <= rating ? "#FFD700" : "#ccc"}
                style={styles.star}
              />
            </TouchableOpacity>
          ))}
        </View>

        <Button title="Add Location" onPress={handleAddLocation} />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  input: {
    alignSelf: "stretch",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  starContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
  star: {
    marginHorizontal: 15,
  },
});

export default AddLocationScreen;

