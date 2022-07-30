import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
const s = require('./Styles');


const SearchRecipe = ({ navigation }) => {
  return (
    // <Button
    //   title="Home Page"
    //   onPress={() =>
    //     navigation.navigate('Home', { name: 'Button' })
    //   }
    // />
    <View style={s.container}>
      <Text>
          "Search for Recipe"
      </Text>
    </View>
  );
};

export default SearchRecipe;

