import React, { useState, useEffect } from "react";
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
import { AntDesign } from "@expo/vector-icons";
import { getDuplicates, saveRecipe, unsaveRecipe, addGrocery } from "./Popup";

export default function Popup({
    modalVisible,
    setModalVisible,
    modalData,
    saveChange,
    setSaveChange,
}) {
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        getDuplicates(modalData.id.toString()).then((duplicates) => {
            console.log(duplicates);
            if (duplicates.length == 1) {
                setIsSaved(true);
            }
        });
    }, [modalData]);

    async function handleSave(recipeID, photo, url, title) {
        if (isSaved) {
            // Remove from saved table
            console.log("unsaved");
            await unsaveRecipe(recipeID);
            setIsSaved(false);
        } else {
            // Save to saved table
            console.log("save");
            await saveRecipe(recipeID, photo, url, title);
            setIsSaved(true);
        }
        setSaveChange(!saveChange);
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
