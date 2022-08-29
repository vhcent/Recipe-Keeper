import React, { useState, useEffect } from "react";
import styles from "./Styles";
import {
    Text,
    View,
    Image,
    Touchable,
    TouchableHighlight,
    Modal,
    ScrollView,
    Header,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function Popup({ modalVisible, setModalVisible, modalData }) {
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
                    <Image
                        style={styles.image}
                        source={{
                            uri: modalData.image,
                        }}
                    />
                    <TouchableHighlight>
                        <AntDesign
                            id="heart-icon"
                            name="heart"
                            style={styles.heart}
                            size={50}
                            color={"red"}
                        />
                    </TouchableHighlight>
                </View>
                <View style={styles.basicInfo}>
                    <Text style={styles.infoText}>
                        Serves: {modalData.servings}
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
                                        onPress={() => setModalVisible(false)}
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
