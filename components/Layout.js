import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native"; 

const Layout = ({ navigation, children }) => {
  const route = useRoute(); 

  const handleLogout = async () => {
    await AsyncStorage.removeItem("userToken");
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  return (
    <View style={styles.container}>
      {/* Blue Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Locations App</Text>
        {/* Logout button in the top-right corner */}
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButtonContainer}>
          <Text style={styles.buttonText}>Log out</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content Area */}
      <View style={styles.mainContent}>{children}</View>

      {/* Blue Footer Section with Navigation Buttons */}
      <View style={styles.footer}>
        {/* Row for navigation buttons */}
        <View style={styles.buttonRow}>
          {["Locations", "AddLocation", "Map", "Capitals"].map((screen) => (
            <TouchableOpacity
              key={screen}
              style={[styles.button, route.name === screen && styles.activeButton]}
              onPress={() => navigation.navigate(screen)}
            >
              <Text style={[styles.buttonText, route.name === screen && styles.activeButtonText]}>
                {screen}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "#007BFF",
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  logoutButtonContainer: {
    position: "absolute",
    right: 10,
    top: 30,
    backgroundColor: "#0056b3",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  mainContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: 500,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#0056b3",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    margin: 5,
  },
  activeButton: {
    backgroundColor: "#004099", // Darker blue for active page
    borderWidth: 2,
    borderColor: "white",
  },
  buttonText: {
    fontSize: 12,
    color: "white",
    textAlign: "center",
  },
  activeButtonText: {
    fontWeight: "bold",
  },
});

export default Layout;
