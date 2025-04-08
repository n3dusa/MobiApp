import React, { createContext, useState, useEffect } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Ensure db is correctly imported
import { auth } from "../firebaseConfig"; // Ensure auth is correctly imported

export const LocationsContext = createContext();

export const LocationsProvider = ({ children }) => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = () => {
      const user = auth.currentUser;
      if (!user) return;

      // Fetch locations from the user's specific subcollection
      const locationsRef = collection(db, "users", user.uid, "locations");
      const q = query(locationsRef); // Use the collection reference here

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const locationsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLocations(locationsData);
      });

      return () => unsubscribe();
    };

    fetchLocations();
  }, []);

  return (
    <LocationsContext.Provider value={{ locations, setLocations }}>
      {children}
    </LocationsContext.Provider>
  );
};