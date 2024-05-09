import React from "react";
import { useState } from "react";
import { View, Text, TextInput, TouchableHighlight } from "react-native";
import { StyleSheet, Dimensions, } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { theme } from "../Colors";

const Input = ({
    navigation,
}) => {

    const [name, setName] = useState("");
    const [goal, setGoal] = useState("");

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <TextInput
                style={[styles.input, { backgroundColor: theme.inactive }]}
                value={name}
                placeholder="Name"
                placeholderTextColor={"#ada6a6"}
                onChangeText={(value) => {
                    setName(value)
                }}
            />
            <TextInput
                value={goal}
                placeholder="Goal"
                placeholderTextColor={"#ada6a6"}
                onChangeText={(value) => {
                    setGoal(value)
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        padding: 9,
        paddingLeft: 26,
        paddingRight: 26,
        color: "#fff",
        marginBottom: 26,
    },
})

export default Input;
