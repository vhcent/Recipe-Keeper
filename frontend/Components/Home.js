import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from "react-native";

const Home = ({ navigation }) => {
    return (
      <Button
        title="Search for Recipe"
        onPress={() =>
          navigation.navigate('SearchRecipe', { name: 'Button' })
        }
      />
    );
  };

export default Home;


