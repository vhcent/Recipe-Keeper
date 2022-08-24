import React, { Component, useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    ScrollView,
} from "react-native";
import RecipeSearch from "../../components/recipeSearch/RecipeSearch.jsx";
import RecipeDisplay from "../../components/recipeDisplay/RecipeDisplay.jsx";
import styles from "./Styles";

const Search = ({ navigation }) => {
    const [recipeData, setRecipeData] = useState([]);

    useEffect(() => {
        // console.log("Super duper test:", recipeData);
    });

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <RecipeSearch data="dataTesting" callBack={setRecipeData} />
                <RecipeDisplay data={recipeData} navigation={navigation} />
            </ScrollView>
        </View>
    );
};

export default Search;
