import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Button, StyleSheet, Alert } from "react-native";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Feather } from '@expo/vector-icons';


export default function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const login = async () => {
        if (!email || !password) {
            Alert.alert("Validation Error", "Please enter both email and password.");
            return;
        }

        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigation.navigate("Home");
        } catch (error) {
            let errorMessage = "Something went wrong. Please try again.";

            switch (error.code) {
                case "auth/invalid-email":
                    errorMessage = "Invalid email format.";
                    break;
                case "auth/user-not-found":
                    errorMessage = "No account found with this email.";
                    break;
                case "auth/wrong-password":
                    errorMessage = "Incorrect password.";
                    break;
                case "auth/too-many-requests":
                    errorMessage = "Too many attempts. Try again later.";
                    break;
                case "auth/missing-password":
                    errorMessage = "Please enter your password.";
                    break;
                case "auth/missing-email":
                    errorMessage = "Please enter your email.";
                    break;
                case "auth/invalid-credential":
                    errorMessage = "Your email or password is incorrect.";
                    break;
            }

            Alert.alert("Login Error", errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                style={styles.input}
            />

            <View style={styles.inputWrapper}>
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    style={styles.input}
                />

                <TouchableOpacity
                    style={styles.eyeButton}
                    onPress={() => setShowPassword(!showPassword)}
                >
                    <Feather
                        name={showPassword ? "eye" : "eye-off"}
                        size={20}
                        color="#555"
                    />
                </TouchableOpacity>
            </View>


            <Button
                title={loading ? "Logging in..." : "Login"}
                onPress={login}
                disabled={loading}
            />

            <View style={{ marginTop: 15 }}>
                <Button
                    title="Create an account"
                    onPress={() => navigation.navigate("Register")}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
    },

    inputWrapper: {
        position: "relative",
        width: "100%",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        paddingRight: 40,
        marginBottom: 15,
    },
    eyeButton: {
        position: "absolute",
        right: 10,
        top: "50%",
        transform: [{ translateY: -22 }],
        padding: 4,
    },


});
