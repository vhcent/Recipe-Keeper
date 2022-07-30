import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from "react-native";

const s = require('./Styles');

const Home = ({ navigation }) => {
    return (
      <View style={s.container}>
        <Button 
          title="Search for Recipe"
          onPress={() =>
            navigation.navigate('SearchRecipe', { name: 'Button' })
          }
        />
      </View>
      
    );
  };

export default Home;


