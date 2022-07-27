import React from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";

export default function Input({
    value,
    setValue,
    placeholder,
    secureTextEntry,
}) {
    return (
        <View style={styles.container}>
            <TextInput
                value={value}
                onChangeText={setValue}
                placeholder={placeholder}
                styles={styles.input}
                secureTextEntry={secureTextEntry}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        width: "100%",
        borderColor: "#e8e8e8",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginVertical: 10,
    },
    input: {},
});
