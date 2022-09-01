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

    searchBar: {
        // marginTop: 50,
        // marginBottom: 20,
        flexDirection: "row",
        justifySelf: "center",
        alignItems: "center",
        // alignSelf: "top",
        borderColor: "white",
        borderWidth: 1,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 10,
        width: "90%",
    },
    icon: {
        color: "white",
        paddingRight: 10,
    },
    text: {
        fontSize: 20,
        paddingLeft: 10,
        width: "90%",
        color: "white",
    },

    groceryRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
    },
});

export default styles;
