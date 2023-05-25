import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import { Styles } from "./Styles";

export default function Register() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    // Implement your registration logic here
    // Validate form fields, make API calls, etc.
    console.log("Registering...");
  };

  return (
    <View style={[Styles.container, { backgroundColor: "#1434A4" }]}>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={Styles.input}
      />
      <TextInput
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        style={Styles.input}
      />
      <TextInput
        placeholder="Weight"
        value={weight}
        onChangeText={setWeight}
        style={Styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={Styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={Styles.input}
      />
      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={Styles.input}
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}
