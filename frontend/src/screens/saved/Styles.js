import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    log: {
        padding: 10,
        width: "100%",
        // alignSelf: "flex-end",
    },

    container: {
        backgroundColor: "#3A3A3A",
        height: "100%",
        width: "100%",
    },
    text: {
        fontSize: 20,
        paddingLeft: 10,
        width: "90%",
        color: "white",
        textAlign: "center",
    },
    scrollContainer: {
        justifyContent: "flex-start",
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "column",
        width: "100%",
        paddingTop: "4%",
    },
});

export default styles;
