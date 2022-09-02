import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    log: {
        padding: 10,
        // alignSelf: "flex-end",
    },

    container: {
        backgroundColor: "#3A3A3A",
        height: "100%",
    },

    scrollContainer: {
        justifyContent: "flex-start",
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "column",
        width: "100%",
        paddingTop: "4%",
    },

    searchBar: {
        marginTop: 10,
        // marginBottom: 20,
        flexDirection: "row",
        justifySelf: "center",
        alignItems: "center",
        alignSelf: "center",
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

    itemText: {
        fontSize: 18,
        paddingLeft: 10,
        width: "90%",
        color: "white",
    },

    groceryText: {
        fontSize: 21,
        color: "turquoise",
        alignSelf: "center",
    },

    groceryList: {
        marginTop: 15,
    },

    groceryRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 7,
        borderBottomWidth: 0.8,
        borderColor: "white",
    },
});

export default styles;
