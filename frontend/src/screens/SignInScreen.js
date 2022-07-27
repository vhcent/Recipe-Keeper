import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import Input from "../components/Input";

export default function SignInScreen() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    return (
        <View style={styles.container}>
            <Text>El Logo</Text>
            <Input
                placeholder="Username"
                value={username}
                setValue={setUsername}
            />
            <Input
                placeholder="Password"
                value={password}
                setValue={setPassword}
                secureTextEntry={true}
            />
            <Button style={styles.button} title="Login" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
});
