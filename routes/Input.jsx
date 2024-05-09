import React from "react";
import { useState, useRef } from "react";
import { View, Text, TextInput, TouchableHighlight } from "react-native";
import { StyleSheet, Dimensions, } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../Colors";
import Header from "../components/Header";

const Input = ({
    navigation,
}) => {

    const [name, setName] = useState("");
    const [goal, setGoal] = useState("");

    const secondInputRef = useRef(null);

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <Header />
            <View style={[styles.wrapper]}>
                <Text style={[styles.text]}>
                    Bucket Name
                </Text>
                <TextInput
                    style={[styles.input, { backgroundColor: theme.inactive }]}
                    value={name}
                    placeholder="New Bike"
                    placeholderTextColor={"#ada6a6"}
                    returnKeyType="next"
                    onSubmitEditing={() => {
                        secondInputRef.current.focus();
                    }}
                    onChangeText={(value) => {
                        setName(value)
                    }}
                />
            </View>
            <View style={[styles.wrapper]}>
                <Text style={[styles.text]}>
                    Goal
                </Text>
                <TextInput
                    style={[styles.input, styles.money, { backgroundColor: theme.inactive }]}
                    value={goal}
                    placeholder="800,00 $"
                    keyboardType="numeric"
                    placeholderTextColor={"#ada6a6"}
                    ref={secondInputRef}
                    onChangeText={(value) => {
                        setGoal(value)
                    }}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapper: {
        marginBottom: 26,
        marginLeft: 26,
        marginRight: 26,
    },
    input: {
        padding: 12,
        paddingLeft: 26,
        paddingRight: 26,
        color: "#fff",
        borderRadius: 16,
        fontSize: 16,
    },
    text: {
        color: "#fff",
        fontSize: 18,
        textAlign: "left",
        marginBottom: 12,
    },
    money: {
        fontFamily: "monospace",
    },
})

export default Input;
