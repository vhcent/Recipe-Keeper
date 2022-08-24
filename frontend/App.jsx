import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    KeyboardAvoidingView,
    useWindowDimensions,
    Dimensions,
} from "react-native";
import Search from "./src/screens/search/Search.jsx";
import GroceryList from "./src/screens/groceryList/GroceryList.jsx";
import Saved from "./src/screens/saved/Saved.jsx";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";

import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const Tab = createBottomTabNavigator();

const App = () => {
    // const windowHeight = useWindowDimensions().height;

    return (
        <View style={{ backgroundColor: "#3A3A3A" }}>
            <View
                style={{
                    width,
                    height,
                    marginTop: "7.2%",
                }}
            >
                <NavigationContainer>
                    <Tab.Navigator
                        screenOptions={{
                            headerStyle: { height: 0 },
                            tabBarStyle: {
                                height: "14%",
                                backgroundColor: "#434343",
                                paddingBottom: "10%",
                                // flexDirection: "column",
                                // justifyContent: "center",
                                // alignItems: "center",
                            },
                            tabBarActiveBackgroundColor:
                                styles.navbar.backgroundColor,
                            tabBarInactiveBackgroundColor:
                                styles.navbar.backgroundColor,
                            tabBarActiveTintColor: styles.navbar.color,
                            tabBarInactiveTintColor: styles.navbar.color2,
                            tabBarLabelStyle: styles.navbar.labelStyle,
                        }}
                    >
                        <Tab.Screen
                            options={{
                                title: "Search",
                                tabBarIcon: ({ color, size }) => (
                                    <FontAwesome
                                        id="search-icon"
                                        name="search"
                                        size={size}
                                        color={color}
                                    />
                                ),
                            }}
                            name="Search"
                            component={Search}
                        />
                        <Tab.Screen
                            options={{
                                title: "Grocery",
                                tabBarIcon: ({ color, size }) => (
                                    <AntDesign
                                        id="cart-icon"
                                        name="shoppingcart"
                                        size={size}
                                        color={color}
                                    />
                                ),
                            }}
                            name="Grocery"
                            component={GroceryList}
                        />

                        <Tab.Screen
                            options={{
                                title: "Saved",
                                tabBarIcon: ({ color, size }) => (
                                    <AntDesign
                                        id="heart-icon"
                                        name="heart"
                                        size={size}
                                        color={color}
                                    />
                                ),
                            }}
                            name="Saved"
                            component={Saved}
                        />
                    </Tab.Navigator>
                </NavigationContainer>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    navbar: {
        backgroundColor: "#434343",
        color: "#FFF",
        color2: "rgba(255, 255, 255, 0.5)",
        labelStyle: {
            fontSize: 16,
            fontWeight: "bold",
        },
    },
});

export default App;
