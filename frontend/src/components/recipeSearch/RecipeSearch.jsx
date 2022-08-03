import React, { Component, useState }from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert  } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import styles from "./Styles";
import {searchRecipe} from "./RecipeSearch.js"

const RecipeSearch = () => {
    const [value, setValue] = useState('');
    return (
        <View style={styles.searchBar}>
            <TextInput
                id = "searchBar"
                style={styles.text}
                placeholder="Search by Recipe"
                onChangeText={text => setValue(text)}
                onEndEditing={(value) => searchRecipe(value.nativeEvent.text)}
            />
            <FontAwesome id="search-icon" name="search" size={20} style={styles.icon}
                        onPress={(value) => searchRecipe(value.nativeEvent.text)}/>
        </View>
    )
}

export default RecipeSearch;