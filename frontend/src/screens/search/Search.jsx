import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import RecipeSearch from "../../components/recipeSearch/RecipeSearch.jsx";
import styles from "./Styles";



const Search = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <RecipeSearch />
    </View>
  );
};

export default Search;

