import { useState } from "react";
import { View, TextInput, Button, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { Feather } from '@expo/vector-icons';


export default function Register({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const registerUser = async () => {
        if (!email || !password) {
            Alert.alert("Validation Error", "Please enter both email and password.");
            return;
        }

        setLoading(true);

        try {
            // Create user with Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            // Save user info to Firestore
            await setDoc(doc(db, "users", userCredential.user.uid), {
                email: email,
                createdAt: serverTimestamp(),
            });

            Alert.alert("Success", "Account created successfully!");
            navigation.navigate("Home");
        } catch (error) {
            // Handle common Firebase errors
            let errorMessage = error.message;
            if (error.code === "auth/email-already-in-use") {
                errorMessage = "This email is already in use.";
            } else if (error.code === "auth/invalid-email") {
                errorMessage = "Invalid email format.";
            } else if (error.code === "auth/weak-password") {
                errorMessage = "Password should be at least 6 characters.";
            }
            Alert.alert("Registration Error", errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>

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
                title={loading ? "Creating Account..." : "Create Account"}
                onPress={registerUser}
                disabled={loading}
            />

            <View style={{ marginTop: 15 }}>
                <Button
                    title="Already have an account? Login"
                    onPress={() => navigation.navigate("Login")}
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
