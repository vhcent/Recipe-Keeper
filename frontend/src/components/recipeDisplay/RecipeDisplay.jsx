import React, { useState, useEffect, useContext } from "react";
import styles from "./Styles";
import {
    getDetails,
    getDuplicates,
    saveRecipe,
    unsaveRecipe,
} from "./RecipeDisplay.js";
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
    TouchableOpacity,
    Modal,
} from "react-native";
import { BlurView } from "@react-native-community/blur";
import { AntDesign } from "@expo/vector-icons";
import { showModal } from "./RecipeDisplay.js";
import {AppContext} from "../../components/AppContextProvider.jsx";
import Popup from "../popup/Popup.jsx";
import LoginPopup from "../loginPopup/LoginPopup.jsx";

export default function RecipeDisplay({ data }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalData, setModalData] = useState({});
    const [cache, setCache] = useState({});
    const [saveChange, setSaveChange] = useState(false);
    const [savedList, setSavedList] = useState({}); //store a list of boolean values, each value is for if a recipe is saved
    const [loggedIn, setLoggedIn] = useContext(AppContext);
    const [loginModalVisible, setLoginModalVisible] = useState(false);
    //hashmap -> [key] is recipeID, [value] is true or false if the recipe is saved

    useEffect(() => {
        console.log("logged in?", loggedIn)
        // Create comma seperated string of all recipe IDs
        let recipeIDString = "";
        for (let i = 0; i < data.length; i++) {
            savedList[data[i].id] = "gray";
            if (i == 0) recipeIDString += data[i].id.toString();
            else recipeIDString += "," + data[i].id.toString();
        }

        // Get duplicates and change corresponding color to red in savedList
        getDuplicates(recipeIDString).then((duplicates) => {
            console.log("duplicates: ", duplicates);
            let temp = JSON.parse(JSON.stringify(savedList));
            for (let i = 0; i < duplicates.length; i++) {
                temp[duplicates[i].RecipeID] = "red";
            }
            setSavedList(temp);
        });
    }, [data, saveChange, loggedIn, loginModalVisible]);

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

    async function handleSave(recipeID, saved, photo, url, title, key) {
        if(!loggedIn){
            console.log("the user is not logged in")
            setLoginModalVisible(true);
        }
        else{
            if (saved == "red") {
                // Remove from saved table
                console.log("unsaved");
                await unsaveRecipe(recipeID);
                let temp = JSON.parse(JSON.stringify(savedList));
                temp[recipeID] = "gray";
                setSavedList(temp);
            } else {
                // Save to saved table
                console.log("save");
                await saveRecipe(recipeID, photo, url, title);
                let temp = JSON.parse(JSON.stringify(savedList));
                temp[recipeID] = "red";
                setSavedList(temp);
            }
        }
    }

    return (
        <View>
            <View style={styles.recipeDisplay}>
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
                            <TouchableOpacity
                                style={styles.heart}
                                onPress={() => {
                                    handleSave(
                                        element.id,
                                        savedList[element.id],
                                        element.image,
                                        "undefined",
                                        element.title,
                                        key
                                    );
                                }}
                            >
                                <AntDesign
                                    id={`heart-icon-${key}`}
                                    name="heart"
                                    size={40}
                                    color={loggedIn ? savedList[element.id] : "gray"}
                                />
                            </TouchableOpacity>
                        </View>
                    );
                })}
            </View>
            {modalVisible ? (
                <Popup
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    modalData={modalData}
                    saveChange={saveChange}
                    setSaveChange={setSaveChange}
                />
            ) : null}
        <LoginPopup loginModalVisible={loginModalVisible} setLoginModalVisible={setLoginModalVisible}/>
        </View>
    );
}
