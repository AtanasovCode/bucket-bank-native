import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { View, Text, TextInput, TouchableHighlight } from "react-native";
import { useTheme } from "@react-navigation/native";
import { StyleSheet, Dimensions, } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { lightTheme, darkTheme } from "../Colors";
import Header from "../components/Header";
import * as Crypto from 'expo-crypto';

const Input = ({
    navigation,
    route,
}) => {

    const { colors } = useTheme();
    const theme = colors;

    const [buckets, setBuckets] = useState([]);
    const [name, setName] = useState("");
    const [goal, setGoal] = useState("");
    const [inputs, setInputs] = useState(false);

    const firstInputRef = useRef(null);
    const secondInputRef = useRef(null);

    useEffect(() => {
        firstInputRef.current.focus();
    }, [])

    const checkInputs = () => {
        name && goal ? setInputs(true) : setInputs(false);
    }

    useEffect(() => {
        checkInputs();
    }, [name, goal])

    const saveBucket = (name, goal) => {
        const savedBucket = {
            id: Crypto.randomUUID(),
            name: name,
            goal: goal,
            saved: 0,
            payments: [],
        }

        setBuckets([savedBucket, ...buckets])
    }

    const saveData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem("buckets", jsonValue)
        } catch (e) {
            console.log(e)
        }
    }

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem("buckets");
            if (value !== null) {
                console.log(JSON.parse(value));
                const parsedValue = JSON.parse(value);
                console.log(parsedValue);
                setBuckets(parsedValue);
            }
        } catch (e) {
            console.log("Error getting data");
        }
    }

    useEffect(() => {
        getData();
    }, [])

    useEffect(() => {
        if (inputs) {
            saveData(buckets);
            navigation.navigate("Dashboard");
        }
    }, [buckets])

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
                        <Text style={[styles.label, {color: theme.light}]}>
                            Bucket Name
                        </Text>
                        <TextInput
                            style={[styles.input, { backgroundColor: theme.inactive, color: theme.text }]}
                            value={name}
                            placeholder="Enter name"
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
                        <Text style={[styles.label, {color: theme.light}]}>
                            Goal
                        </Text>
                        <TextInput
                            style={[styles.input, {
                                backgroundColor: theme.inactive, fontFamily: "monospace", color: theme.text
                            }]}
                            value={goal}
                            placeholder="Enter goal"
                            keyboardType="numeric"
                            placeholderTextColor={theme.light}
                            ref={secondInputRef}
                            onChangeText={(value) => {
                                setGoal(value)
                            }}
                        />
                    </View>
                </View>
                <View style={[styles.saveContainer, styles.wrapper]}>
                    <TouchableHighlight
                        style={[styles.save, { backgroundColor: inputs ? theme.accent : theme.inactive}]}
                        onPress={() => {
                            if (inputs) {
                                saveBucket(name, goal);
                            }
                        }}
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
        marginBottom: "8%",
        marginLeft: "6%",
        marginRight: "6%",
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
        fontSize: 14,
        textAlign: "left",
        marginBottom: "4%",
    },
    saveContainer: {
        paddingBottom: "6%",
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