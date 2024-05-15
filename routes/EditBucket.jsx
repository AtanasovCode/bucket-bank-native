import React, { useState, useEffect, useRef } from "react";
import {
    View,
    Text,
    TouchableHighlight,
    TextInput,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Dimensions } from "react-native";
import Header from "../components/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";


const EditBucket = ({ navigation }) => {

    const { colors } = useTheme();
    const theme = colors;

    const [selectedID, setSelectedID] = useState();
    const [bucket, setBucket] = useState({});
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

    const getID = async () => {
        try {
            const value = await AsyncStorage.getItem("selectedId")
            if (value !== null) {
                const parsedValue = JSON.parse(value);
                setSelectedID(parsedValue);
            }
        } catch (e) {
            console.log(e);
        }
    }

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem("buckets");
            if (value !== null) {
                const parsedValue = JSON.parse(value);
                const selectedBucket = parsedValue.find((item) => item.id === selectedID);

                setBucket(selectedBucket);
            }
        } catch (e) {
            console.log("Error getting data");
        }
    }

    useEffect(() => {
        getID();
    }, [])

    useEffect(() => {
        selectedID && getData();
    }, [selectedID])

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <Header
                navigation={navigation}
                back={true}
            />
            <Text style={[styles.title, { color: theme.light }]}>Edit Bucket</Text>
            <View>
                <View style={[styles.wrapper]}>
                    <Text style={[styles.label, { color: theme.light }]}>
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
                    <Text style={[styles.label, { color: theme.light }]}>
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
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        marginBottom: "10%",
        textAlign: "center",
    },
    wrapper: {
        marginBottom: "8%",
        marginLeft: "6%",
        marginRight: "6%",
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
        marginBottom: 12,
    },

})

export default EditBucket;