import React, { Component, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import styles from "./Styles";
import { searchByRecipe, searchByIngredients } from "./RecipeSearch.js";

class RecipeSearch extends Component {
    constructor(props) {
        super(props);

        // console.log("props", props.data)
        // this.props.callBack("NewDATA")
        // console.log(this.props.data)

        this.state = {
            data: this.props.data,
            byRecipe: true,
        };
    }

    async handleSearch(value) {
        if (this.state.byRecipe) {
            // Search for recipe and store it in state
            let recipes = await searchByRecipe(value);
            this.setState({ data: recipes });
            this.props.setRecipes(recipes);
        } else {
            let recipes = await searchByIngredients(value);
            // console.log("recipes? ", recipes);
            this.setState({ data: recipes });
            this.props.setRecipes(recipes);
        }
        // this.setState({ data: recipes });
        // this.props.setRecipes(recipes);
    }

    render() {
        return (
            <View>
                <View style={styles.searchBar}>
                    <TextInput
                        id="searchBar"
                        style={styles.text}
                        placeholder={
                            this.state.byRecipe
                                ? "Search by Recipe"
                                : "Search by Ingredients"
                        }
                        placeholderTextColor="#FFF"
                        onChangeText={(text) => this.setState({ value: text })}
                        onEndEditing={() => this.handleSearch(this.state.value)}
                    />
                    <FontAwesome
                        id="search-icon"
                        name="search"
                        size={20}
                        style={styles.icon}
                        onPress={() => this.handleSearch(this.state.value)}
                    />
                </View>
                <TouchableOpacity
                    onPress={() =>
                        this.setState({ byRecipe: !this.state.byRecipe })
                    }
                >
                    <Text>
                        {this.state.byRecipe
                            ? "Search by Ingredients"
                            : "Search by Recipe"}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}
/*
const RecipeSearch = () => {
    const [value, setValue] = useState('');

    function handleSearch(value) {
        console.log(value.nativeEvent); 
        searchByRecipe(value.nativeEvent.text);
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
