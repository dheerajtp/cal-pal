import React, { useState } from "react";
import { View, Text, ScrollView, SafeAreaView, TextInput, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Styles } from "./Styles";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = () => {
    // Implement your login logic here
    // Validate email and password, make API calls, etc.
    console.log("Logging in...");
    navigation.navigate("Home");
  };

  return (
    <View style={[Styles.container, { backgroundColor: "#1434A4" }]}>
      <Text style={{ color: "#fff", marginBottom: 20 }}>Drork! Calorie App!</Text>
      <TextInput
        placeholder="Email"
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={[Styles.input, { color: "#1434A4" }]}
      />
      <TextInput
        label="Password"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={Styles.input}
      />
      <Button title="Log In" onPress={handleLogin} />
    </View>
  );
}
