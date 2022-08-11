import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import Login from "../../components/login/Login.jsx";



const SearchRecipe = ({ navigation }) => {
  return (
    // <Button
    //   title="Home Page"
    //   onPress={() =>
    //     navigation.navigate('Home', { name: 'Button' })
    //   }
    // />
    <View>
      <Text>
          "Search for Recipe"
      </Text>
      <Login/>
    </View>
  );
};

export default SearchRecipe;

