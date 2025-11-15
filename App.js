import StackNavigator from "./navigation/StackNavigator";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return <StackNavigator />;
}

onAuthStateChanged(auth, (user) => {
  console.log("AUTH STATUS:", user ? "LOGGED IN" : "LOGGED OUT");
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
