import React, { useState, useEffect, useContext } from "react";
import styles from "./Styles";
import {
    Text,
    View,
    Image,
    Touchable,
    TouchableHighlight,
    TouchableOpacity,
    Modal,
    ScrollView,
    Header,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { getDuplicates, saveRecipe, unsaveRecipe, addGrocery } from "./Popup";
import {AppContext} from "../../components/AppContextProvider.jsx";

export default function Popup({
    modalVisible,
    setModalVisible,
    modalData,
    saveChange,
    setSaveChange,
}) {
    const [isSaved, setIsSaved] = useState(false);
    const [loggedIn, setLoggedIn] = useContext(AppContext) 
    console.log("savechange:", saveChange);
    useEffect(() => {
        getDuplicates(modalData.id.toString()).then((duplicates) => {
            console.log(duplicates);
            if (duplicates.length == 1) {
                setIsSaved(true);
            }
        });
    }, [modalData]);

    async function handleSave(recipeID, photo, url, title) {
        if(!loggedIn){
            //prompt some login
        }
        else{
            if (isSaved) {
                // Remove from saved table
                console.log("unsaved");
                await unsaveRecipe(recipeID);
                setIsSaved(false);
                setSaveChange(!saveChange);
            } else {
                // Save to saved table
                console.log("save");
                await saveRecipe(recipeID, photo, url, title);
                setIsSaved(true);
                setSaveChange(!saveChange);
            }
            console.log("savechange:", saveChange);
        }
       
        // setSaveChange(!saveChange);
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            style={styles.modalContainer}
        >
            <ScrollView style={styles.scrollView}>
                <View style={styles.header}>
                    <Text style={styles.title}>{modalData.title}</Text>
                    <AntDesign
                        id="close"
                        name="close"
                        size={30}
                        style={styles.close}
                        onPress={() => setModalVisible(false)}
                    />
                </View>
                <View>
                    {modalData.image != undefined ? (
                        <Image
                            style={styles.image}
                            source={{
                                uri: modalData.image,
                            }}
                        />
                    ) : (
                        <View style={styles.noImage}>
                            <Text style={styles.noImageText}>No Image</Text>
                        </View>
                    )}
                    <TouchableOpacity
                        onPress={() => {
                            handleSave(
                                modalData.id,
                                modalData.image,
                                "undefined",
                                modalData.title
                            );
                        }}
                        style={styles.heart}
                    >
                        <AntDesign
                            id="heart-icon"
                            name="heart"
                            size={50}
                            color={isSaved ? "red" : "gray"}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.basicInfo}>
                    <Text style={styles.infoText}>
                        Servings: {modalData.servings}
                    </Text>
                    <Text style={styles.infoText}>
                        Preparation Time: {modalData.readyInMinutes} minutes
                    </Text>
                </View>
                <TouchableOpacity
                    style={styles.basicInfo}
                    onPress={() =>
                        WebBrowser.openBrowserAsync(modalData.sourceUrl)
                    }
                >
                    <Text style={styles.urlText}>
                        Source: {modalData.sourceUrl}
                    </Text>
                    <MaterialIcons
                        id="open-in-new"
                        name="open-in-new"
                        size={30}
                        color={"blue"}
                    />
                </TouchableOpacity>

                <View>
                    <Text style={styles.ingredientsTitle}>Ingredients:</Text>
                    <View style={styles.ingredients}>
                        {modalData.extendedIngredients.map((element, key) => {
                            return (
                                <View key={key} style={styles.ingredientRow}>
                                    <Text style={styles.ingredientsText}>
                                        {element.original}
                                    </Text>
                                    <AntDesign
                                        id="plus"
                                        name="plus"
                                        size={30}
                                        color={"green"}
                                        style={styles.icon}
                                        onPress={() =>
                                            addGrocery(element.original)
                                        }
                                    />
                                </View>
                            );
                        })}
                    </View>
                </View>
            </ScrollView>
        </Modal>
    );
}
