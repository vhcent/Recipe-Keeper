import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import SignInScreen from "./src/screens/SignInScreen";

export default function App() {
    return (
        <View style={styles.container}>
            <SignInScreen />
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
