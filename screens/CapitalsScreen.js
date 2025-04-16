import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet, Image } from "react-native";
import axios from "axios";
import Layout from "../components/Layout";

const CapitalsScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);

  const fetchCountryData = async () => {
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/name/${search}`);
      setCountries(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout navigation={navigation}>
      <View style={styles.container}>
        <Text style={styles.title}>Search for a Country</Text>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Enter country name or capital"
          style={styles.input}
        />
        <Button title="Search" onPress={fetchCountryData} />
        
        <FlatList
          data={countries}
          keyExtractor={(item) => item.cca3}
          renderItem={({ item }) => (
            <View style={styles.resultContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.countryName}>{item.name.common}</Text>
                <Text style={styles.capital}>Capital: {item.capital ? item.capital[0] : "N/A"}</Text>
              </View>
              <Image source={{ uri: item.flags.png }} style={styles.flag} />
            </View>
          )}
        />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  resultContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
    borderBottomWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 1, 
    width: "100%", 
    backgroundColor: "#f9f9f9", 
  },
  textContainer: {
    flex: 1, 
  },
  countryName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  capital: {
    fontSize: 14,
    color: "#555",
  },
  flag: {
    width: 60, 
    height: 40,
    borderRadius: 3,
  },
});

export default CapitalsScreen;


