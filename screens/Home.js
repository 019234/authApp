import { View, Text, Button } from "react-native";
import { auth } from "../firebase";

export default function Home({ navigation }) {
    const logout = () => {
        auth.signOut();
        navigation.navigate("Login");
    };

    return (
        <View style={{ padding: 20 }}>
            <Text>Welcome, {auth.currentUser?.email}</Text>
            <Button title="Logout" onPress={logout} />
        </View>
    );
}
