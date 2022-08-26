import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import Auth from "../../components/auth/Auth.jsx";



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
      <Auth/>
    </View>
  );
};

export default SearchRecipe;

