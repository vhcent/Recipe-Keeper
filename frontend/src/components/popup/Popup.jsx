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
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function Popup({ modalVisible, setModalVisible, modalData }) {
    modalData.extendedIngredients.map((element, key) => {
        console.log(element.name);
    });
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            style={styles.modalContainer}
        >
            <ScrollView style={styles.modalScrollView}>
                <AntDesign
                    id="close"
                    name="close"
                    size={20}
                    style={styles.icon}
                    onPress={() => setModalVisible(false)}
                />
                <Text>{modalData.title}</Text>
                <Image
                    style={styles.image}
                    source={{
                        uri: modalData.image,
                    }}
                />
                <Text>
                    {modalData.extendedIngredients.map((element, key) => {
                        return (
                            <View>
                                <Text>{element.name}</Text>
                            </View>
                        );
                    })}
                </Text>
            </ScrollView>
        </Modal>
    );
}
