import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Styles } from "../assets/style/Styles";

export default function Home({ navigation }) {
  const handleLogin = () => {
    navigation.navigate("Login");
  };

  const handleRegister = () => {
    navigation.navigate("Register");
  };

  const handleTry = () => {
    navigation.navigate("Try");
  };

  return (
    <View style={Styles.container}>
      <Text style={[Styles.title, { marginBottom: 20 }]}>
        Calpal Calorie App!!!!
      </Text>
      <Image
        source={require("../assets/images/avatar.png")}
        style={{ width: 300, height: 300, marginBottom: 20 }}
      />
      <View style={Styles.buttonContainer}>
        <TouchableOpacity
          style={[
            Styles.button,
            Styles.loginButton,
            { backgroundColor: "#002D62", marginRight: 10 },
          ]}
          onPress={handleLogin}
        >
          <Text style={[Styles.buttonText, { color: "#FFFFFF" }]}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            Styles.button,
            Styles.registerButton,
            { backgroundColor: "#002D62", marginHorizontal: 10 },
          ]}
          onPress={handleRegister}
        >
          <Text style={[Styles.buttonText, { color: "#FFFFFF" }]}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            Styles.button,
            Styles.tryButton,
            { backgroundColor: "#002D62", marginLeft: 10 },
          ]}
          onPress={handleTry}
        >
          <Text style={[Styles.buttonText, { color: "#FFFFFF" }]}>
            Try for Free
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
