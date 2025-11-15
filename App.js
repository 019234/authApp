import React, { useEffect } from "react";
import StackNavigator from "./navigation/StackNavigator";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { StyleSheet } from 'react-native';

export default function App() {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("AUTH STATUS:", user ? "LOGGED IN" : "LOGGED OUT");
    });
    return unsubscribe;
  }, []);

  return <StackNavigator />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});