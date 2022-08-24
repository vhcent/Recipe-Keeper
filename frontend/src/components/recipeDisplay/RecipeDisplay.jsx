import React, { useState, useEffect } from "react";
import styles from "./Styles";
import { Touchable, TouchableHighlight, Modal } from "react-native";
import { getRecipeDetails, getDuplicateList } from "./RecipeDisplay.js";
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
import { AntDesign } from "@expo/vector-icons";
import { showModal } from "./RecipeDisplay.js";

export default function RecipeDisplay({ data, navigation }) {
    const [recipeData, setRecipeData] = useState(data);
    // const [savedList, setSavedList] = useState("");

    useEffect(() => {
        setRecipeData(data);
        let recipeIDString = "";
        for (let i = 0; i < data.length; i++) {
            console.log(data[i].id);
            if (i == 0) recipeIDString += data[i].id.toString();
            else recipeIDString += "," + data[i].id.toString();
        }
        console.log("SDL:KFJ", recipeIDString);
        // getDuplicateList(1, recipeIDString);
    }, [data]);

    const [modalVisible, setModalVisible] = useState(false);
    const [modalData, setModalData] = useState({
        title: "el title",
        image: "",
        ingredients: "el ingredients",
        instructions: "el instructions",
    });

    async function showModal(id) {
        console.log("modal visible");
        setModalVisible(true);
        if (cache.hasOwnProperty(id)) {
            modalData[title] = cache[id][title];
            modalData[image] = cache[id][image];
            modalData[ingredients] = cache[id][ingredients];
            modalData[directions] = cache[id][directions];
            modalData[isSaved] = cache[id][isSaved];
        } else {
            // let data = await getRecipeDetails(id);
            // cache[id] = data;
            // setModalData(data);
        }
    }

    // for accessing recipe data locally when already accessed before
    const [cache, setCache] = useState({});
    useEffect(() => {
        setCache({});
    }, [recipeData]);

    return (
        <View>
            <View style={styles.recipeDisplay}>
                {/* <Text>HELLO</Text> */}
                {data.map((element, key) => {
                    return (
                        <View style={styles.recipeBlock} key={key}>
                            <Text style={styles.recipeTitle}>
                                {element.title.length <= 17
                                    ? element.title
                                    : element.title.slice(0, 14) + "..."}
                            </Text>
                            <TouchableHighlight
                                onPress={() => {
                                    showModal(element.id);
                                }}
                            >
                                <Image
                                    style={styles.image}
                                    source={{
                                        uri: element.image,
                                    }}
                                />
                            </TouchableHighlight>
                            <AntDesign
                                id="heart-icon"
                                name="heart"
                                // size={size}
                                // color={color}
                            />
                        </View>
                    );
                })}
            </View>
            <View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                >
                    <ScrollView style={styles.modalContainer}>
                        {/* <Button title="Return" onPress={() => setModalVisible(false)}> */}
                        <AntDesign
                            id="close"
                            name="close"
                            size={20}
                            style={styles.icon}
                            onPress={() => setModalVisible(false)}
                        />
                        {/* <Image
                            style={styles.image}
                            source={{
                                uri: modalData.image,
                            }}
                        /> */}
                        {/* <Text style={styles.modalText}>{modalData.title}</Text> */}
                    </ScrollView>
                </Modal>

                {/* <Text>{recipeData.data}</Text> */}
                {/* <Text>Hello</Text> */}
            </View>
        </View>
    );
}
