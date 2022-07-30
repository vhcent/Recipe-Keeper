import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from "react-native";

import SearchRecipe from './Components/SearchRecipe';
import Home from './Components/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen
          name="SearchRecipe"
          component={SearchRecipe}
          options={{ title: 'Search for Recipe' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  };

export default App;