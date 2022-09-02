import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    modalContainer: {
        width: "90%",
        height: "100%",
        backgroundColor: "white",
    },

    container: {
        marginTop: "80%",
        width: "60%",
        height: "auto",
        backgroundColor: "white",
        alignSelf: "center",
        justifySelf: "center",
        borderRadius: 10,
    },

    header: {
        flexDirection: "row",
        justifyContent: "center",
    },

    title: {
        // width: "85%",
        fontSize: 15,
        textAlign: "center",
        alignSelf: "center",
        fontWeight: "bold",
    },

    close: {
        marginLeft: "auto",
        padding: 10,
    },

    loginButton: {
        padding: 10,
    },
});

export default styles;
