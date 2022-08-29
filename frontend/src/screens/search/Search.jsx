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
    const [recipeDetails, setRecipeDetails] = useState([]);

    return (
        <View style={styles.container}>
            <RecipeSearch
                data="dataTesting"
                setRecipes={setRecipeData}
                setDetails={setRecipeDetails}
            />
            <View style={styles.scrollViewContainer}>
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <RecipeDisplay
                        data={recipeData}
                        details={recipeDetails}
                        navigation={navigation}
                    />
                </ScrollView>
            </View>
        </View>
    );
};

export default Search;
