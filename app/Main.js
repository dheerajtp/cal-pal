import React, { useState } from "react";
import { View, Text, Button, TextInput, Alert, StyleSheet } from 'react-native';
import { Styles } from './Styles';
import axios from "axios";
import { edamam_api_key } from "@env";

// Now you can use edamam_api_key in your code
console.log(edamam_api_key); // This will print your Edamam API key

export default function Main() {
  const [meals, setMeals] = useState(['']);
  const [calorieEstimates, setCalorieEstimates] = useState([]);

  const handleAddMeal = () => {
    setMeals([...meals, '']);
  }

  const handleMealChange = (text, index) => {
    const newMeals = [...meals];
    newMeals[index] = text;
    setMeals(newMeals);
  }

  const handleSubmit = async () => {
    const newCalorieEstimates = [];
    for (let meal of meals) {
      // Call the Edamam API to get estimated calories
      const estimatedCalories = await getEstimatedCalories(meal);
      newCalorieEstimates.push(estimatedCalories);
    }
    setCalorieEstimates(newCalorieEstimates);
    Alert.alert('Meals submitted!', `Here are your meals: ${meals.join(', ')}`);
  }

  const totalCalories = () => {
    let total = 0;
    for (let calories of calorieEstimates) {
      total += calories;
    }
    return total;
  }

  return (
    <View style={Styles.container}>
      <Text style={Styles.title}>Main Page</Text>
      {meals.map((meal, index) => (
        <TextInput
          key={index}
          style={Styles.input}
          onChangeText={(text) => handleMealChange(text, index)}
          value={meal}
          placeholder={`Meal ${index + 1}`}
        />
      ))}
      <View style={styles.buttonContainer}>
        <Button onPress={handleAddMeal} title="Add a meal" />
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={handleSubmit} title="Submit" />
      </View>
      {calorieEstimates.map((calories, index) => (
        <Text key={index} style={styles.estimateText}>Meal {index + 1}: {calories} calories</Text>
      ))}
            <Text style={styles.estimateText}>Total Calories: {totalCalories()}</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
  },
  estimateText: {
    marginTop: 10,
  },
});

async function getEstimatedCalories(meal) {
  // Define the Edamam API URL
  const EDAMAM_API_URL = "https://api.edamam.com/api/nutrition-data";

  // Define the Edamam API parameters
  const params = {
    app_id: "e722a791",
    app_key: edamam_api_key,
    ingr: meal,
  };

  // Send a GET request to the Edamam API
  try {
    const response = await axios.get(EDAMAM_API_URL, { params });

    console.log("API Response:", response.data); // Log the response data

    // Extract the estimated calories from the response
    const estimatedCalories = response.data.calories;

    console.log("Estimated Calories:", estimatedCalories); // Log the estimated calories

    // Return the estimated calories
    return estimatedCalories;
  } catch (error) {
    console.error("Error response:", error.response.data); // Log the response data for further inspection
    console.error("Status code:", error.response.status); // Log the response status code
    console.error("Headers:", error.response.headers); // Log the response headers
    return null;
  }
}
