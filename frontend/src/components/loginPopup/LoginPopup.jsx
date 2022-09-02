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
import Auth from "../../components/auth/Auth.jsx";
import * as WebBrowser from "expo-web-browser";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
//import { getDuplicates, saveRecipe, unsaveRecipe, addGrocery } from "./Popup";
import { AppContext } from "../../components/AppContextProvider.jsx";

export default function Popup({ loginModalVisible, setLoginModalVisible }) {
    const [loggedIn, setLoggedIn] = useContext(AppContext);
    // const [visible, setVisible] = useState(loginModalVisible);

    useEffect(() => {
        if (loggedIn) {
            setLoginModalVisible(false);
            // setVisible(false);
        }
    }, [loggedIn]);

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={loginModalVisible}
            style={styles.modalContainer}
        >
            <View style={styles.container}>
                <AntDesign
                    id="close"
                    name="close"
                    size={25}
                    style={styles.close}
                    onPress={() => setLoginModalVisible(false)}
                />
                <View>
                    <Text style={styles.title}>
                        Please Log in to use the grocery list and save recipes
                    </Text>
                </View>
                <Auth />
            </View>
        </Modal>
    );
}
