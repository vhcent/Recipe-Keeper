
import React, { Component, useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image } from "react-native";
import * as StorageUtils from "../../components/StorageUtils.js";
import {AppContext} from "../../components/AppContextProvider.jsx";

/*
const [loggedIn, setLoggedIn] = useState(null);
*/
/*
export function setLogin(status){
  setLoggedIn(status)
}
*/
const SearchRecipe = ({navigation}) => {

async function apiCall(){

  let userID = await StorageUtils.getStorageItem('@user_id')
  console.log(userID)

  let bearerToken = await StorageUtils.getStorageItem('@bearer_token')
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
  const [loggedIn, setLoggedIn] = useContext(AppContext) 
  //console.log("On the saved screen");
 // apiCall();


  useEffect(() => {
  
  });
  //currently triggered all the time, can be set to only fetch recipes when first entering the screen
  

  return (
    <View>
      { loggedIn  ? (
        <>
            <Text>You are logged in!</Text>
        </>
        ) : (
          <>
          <Text>You are not logged in :/</Text>
          </>
        )}
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

