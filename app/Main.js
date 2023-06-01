import React, { useState, useEffect } from "react";
import { View, Text } from 'react-native';
import { Styles } from './Styles';

export default function Main() {
  return (
    <View style={Styles.container}>
      <Text style={Styles.title}>Main Page</Text>
    </View>
  );
}
