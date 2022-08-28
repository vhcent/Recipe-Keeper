import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    modalContainer: {
        width: "90%",
        height: "100%",
        backgroundColor: "rgba(33, 30, 32, 0.5)",
        borderRadius: 10,
        // alignItems: "center",
        alignSelf: "center",
        // justifySelf: "center",
        // marginTop: "30%",
    },

    image: {
        width: 170,
        height: 150,
        borderRadius: 10,
    },

    modalScrollView: {
        width: "90%",
        backgroundColor: "white",
        borderRadius: 10,
        borderColor: "red",
        alignSelf: "center",
        justifySelf: "center",
        minHeight: "80%",
        maxHeight: "80%",
        marginTop: "18%",
    },

    modalText: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        margin: 10,
    },

    icon: {
        fontSize: 30,
        marginLeft: "auto",
        padding: 10,
    },
});

export default styles;
