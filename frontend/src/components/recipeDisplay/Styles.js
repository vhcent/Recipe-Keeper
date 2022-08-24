import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    recipeDisplay: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
    },

    recipeBlock: {
        width: "40%",
        margin: 10,
    },

    recipeTitle: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        color: "white",
    },

    image: {
        width: 160,
        height: 160,
        borderRadius: 10,
    },

    modalContainer: {
        width: "90%",
        height: "70%",
        backgroundColor: "white",
        borderRadius: 10,
        // alignItems: "center",
        alignSelf: "center",
        marginTop: "30%",
    },
    
    modalText : {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        margin: 10,
    },

    icon : {
        fontSize: 30,
        marginLeft: "auto",
    }
});

export default styles;
