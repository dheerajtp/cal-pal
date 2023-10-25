import React, { useState } from "react";
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity } from 'react-native';
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
      <View style={Styles.buttonContainerMain}>
        <TouchableOpacity onPress={handleAddMeal}>
          <Text style={Styles.buttonText}>Add a meal</Text>
        </TouchableOpacity>
      </View>
      <View style={Styles.buttonContainerMain}>
        <TouchableOpacity onPress={handleSubmit}>
          <Text style={Styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
      {calorieEstimates.map((calories, index) => (
        <Text key={index} style={Styles.estimateText}>Meal {index + 1}: {calories} calories</Text>
      ))}
            <Text style={Styles.estimateText}>Total Calories: {totalCalories()}</Text>

    </View>
  );
}