// Import Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQqUhEc6CuOz2PBzszokC6Ii-_Md6qjBo",
  authDomain: "location-app2.firebaseapp.com",
  projectId: "location-app2",
  storageBucket: "location-app2.firebasestorage.app",
  messagingSenderId: "104528777346",
  appId: "1:104528777346:android:b3220dbdb818c36971649b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage for persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };
