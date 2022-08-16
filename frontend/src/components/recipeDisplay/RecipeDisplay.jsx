import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, Button, TextInput, KeyboardAvoidingView, useWindowDimensions, Dimensions } from "react-native";


export default function RecipeDisplay({data}) {
    const [recipeData, setRecipeData] = useState(data);

    useEffect(() => {
        console.log("Super test:", data);
    });
    
    return(
        <View>
            {/* <Text>{recipeData.data}</Text> */}
            <Text>Hello</Text>
        </View>
    )
}