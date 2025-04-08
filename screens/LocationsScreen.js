import React, { useEffect, useContext } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from "react-native";
import { LocationsContext } from "../context/LocationsContext";
import { auth } from "../firebaseConfig";
import { getFirestore, collection, query, getDocs } from "firebase/firestore";
import Layout from "../components/Layout";
import { Ionicons } from "@expo/vector-icons"; // Import icons

const LocationsScreen = ({ navigation }) => {
  const { locations, setLocations } = useContext(LocationsContext);
  const db = getFirestore();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchLocations = async () => {
      if (!user) return;
      try {
        const q = query(collection(db, "users", user.uid, "locations"));
        const querySnapshot = await getDocs(q);
        const loadedLocations = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLocations(loadedLocations);
      } catch (error) {
        console.error("Error loading locations:", error);
      }
    };

    fetchLocations();
  }, [user]);

  return (
    <Layout navigation={navigation}>
      <View style={styles.container}>
        <Text style={styles.title}>Your Locations</Text>

        {locations.length === 0 ? (
          <Text>No locations found.</Text>
        ) : (
          <FlatList
            data={locations}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.locationItem}>
                {/* Left Side: Location Details */}
                <View style={styles.textContainer}>
                  <Text style={styles.locationName}>{item.name}</Text>
                  <Text>{item.description}</Text>

                  {/* Star Rating */}
                  <View style={styles.starContainer}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Ionicons
                        key={star}
                        name={star <= item.rating ? "star" : "star-outline"}
                        size={20}
                        color={star <= item.rating ? "#FFD700" : "#ccc"}
                      />
                    ))}
                  </View>
                </View>

                {/* Right Side: Clickable Map Image */}
                <TouchableOpacity onPress={() => navigation.navigate("Map", { location: item })}>
                  <Image
                    source={require("../assets/marker.png")} // Replace with your own image
                    style={styles.mapIcon}
                  />
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  locationItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15, // Increased padding
    borderBottomWidth: 1,
    justifyContent: "space-between",
    backgroundColor: "#f9f9f9", // Optional: Light background
    borderRadius: 10, // Optional: Rounded corners
    width: "100%", // Take full width
    marginBottom: 10, // Spacing between items
  },
  textContainer: {
    flex: 1,
    paddingRight: 10, // Prevents text from touching the image
  },
  locationName: {
    fontSize: 20, // Slightly larger font
    fontWeight: "bold",
  },
  starContainer: {
    flexDirection: "row",
    marginTop: 5,
  },
  mapIcon: {
    width: 50, // Slightly larger size
    height: 50,
  },
});

export default LocationsScreen;

