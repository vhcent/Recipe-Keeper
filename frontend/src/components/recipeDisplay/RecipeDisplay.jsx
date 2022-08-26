import React, { useState, useEffect } from "react";
import styles from "./Styles";
import { Touchable, TouchableHighlight, Modal } from "react-native";
import { getDetails, getDuplicates } from "./RecipeDisplay.js";
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
import { BlurView } from "@react-native-community/blur";

import { AntDesign } from "@expo/vector-icons";
import { showModal } from "./RecipeDisplay.js";

export default function RecipeDisplay({ data }) {
    const [recipeData, setRecipeData] = useState(data);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalData, setModalData] = useState({});
    const [cache, setCache] = useState({});
    // const [savedList, setSavedList] = useState("");

    useEffect(() => {
        setRecipeData(data);
        let recipeIDString = "";
        for (let i = 0; i < data.length; i++) {
            // console.log(data[i].id);
            if (i == 0) recipeIDString += data[i].id.toString();
            else recipeIDString += "," + data[i].id.toString();
        }
        // console.log("SDL:KFJ", recipeIDString);
        // getDuplicates(1, recipeIDString);
    }, [data]);

    // for accessing recipe data locally when already accessed before
    useEffect(() => {
        setCache({});
    }, [recipeData]);

    async function showModal(id) {
        console.log("modal visible");
        if (cache.hasOwnProperty(id)) {
            setModalData(cache[id]);
        } else {
            let curr = cache;
            let details = await getRecipeDetails(id);
            setModalData(details);
            curr[id] = details;
            setCache(curr);
        }
        setModalVisible(true);
    }

    return (
        <View>
            <View style={styles.recipeDisplay}>
                {/* <Text>HELLO</Text> */}
                {data.map((element, key) => {
                    return (
                        <View style={styles.recipeBlock} key={key}>
                            <Text style={styles.recipeTitle}>
                                {element.title.length <= 19
                                    ? element.title
                                    : element.title.slice(0, 19) + "..."}
                            </Text>
                            <TouchableHighlight
                                onPress={() => {
                                    showModal(element.id);
                                }}
                            >
                                <View>
                                    <Image
                                        style={styles.image}
                                        source={{
                                            uri: element.image,
                                        }}
                                    />
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight>
                                <AntDesign
                                    id="heart-icon"
                                    name="heart"
                                    style={styles.heart}
                                    size={35}
                                    color={"red"}
                                />
                            </TouchableHighlight>
                        </View>
                    );
                })}
            </View>
            <View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    // presentationStyle="formSheet"
                    style={styles.modalContainer}
                >
                    {/* <BlurView style={styles.modalBlurView}> */}
                    <ScrollView style={styles.modalScrollView}>
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
                    {/* </BlurView> */}
                </Modal>

                {/* <Text>{recipeData.data}</Text> */}
                {/* <Text>Hello</Text> */}
            </View>
        </View>
    );
}
