import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, SafeAreaView, TextInput, Button, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Config from 'react-native-config';
import { Styles } from "./Styles";
const AWS = require('aws-sdk');


AWS.config.update({
  region: Config.AWS_REGION,
  accessKeyId: Config.AWS_ACCESS_KEY_ID,
  secretAccessKey: Config.AWS_SECRET_ACCESS_KEY,
  endpoint: Config.AWS_DYNAMODB_ENDPOINT,
});



const documentClient = new AWS.DynamoDB.DocumentClient();

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
 
  useEffect(() => {
    // Configure AWS SDK once when the component mounts
    AWS.config.update({
      region: 'us-east-2', // Replace with your AWS region
      accessKeyId: 'AKIATAZJI2XORXITI3PL', // Replace with your AWS access key ID
      secretAccessKey: 'MTgonJaGYYmps3f9duyZlUb7P6tt4OfQjQvHw4Iy', // Replace with your AWS secret access key
      endpoint:'https://dynamodb.us-east-2.amazonaws.com'
    });
  }, []);

  
  const getUserByEmailAndPassword = async (email, password) => {
    const params = {
      TableName: 'users',
      IndexName: 'email-index',
      KeyConditionExpression: '#email = :email',
      FilterExpression: '#password = :password',
      ExpressionAttributeNames: {
        '#email': 'email',
        '#password': 'password'
      },
      ExpressionAttributeValues: {
        ':email': email,
        ':password': password,
        
      },
    };
  
    try {
      const result = await documentClient.query(params).promise();
  
      // Return the user if found, otherwise return null
      return result.Items[0] || null;
    } catch (error) {
      console.error('Error retrieving user by email and password:', error);
      return null;
    }
  };
  
  const handleLogin = async () => {
    // Check if email or password is empty
    if (email.trim() === '' || password.trim() === '') {
      Alert.alert(
        'Missing Fields',
        'Please ensure all fields are filled in.',
        [
          {
            text: 'OK',
          },
        ]
      );
      return;
    }
    
    console.log('Logging in...');
    
    try {
      // Perform the email and password check here
      console.log('Checking if user exists:', email);
      const existingUser = await getUserByEmailAndPassword(email, password);
      console.log('Existing user:', existingUser);
  
      if (existingUser) {
        navigation.navigate("Main"); // Navigate to the Main screen after successful login
      } else {
        Alert.alert(
          'Invalid Credentials',
          'The email or password is incorrect. Please try again.',
          [
            {
              text: 'OK',
            },
          ]
        );
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
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
