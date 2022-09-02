import React, { Component, useEffect, useState, useContext } from "react";
import {
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    Image,
    ScrollView,
} from "react-native";
import * as StorageUtils from "../../components/StorageUtils.js";
import { AppContext } from "../../components/AppContextProvider.jsx";
import { getAllRecipes, deleteRecipe, modifyNotes } from "./Saved.js";
import SavedDisplay from "../../components/savedDisplay/SavedDisplay.jsx";
import Auth from "../../components/auth/Auth.jsx";
import styles from "./Styles";

const SearchRecipe = ({ navigation }) => {
    const [saveChange, setSaveChange] = useState(false);
    const [recipeList, setRecipeList] = React.useState(null);
    const [loggedIn, setLoggedIn] = useContext(AppContext);
    //console.log("On the saved screen");
    // apiCall();

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            getAllRecipes(setRecipeList);
        });
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);
    //currently triggered all the time, can be set to only fetch recipes when first entering the screen

    useEffect(() => {
        getAllRecipes(setRecipeList);
    }, [saveChange]);

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.log}>
                    <Auth />
                </View>
                {loggedIn ? (
                    <SavedDisplay
                        data={recipeList}
                        saveChange={saveChange}
                        setSaveChange={setSaveChange}
                    />
                ) : null}
            </ScrollView>
        </View>
    );

    // return (
    //     <View style={styles.container}>
    //         <ScrollView contentContainerStyle={styles.scrollContainer}>
    //             <View style={styles.log}>
    //                 <Auth />
    //             </View>
    //             {loggedIn ? <SavedDisplay data={recipeList} /> : null}
    //         </ScrollView>
    //     </View>
    // );
};

export default SearchRecipe;

/*
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
  */
