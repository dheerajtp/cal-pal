import React, { useEffect } from "react";
import { View, TextInput, Button, Alert, Text } from "react-native";

import { Styles } from "./Styles";
import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import "react-native-get-random-values";
import { useNavigation } from "@react-navigation/native";

import Config from "react-native-config";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registrationSchema } from "./src/utils/validators";
import FormField from "./src/components/FormField";

AWS.config.update({
  region: Config.AWS_REGION,
  accessKeyId: Config.AWS_ACCESS_KEY_ID,
  secretAccessKey: Config.AWS_SECRET_ACCESS_KEY,
  endpoint: Config.AWS_DYNAMODB_ENDPOINT,
});

const documentClient = new AWS.DynamoDB.DocumentClient();

export default function Register() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(registrationSchema),
  });

  const onSubmit = async (data) => {
    try {
      const existingUser = await getUserByEmail(data.email);
      if (existingUser) {
        Alert.alert(
          "Invalid Email",
          "This email address is already registered. Please use a different email address.",
          [
            {
              text: "OK",
            },
          ]
        );
        return;
      } else {
        // Generate a unique userId for the user
        const userId = uuidv4();
        const { firstName, lastName, age, weight, email, password } = data;
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
          TableName: "users",
          Item: item,
        };

        // Put the item into the DynamoDB table
        await documentClient.put(params).promise();

        console.log("Registration successful");

        Alert.alert(
          "Registration Successful",
          "You have successfully registered!",
          [{ text: "OK", onPress: () => navigation.navigate("Login") }]
        );
      }
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Registration Failed",
        "An error occurred during registration. Please try again.",
        [{ text: "OK" }]
      );
    }
  };

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
      TableName: "users",
      IndexName: "email-index",
      KeyConditionExpression: "#email = :email",
      ExpressionAttributeNames: {
        "#email": "email",
      },
      ExpressionAttributeValues: {
        ":email": email,
      },
    };

    console.log("Querying with params:", params);

    try {
      const result = await documentClient.query(params).promise();
      console.log("Query result:", result);

      const existingUser = result.Items[0] || null;
      console.log("User by email:", existingUser);
      return existingUser;
    } catch (error) {
      console.error("Error retrieving user by email:", error);
      return null;
    }
  };

  return (
    <View style={[Styles.container, { backgroundColor: "#1434A4" }]}>
      <FormField
        name="firstName"
        control={control}
        errors={errors}
        placeholder="First Name"
      />
      <FormField
        name="lastName"
        control={control}
        errors={errors}
        placeholder="Last Name"
      />
      <FormField
        name="age"
        control={control}
        errors={errors}
        placeholder="Age"
        keyboardType="numeric"
      />
      <FormField
        name="weight"
        control={control}
        errors={errors}
        placeholder="Weight"
        keyboardType="numeric"
      />
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
      <FormField
        name="confirmPassword"
        control={control}
        errors={errors}
        placeholder="Confirm Password"
        secureTextEntry
      />

      <Button title="Register" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}
