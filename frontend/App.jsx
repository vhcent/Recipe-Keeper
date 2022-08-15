import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, KeyboardAvoidingView, useWindowDimensions, Dimensions } from "react-native";
import Search from './src/screens/search/Search.jsx';
import GroceryList from "./src/screens/groceryList/GroceryList.jsx";
import Saved from "./src/screens/saved/Saved.jsx";
import { NavigationContainer } from '@react-navigation/native';
//import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// const Stack = createNativeStackNavigator();

const { width, height } = Dimensions.get("window")

const Tab = createBottomTabNavigator();

const App = () => {
    // const windowHeight = useWindowDimensions().height;

    return (
        <View style={{
            width,
            height,
        }}>

            <NavigationContainer>
                <Tab.Navigator screenOptions={{ headerStyle: { height: 0 } }}>
                    <Tab.Screen
                        name="Search"
                        component={Search}
                        options={{ title: 'Search for Recipe' }}
                    />
                    <Tab.Screen name="GroceryList" component={GroceryList} />
                    <Tab.Screen name="Saved" component={Saved} />
                </Tab.Navigator>
            </NavigationContainer>
        </View>
    );
};

// const styles = StyleSheet.create({
//     container: {
//         position: "absolute",
//     },
// });

export default App;