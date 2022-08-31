import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    recipeDisplay: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        // marginTop: 5,
    },

    recipeBlock: {
        width: "45%",
        margin: 5,
        marginTop: 0,
        marginBottom: 10,
    },

    recipeTitle: {
        fontSize: 16,
        fontWeight: "bold",
        // textAlign: "center",
        color: "white",
    },

    image: {
        width: 170,
        height: 150,
        borderRadius: 10,
    },

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

    modalBlurView: {
        blurRadius: 10,
    },

    modalScrollView: {
        width: "90%",
        backgroundColor: "white",
        borderRadius: 10,
        borderColor: "red",
        // alignItems: "center",
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

    heart: {
        position: "absolute",
        right: 0,
        bottom: 0,
        padding: 10,
        paddingBottom: 5,
    },
});

export default styles;
