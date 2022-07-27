import { StyleSheet, Text, View, Button, TextInput } from "react-native";

export default function App() {
    return (
        <View style={styles.container}>
            <Text>HELLO</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
