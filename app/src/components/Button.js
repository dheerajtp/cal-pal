import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { Styles } from "../assets/style/Styles";

const Button = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={Styles.buttonNew} onPress={onPress}>
      <Text style={Styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
