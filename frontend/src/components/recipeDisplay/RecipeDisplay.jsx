import React, { useState, useEffect } from "react";
import styles from "./Styles";
import {
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    KeyboardAvoidingView,
    useWindowDimensions,
    Dimensions,
    Image,
    ScrollView,
} from "react-native";

export default function RecipeDisplay({ data }) {
    const [recipeData, setRecipeData] = useState(data);

    useEffect(() => {
        console.log("Super test:", data);
        setRecipeData(data);
    });

    return (
        <View style={styles.recipeDisplay}>
            {/* <Text>HELLO</Text> */}
            {data.map((element, key) => {
                return (
                    <View style={styles.recipeBlock} key={key}>
                        <Text>{element.title}</Text>
                        <Image
                            style={styles.image}
                            source={{
                                uri: element.image,
                            }}
                        />
                    </View>
                );
            })}
            {/* <Text>{recipeData.data}</Text> */}
            {/* <Text>Hello</Text> */}
        </View>
    );
}
