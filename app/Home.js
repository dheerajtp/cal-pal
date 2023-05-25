import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Styles } from './Styles';

export default function Home({ navigation }) {
  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  const handleTry = () => {
    navigation.navigate('Try');
  };

  return (
    <View style={Styles.container}>
      <Text style={Styles.title}>Drork</Text>
      <TouchableOpacity style={[Styles.button, Styles.loginButton]} onPress={handleLogin}>
        <Text style={Styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[Styles.button, Styles.registerButton]} onPress={handleRegister}>
        <Text style={Styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[Styles.button, Styles.tryButton]} onPress={handleTry}>
        <Text style={Styles.buttonText}>Try for Free</Text>
      </TouchableOpacity>
    </View>
  );
}
