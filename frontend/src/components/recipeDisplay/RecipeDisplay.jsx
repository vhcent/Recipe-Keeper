import React, { useState, useEffect } from "react";
import styles from "./Styles";
import { getDetails, getDuplicates, saveRecipe } from "./RecipeDisplay.js";
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
    Touchable,
    TouchableHighlight,
    Modal,
} from "react-native";
import { BlurView } from "@react-native-community/blur";
import { AntDesign } from "@expo/vector-icons";
import { showModal } from "./RecipeDisplay.js";
import Popup from "../popup/Popup.jsx";

export default function RecipeDisplay({ data }) {
    const [recipeData, setRecipeData] = useState(data);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalData, setModalData] = useState({});
    const [cache, setCache] = useState({});

    //const [isSaved, setIsSaved ] = useState(null);
    const [savedList, setSavedList] = useState({}); //store a list of boolean values, each value is for if a recipe is saved
    //hashmap -> [key] is recipeID, [value] is true or false if the recipe is saved


    useEffect(() => {
        setRecipeData(data);
        setCache({});
        let recipeIDString = "";
        
        setSavedList([]);
        console.log("savedListAll", savedList);
        for (let i = 0; i < data.length; i++) {
            savedList[data[i].id] = false;
            // console.log(data[i].id);
            // console.log("savedList ", i, " ", savedList[data[i].id]);
            if (i == 0) recipeIDString += data[i].id.toString();
            else recipeIDString += "," + data[i].id.toString();
        }
        console.log("recipeList: ", recipeIDString);
        
        getDuplicates(recipeIDString).then((duplicates) => {
            console.log("duplicates: ", duplicates);
            duplicates = [646071, 659782, 665496];
            for(let i = 0 ; i < duplicates.length ; i++){
                //for each duplicate, iterate through recipes till it is found 
                savedList[duplicates[i]] = true;
                setSavedList(savedList);
                console.log("duplicate ", duplicates[i], " ", savedList[duplicates[i]]);
            }
            
        });
        // console.log("SDL:KFJ", recipeIDString);
        // getDuplicates(1, recipeIDString);
    }, [data]);

    async function showModal(id) {
        if (cache.hasOwnProperty(id)) {
            setModalData(cache[id]);
        } else {
            let curr = cache;
            let details = await getDetails(id);
            setModalData(details);
            curr[id] = details;
            setCache(curr);
        }
        setModalVisible(true);
    }

    async function handleSave(recipeId, saved) {

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
                                color={savedList[element.id] ? "red" : "gray"}
                            />
                        </TouchableHighlight>
                    </View>
                );
            })}
        </View>
        {modalVisible ? (
            <Popup
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                modalData={modalData}
            />
        ) : null}
    </View>
    );
}
    