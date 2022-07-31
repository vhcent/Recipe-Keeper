import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import styles from "./Styles";

//const styles = require("./Styles")

const RecipeSearch = () => {
    return (
        <View style={styles.searchBar}>
            <FontAwesome name="search" size={20} style={styles.icon} />
            <TextInput
                style={styles.text}
                placeholder="Search by Recipe"
            />
        </View>
    )
}

export default RecipeSearch;