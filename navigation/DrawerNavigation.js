import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../screens/Home";
import Calendar from "../screens/Calendar";
import { View, Text, Pressable } from "react-native";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator({ navigation }) {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: true,
                headerStyle: { backgroundColor: "#fff" },
                headerTintColor: "#d32f2f",
            }}
        >

            <Drawer.Screen name="Dashboard" component={Home} />

            <Drawer.Screen name="Calendar" component={Calendar} />

            <Drawer.Screen
                name="Logout"
                component={LogoutScreen}
                options={{
                    title: "Logout",
                }}
            />

        </Drawer.Navigator>
    );
}

// Simple logout handler screen
function LogoutScreen({ navigation }) {
    React.useEffect(() => {
        navigation.replace("Login");
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Logging out...</Text>
        </View>
    );
}
