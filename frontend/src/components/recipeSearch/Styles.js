import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    searchBar: {
        margin: 10,
        marginTop: 20,
        marginBottom: 20,
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",
        borderColor: "black",
        borderWidth: 1,
        paddingTop: 5,
        paddingBottom: 5,
        // paddingLeft: 100,
        // paddingRight: 100,
        borderRadius: 10,
        width: "90%",
    },
    icon: {
        color: "black",
        paddingLeft: 10,
    },
    text: {
        fontSize: 20,
        paddingLeft: 10,
        width : "90%",
    }
})

export default styles;