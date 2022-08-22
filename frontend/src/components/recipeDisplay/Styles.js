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

    image: {
        width: 150,
        height: 150,
        borderRadius: 10,
    },
});

export default styles;
