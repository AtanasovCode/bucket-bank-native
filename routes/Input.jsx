import React, { useEffect } from "react";
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
    const [inputs, setInputs] = useState(false);

    const firstInputRef = useRef(null);
    const secondInputRef = useRef(null);

    useEffect(() => {
        firstInputRef.current.focus();
    }, [])

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <Header
                navigation={navigation}
                back={true}
            />
            <Text style={[styles.title, { color: theme.light }]}>
                Add new bucket
            </Text>
            <View style={{ flex: 1, justifyContent: "space-between" }}>
                <View>
                    <View style={[styles.wrapper]}>
                        <Text style={[styles.label]}>
                            Bucket Name
                        </Text>
                        <TextInput
                            style={[styles.input, { backgroundColor: theme.inactive, color: theme.text }]}
                            value={name}
                            placeholder="New Bike"
                            placeholderTextColor={theme.light}
                            ref={firstInputRef}
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
                                backgroundColor: theme.inactive, fontFamily: "monospace", color: theme.text
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
                </View>
                <View style={[styles.saveContainer, styles.wrapper]}>
                    <TouchableHighlight
                        style={[styles.save, { backgroundColor: inputs ? theme.accent : theme.inactive }]}
                    >
                        <Text style={{ color: inputs ? theme.white : theme.light }}>
                            Save
                        </Text>
                    </TouchableHighlight>
                </View>
            </View>
        </SafeAreaView >
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
        fontSize: 20,
        textAlign: "center",
        marginBottom: "15%",
    },
    input: {
        padding: 10,
        paddingLeft: 26,
        paddingRight: 26,
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
    saveContainer: {
        paddingBottom: 22,
        alignItems: "center",
        justifyContent: "center",
    },
    save: {
        alignItems: "center",
        justifyContent: 'center',
        padding: 18,
        paddingLeft: 26,
        paddingRight: 26,
        width: "100%",
        borderRadius: 16,
    },
})

export default Input;
