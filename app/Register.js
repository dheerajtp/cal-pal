import React, { useState, useEffect } from "react";
import { View, TextInput, Button } from "react-native";
import { Styles } from "./Styles";
import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import 'react-native-get-random-values';

AWS.config.update({
  region: 'us-east-2', // Replace with your AWS region
  accessKeyId: 'AKIATAZJI2XORXITI3PL', // Replace with your AWS access key ID
  secretAccessKey: 'MTgonJaGYYmps3f9duyZlUb7P6tt4OfQjQvHw4Iy', // Replace with your AWS secret access key
  endpoint:'https://dynamodb.us-east-2.amazonaws.com'
});

const documentClient = new AWS.DynamoDB.DocumentClient();

export default function Register() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    // Configure AWS SDK once when the component mounts
    AWS.config.update({
      region: 'us-east-2', // Replace with your AWS region
      accessKeyId: 'AKIATAZJI2XORXITI3PL', // Replace with your AWS access key ID
      secretAccessKey: 'MTgonJaGYYmps3f9duyZlUb7P6tt4OfQjQvHw4Iy', // Replace with your AWS secret access key
      endpoint:'https://dynamodb.us-east-2.amazonaws.com'
    });
  }, []);

  const handleRegister = async () => {
    try {
      // Generate a unique userId for the user
      const userId = uuidv4();

      // Create the user registration item
      const item = {
        userId,
        name,
        age,
        weight,
        email,
        password,
      };

      // Set the parameters for the DynamoDB put operation
      const params = {
        TableName: 'users', // Replace 'users' with your actual table name
        Item: item,
      };

      // Put the item into the DynamoDB table
      await documentClient.put(params).promise();

      console.log('Registration successful');
    } catch (error) {
      console.error('Registration failed:', error);
    }
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
