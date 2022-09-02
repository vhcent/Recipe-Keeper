import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    searchBar: {
        // marginTop: 50,
        // marginBottom: 20,
        flexDirection: "row",
        justifySelf: "center",
        alignItems: "center",
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

    changeSearchContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },

    changeSearchText: {
        color: "turquoise",
        left: 0,
    },
});

export default styles;
