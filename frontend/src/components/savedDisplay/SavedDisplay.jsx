import React, { useState, useEffect, useContext } from "react";
import styles from "./Styles";
import {
    getAllRecipes,
    deleteRecipe,
    modifyNotes,
    getDetails,
} from "./SavedDisplay.js";
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
import { AppContext } from "../../components/AppContextProvider.jsx";
import Popup from "../../components/popup/Popup.jsx";

export default function SavedDisplay({ data, saveChange, setSaveChange }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalData, setModalData] = useState({});
    const [cache, setCache] = useState({});
    const [notesList, setNotesList] = useState([]);
    // const [saveChange, setSaveChange] = useState(false);

    //console.log(data);

    for (let i = 0; i < data.length; i++) {
        notesList.push(data[i].Notes);
    }
    console.log("Here is your notes");
    console.log(notesList);

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

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Saved Recipes</Text>
            {data.map((element, key) => {
                console.log(element);
                return (
                    <View key={key} style={styles.recipeBlock}>
                        <TouchableOpacity
                            onPress={() => {
                                showModal(element.RecipeID);
                            }}
                        >
                            <Text style={styles.recipeTitle}>
                                {element.Name}
                            </Text>
                        </TouchableOpacity>
                        <View style={styles.recipeRow}>
                            <TouchableOpacity
                                onPress={() => {
                                    showModal(element.RecipeID);
                                }}
                            >
                                <Image
                                    style={styles.image}
                                    source={{
                                        uri: element.Photo,
                                    }}
                                />
                            </TouchableOpacity>
                            <View style={{ padding: 15, maxWidth: 150 }}>
                                <TextInput
                                    style={styles.textInput}
                                    multiline={true}
                                    defaultValue={
                                        notesList[key]
                                            ? element.Notes
                                            : "Empty Notes"//need a switch to trigger re-render, placeholder instead of defaultvalue
                                    }
                                    onChangeText={(text) => {
                                        notesList[key] = text;
                                        //or set the state over entirely
                                    }}
                                    onEndEditing={() => {
                                        //console.log("Done editing, here is what I have ", notesList[key])
                                        modifyNotes(element.ID, notesList[key]);
                                    }}
                                ></TextInput>
                            </View>
                        </View>
                    </View>
                );
            })}
            {modalVisible ? (
                <Popup
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    modalData={modalData}
                    saveChange={saveChange}
                    setSaveChange={setSaveChange}
                />
            ) : null}
        </View>
    );
}
/*
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
*/
/*
<Text style={styles.recipeTitle}>
                                {element.title.length <= 19
                                    ? element.title
                                    : element.title.slice(0, 19) + "..."}
                            </Text>*/ //multiline={true}
