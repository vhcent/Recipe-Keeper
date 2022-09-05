import React, { Component, useState, useContext, useEffect } from "react";
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
import { searchByRecipe, searchByIngredients, getRecents } from "./RecipeSearch.js";
import { AppContext } from "../../components/AppContextProvider.jsx";

class RecipeSearch extends Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);
        // console.log("props", props.data)
        // this.props.callBack("NewDATA")
        // console.log(this.props.data)
        
        this.state = {
            data: this.props.data,
            byRecipe: true,
            isRecents: true,
            //loggedIn: this.loggedIn,
        };
    }

    async handleGetRecents() {
        this.state.isRecents = true;
        //if user is logged in, sets recipe data to recent recipes
        if(this.context[0]) { //equivalent to loggedIn from AppContext
            console.log("user logged in")
            let recents = await getRecents();
            
            let sortedData = new Array(recents.length);
            for(let i = 0 ; i < recents.length ; i++){
                let newObj = {};
                newObj['id'] = recents[i].RecipeID;
                newObj['title'] = recents[i].Name;
                newObj['image'] = recents[i].Photo;
                sortedData[parseInt(recents[i].Position, 10) - 1] = newObj;
                console.log("position", parseInt(recents[i].Position, 10) - 1);
                //sortedData[recents[i].position - 1] = "test";
                console.log(newObj);
            }
            
            console.log("trasnformed and sorted ", sortedData);
            
            this.setState({ data: sortedData});
            this.props.setRecipes(sortedData);
        }
    }

    async handleSearch(value) {
        this.state.isRecents = false;
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
                    style={styles.changeSearchContainer}
                    onPress={() =>
                        this.setState({ byRecipe: !this.state.byRecipe })
                    }
                >
                    <Text style={styles.changeSearchText}>
                        {this.state.byRecipe
                            ? "Search by Ingredients"
                            : "Search by Recipe"}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.changeSearchContainer}
                    onPress={() => {
                            this.handleGetRecents()
                        }
                    }
                >
                    <Text style={styles.changeSearchText}>
                        "Show Recents"
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
