import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        width: "90%",
    },
    header: {
        fontSize: 25,
        // paddingLeft: 10,
        alignSelf: "center",
        color: "white",
    },

    image: {
        width: 200,
        height: 170,
        borderRadius: 10,
    },

    recipeBlock: {
        marginTop: 15,
        padding: 15,
        borderTopWidth: 1,
        borderColor: "white",
        width: "100%",
    },

    recipeTitle: {
        fontSize: 18,
        alignSelf: "center",
        color: "white",
    },

    recipeRow: {
        marginTop: 5,
        flexDirection: "row",
    },
    textInput: {
        height: "100%",
        justifyContent: "flex-start",
        flex: 1,
        color: "white",
    },
});

export default styles;
