import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TextInput,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Styles } from "../assets/style/Styles";
const AWS = require("aws-sdk");
import Config from "react-native-config";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../utils/validators";
import FormField from "../components/FormField";
import Button from "../components/Button";

AWS.config.update({
  region: Config.AWS_REGION,
  accessKeyId: Config.AWS_ACCESS_KEY_ID,
  secretAccessKey: Config.AWS_SECRET_ACCESS_KEY,
  endpoint: Config.AWS_DYNAMODB_ENDPOINT,
});

const documentClient = new AWS.DynamoDB.DocumentClient();

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const navigation = useNavigation();

  const getUserByEmailAndPassword = async (email, password) => {
    const params = {
      TableName: "users",
      IndexName: "email-index",
      KeyConditionExpression: "#email = :email",
      FilterExpression: "#password = :password",
      ExpressionAttributeNames: {
        "#email": "email",
        "#password": "password",
      },
      ExpressionAttributeValues: {
        ":email": email,
        ":password": password,
      },
    };

    try {
      const result = await documentClient.query(params).promise();

      // Return the user if found, otherwise return null
      return result.Items[0] || null;
    } catch (error) {
      console.error("Error retrieving user by email and password:", error);
      return null;
    }
  };

  const onSubmit = async (data) => {
    console.log(data);
    try {
      // Perform the email and password check here
      const existingUser = await getUserByEmailAndPassword(
        data.email,
        data.password
      );
      console.log("Existing user:", existingUser);

      if (existingUser) {
        navigation.navigate("Main"); // Navigate to the Main screen after successful login
      } else {
        Alert.alert(
          "Invalid Credentials",
          "The email or password is incorrect. Please try again.",
          [
            {
              text: "OK",
            },
          ]
        );
      }
    } catch (error) {
      Alert.alert(
        "Login Failed",
        "An error occurred during login. Please try again.",
        [{ text: "OK" }]
      );
    }
  };

  useEffect(() => {
    // Configure AWS SDK once when the component mounts
    AWS.config.update({
      region: Config.AWS_REGION,
      accessKeyId: Config.AWS_ACCESS_KEY_ID,
      secretAccessKey: Config.AWS_SECRET_ACCESS_KEY,
      endpoint: Config.AWS_DYNAMODB_ENDPOINT,
    });
  }, []);

  return (
    <View style={Styles.container}>
      <Text style={{ color: "#545162", marginBottom: 20 }}>
        Calpal! Calorie App!
      </Text>

      <FormField
        name="email"
        control={control}
        errors={errors}
        placeholder="Email"
      />
      <FormField
        name="password"
        control={control}
        errors={errors}
        placeholder="Password"
        secureTextEntry
      />
      <Button title="Log In" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}
