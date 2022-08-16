import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import styles from "./Styles";
import { searchRecipe } from "./RecipeSearch.js";

class RecipeSearch extends Component {
    constructor(props) {
        super(props)

        this.state = {
            value: '',
        }
    }

    handleSearch(value) {
        searchRecipe(value);
    }

    render() {
        return (
            <View style={styles.searchBar}>
                <TextInput
                    id="searchBar"
                    style={styles.text}
                    placeholder="Search by Recipe"
                    placeholderTextColor="#FFF"
                    onChangeText={text => this.setState({ value: text })}
                    onEndEditing={() => this.handleSearch(this.state.value)}
                />
                <FontAwesome id="search-icon" name="search" size={20} style={styles.icon}
                    onPress={() => this.handleSearch(this.state.value)} />
            </View>
        )
    }
}
/*
const RecipeSearch = () => {
    const [value, setValue] = useState('');

    function handleSearch(value) {
        console.log(value.nativeEvent); 
        searchRecipe(value.nativeEvent.text);
    }

    return (
        <View style={styles.searchBar}>
            <TextInput
                id = "searchBar"
                style={styles.text}
                placeholder="Search by Recipe"
                onChangeText={text => setValue(text)}
                onEndEditing={(value) => handleSearch(value)}
            />
            <FontAwesome id="search-icon" name="search" size={20} style={styles.icon}
                        onPress={(value) => handleSearch(value)}/>
        </View>
    )
}
*/
export default RecipeSearch;