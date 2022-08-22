
import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';


const SearchRecipe = ({ navigation }) => {

async function generateListView(list){
  let result = [];
  for(let i = 0 ; i < list.length ; i++){
    result.push(<Text style={{marginBottom: String(200 - (i*15)), fontSize: 15}}> {recipeList[String(i)].Name} </Text>)
  }
  console.log(result);
  return result;
}  

async function getStorageItem(itemName) {
  try {
    const value = await AsyncStorage.getItem(itemName)
    if(value !== null) {
      return value;
    }
    else return null;
  } catch(e) {
      console.log("Unable to retrieve item ", itemName)
      return null;
    // error reading value
  }
}

async function storeItem(itemName, value){
  try {
    await AsyncStorage.setItem(itemName, value)
  } catch (e) {
    console.err("Unable to store item")
  }
}

async function apiCall(){

  let userID = await getStorageItem('@user_id')
  console.log(userID)

  let bearerToken = await getStorageItem('@bearer_token')
  console.log(userID)

  //Optional tester API Call
  let APIresponse = await fetch(`https://cmivyuanic.execute-api.us-west-2.amazonaws.com/recipeApp/recipes?userID=${userID}`, {
    method: 'Get',
    headers: {'Authorization': 'Bearer ' + bearerToken},
    //headers: {'Authorization': 'Bearer ' + bearerToken + 'l'},
  })

  let apiJSON = await APIresponse.json()
  console.log("Mock API Call result: ");
  console.log(apiJSON)
  setRecipeList(apiJSON)
}

  const [recipeList, setRecipeList] = React.useState(null);

  //console.log("On the saved screen");
 // apiCall();

  useEffect(() => {
    //console.log("On the saved screen");
    //apiCall();
  });
  //currently triggered all the time, can be set to only fetch recipes when first entering the screen
  

  return (
    
    <View>
      <Image
        source={{
           uri: 'https://reactnative.dev/img/tiny_logo.png',
        }}
      />
      <Button
        title="Click me you won't"
        onPress={() => apiCall()}
      />
      <Text>
          "Search for Recipe"
      </Text>
      {recipeList ? (
        //generateListView(recipeList)
        <View>
            <Text style={{marginBottom: 200, fontSize: 15}}> {recipeList[0].Name} </Text>
            <Text style={{marginBottom: 185, fontSize: 15}}> {recipeList[1].Name} </Text>
          </View>
        ) : (
          <Text style={{marginBottom: 200, fontSize: 15}}> Why don't you click it and find out </Text>
      )}
      
    </View>
  );
};

export default SearchRecipe;

