import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import RecipeSearch from "../../components/recipeSearch/RecipeSearch";



const Search = ({ navigation }) => {
  return (
    // <Button
    //   title="Home Page"
    //   onPress={() =>
    //     navigation.navigate('Home', { name: 'Button' })
    //   }
    // />
    <RecipeSearch/>
  );
};

export default Search;

