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
            <Header 
                navigation={navigation}
                back={true} 
            />
            <Text style={[styles.title]}>
                Add new bucket
            </Text>
            <View style={[styles.wrapper]}>
                <Text style={[styles.label]}>
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
                <Text style={[styles.label]}>
                    Goal
                </Text>
                <TextInput
                    style={[styles.input, {
                        backgroundColor: theme.inactive, fontFamily: "monospace",
                    }]}
                    value={goal}
                    placeholder="800.00"
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
    title: {
        color: "#fff",
        fontSize: 20,
        textAlign: "center",
        marginBottom: "15%",
    },
    input: {
        padding: 10,
        paddingLeft: 26,
        paddingRight: 26,
        color: "#fff",
        borderRadius: 16,
        fontSize: 14,
        fontFamily: "sans-serif",
    },
    label: {
        color: "#fff",
        fontSize: 14,
        textAlign: "left",
        marginBottom: 12,
    },
})

export default Input;
