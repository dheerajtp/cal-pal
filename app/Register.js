import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Alert, Text } from "react-native";

import { Styles } from "./Styles";
import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import 'react-native-get-random-values';
import { useNavigation } from "@react-navigation/native";

import Config from 'react-native-config';

AWS.config.update({
  region: Config.AWS_REGION,
  accessKeyId: Config.AWS_ACCESS_KEY_ID,
  secretAccessKey: Config.AWS_SECRET_ACCESS_KEY,
  endpoint: Config.AWS_DYNAMODB_ENDPOINT,
});



const documentClient = new AWS.DynamoDB.DocumentClient();

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const navigation = useNavigation();
  
  useEffect(() => {
    // Configure AWS SDK once when the component mounts
    AWS.config.update({
      region: Config.AWS_REGION,
      accessKeyId: Config.AWS_ACCESS_KEY_ID,
      secretAccessKey: Config.AWS_SECRET_ACCESS_KEY,
      endpoint: Config.AWS_DYNAMODB_ENDPOINT,
    });
  }, []);


  const getUserByEmail = async (email) => {
    const params = {
      TableName: 'users', 
      IndexName: 'email-index', 
      KeyConditionExpression: '#email = :email',
      ExpressionAttributeNames: {
        '#email': 'email',
      },
      ExpressionAttributeValues: {
        ':email': email,
      },
    };
  
    console.log('Querying with params:', params);
  
    try {
      const result = await documentClient.query(params).promise();
      console.log('Query result:', result);
  
      const existingUser = result.Items[0] || null;
      console.log('User by email:', existingUser);
      return existingUser;
    } catch (error) {
      console.error('Error retrieving user by email:', error);
      return null;
    }
  };
  
  
  
  
  const handleEmailChange = (text) => {
    console.log('Email input changed:', text);
    setEmail(text);
  };
  
  const handleRegister = async () => {
    console.log('Register button pressed');
  
    // Perform the email check here instead of in handleEmailChange
    console.log('Checking if email exists:', email);
    const existingUser = await getUserByEmail(email);
    console.log('Existing user:', existingUser);
  
    if (existingUser) {
      setIsEmailValid(false);
      Alert.alert(
        'Invalid Email',
        'This email address is already registered. Please use a different email address.',
        [
          {
            text: 'OK',
          },
        ]
      );
      return;
    } 
  
    setIsEmailValid(true);
  
    try {
      // Generate a unique userId for the user
      const userId = uuidv4();
  
      // Create the user registration item
      const item = {
        userId,
        firstName,
        lastName,
        age,
        weight,
        email,
        password,
      };
  
      // Set the parameters for the DynamoDB put operation
      const params = {
        TableName: 'users', 
        Item: item,
      };
  
      // Put the item into the DynamoDB table
      await documentClient.put(params).promise();
  
      console.log('Registration successful');
  
      Alert.alert('Registration Successful', 'You have successfully registered!', [
        { text: 'OK', onPress: () => navigation.navigate('Login') },
      ]);
    } catch (error) {
      console.error('Registration failed:', error);
      Alert.alert('Registration Failed', 'An error occurred during registration. Please try again.', [
        { text: 'OK' },
      ]);
    }
  };
  
  
  return (
    <View style={[Styles.container, { backgroundColor: "#1434A4" }]}>
      <TextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
        style={Styles.input}
      />
      <TextInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
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
        onChangeText={handleEmailChange}
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
