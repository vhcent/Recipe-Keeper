import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-start",
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        backgroundColor: "#3A3A3A",
        paddingTop: "4%",
    },

    scrollViewContainer: {
        marginTop: 10,
    },

    scrollView: {
        justifyContent: "flex-start",
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "column",
        // paddingTop: 5,
        // backgroundColor: "#3A3A3A",
        // paddingTop: "4%",
    },

    recipeSearch: {
        paddingTop: "4%",
        // justifyContent: "flex-start",
    },

    recipeDisplay: {
        // paddingTop: "5%",
    },
});

export default styles;
