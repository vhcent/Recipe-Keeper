import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from "react-native";

import SearchRecipe from './Components/SearchRecipe';
import Home from './Components/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen
          name="SearchRecipe"
          component={SearchRecipe}
          options={{ title: 'Search for Recipe' }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  };

export default App;