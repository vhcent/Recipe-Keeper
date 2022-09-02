import React, { Component, useContext, useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    ScrollView,
} from "react-native";
import { AppContext } from "../../components/AppContextProvider.jsx";
import { getGrocery, addGrocery, deleteGrocery } from "./GroceryList.js";
import Auth from "../../components/auth/Auth.jsx";
import { AntDesign } from "@expo/vector-icons";
import styles from "./Styles";

const Grocery = ({ navigation }) => {
    const [loggedIn, setLoggedIn] = useContext(AppContext);
    const [groceryList, setGroceryList] = useState([]);
    const [toAdd, setToAdd] = useState(false); //a switch!
    const [text, setText] = useState(null);
    //const [userId, setUserID] = useState("");

    // useEffect(() => {
    //   getGrocery(setGroceryList);
    //   console.log("list", groceryList);
    // },[navigation]);

    async function handleGroceryAdd() {
        await addGrocery(text);
        setToAdd(!toAdd);
    }

    async function handleGroceryDelete(ID) {
        await deleteGrocery(ID);
        setToAdd(!toAdd);
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            // The screen is focused
            // Call any action
            getGrocery(setGroceryList);
        });
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        getGrocery(setGroceryList);
    }, [toAdd]);

    // Auth login/signout button located in top right
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {loggedIn && groceryList != null ? (
                    <View>
                        <View style={styles.log}>
                            <Auth />
                        </View>
                        <View style={styles.searchBar}>
                            <TextInput
                                id="searchBar"
                                style={styles.text}
                                placeholder={"Add Grocery item"}
                                placeholderTextColor="#FFF"
                                onChangeText={(text) => setText(text)}
                                //onEndEditing={() => handleGroceryAdd()}
                            />
                            <AntDesign
                                id="plus"
                                name="plus"
                                size={30}
                                style={styles.icon}
                                onPress={() => handleGroceryAdd()}
                            />
                        </View>
                        <View style={styles.groceryList}>
                            <Text style={styles.groceryText}>
                                {" "}
                                Grocery List{" "}
                            </Text>
                            {groceryList.map((element, key) => {
                                return (
                                    <View style={styles.groceryRow}>
                                        <Text style={styles.itemText}>
                                            {element.Item}
                                        </Text>

                                        <AntDesign
                                            id="minus"
                                            name="minus"
                                            size={30}
                                            color={"red"}
                                            onPress={() =>
                                                handleGroceryDelete(element.ID)
                                            }
                                        />
                                    </View>
                                );
                            })}
                        </View>
                    </View>
                ) : (
                    //to be styled later
                    <View>
                        <Auth />
                        <Text style={styles.text}>
                            Log in to use the grocery list feature!
                        </Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

export default Grocery;
