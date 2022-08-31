import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    modalContainer: {
        width: "90%",
        height: "100%",
        borderRadius: 10,
        alignSelf: "center",
    },

    scrollView: {
        width: "90%",
        backgroundColor: "#9B9CA5",
        borderWidth: 1,
        borderRadius: 10,
        alignSelf: "center",
        justifySelf: "center",
        minHeight: "80%",
        maxHeight: "80%",
        marginTop: "18%",
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    title: {
        width: "85%",
        fontSize: 20,
        padding: 10,
        fontWeight: "bold",
    },

    close: {
        width: "15%",
        marginLeft: "auto",
        padding: 10,
    },

    image: {
        width: "100%",
        height: 250,
        borderRadius: 10,
    },

    noImageText: {
        fontSize: 20,
        padding: 10,
        fontWeight: "bold",
    },

    noImage: {
        width: "100%",
        height: 250,
        fontSize: 100,
        justifyContent: "center",
        alignItems: "center",
    },

    heart: {
        position: "absolute",
        right: 0,
        bottom: 0,
        padding: 10,
        paddingBottom: "2%",
    },

    basicInfo: {
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-around",
        fontSize: 20,
    },

    infoText: {
        fontSize: 16,
        // padding: 10,
        fontWeight: "500",
    },

    ingredientsTitle: {
        fontSize: 18,
        marginLeft: 10,
        marginBottom: 5,
        fontWeight: "500",
    },

    ingredients: {
        listStyleType: "none",
        flexDirection: "column",
        marginLeft: 10,
    },

    ingredientRow: {
        flexDirection: "row",
        marginBottom: 10,
        alignItems: "center",
    },

    ingredientsText: {
        fontSize: 18,
        marginLeft: 10,
        width: "85%",
    },

    plus: {
        width: "15%",
    },
});

export default styles;
