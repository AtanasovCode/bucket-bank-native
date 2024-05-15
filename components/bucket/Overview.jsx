import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    Image,
    useColorScheme,
} from "react-native";
import { StyleSheet, Dimensions } from "react-native";
import { lightTheme, darkTheme } from "../../Colors";
import { formatMoney } from "../Utils";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getRemaining, getProgress } from "../Utils";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Overview = ({
    navigation,
    bucket,
}) => {

    const colorScheme = useColorScheme();

    const theme = colorScheme === "light" ? lightTheme : darkTheme;

    const [currency, setCurrency] = useState("$");

    const { goal, saved } = bucket ? bucket : "";

    const [savedWidth, setSavedWidth] = useState(0);

    const onLayout = (e) => {
        setSavedWidth(e.nativeEvent.layout.width);
    };

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem("currency");
            if (value !== null) {
                const parsedValue = JSON.parse(value);
                setCurrency(parsedValue);
            }
        } catch (e) {
            console.log("Error getting data:", e);
        }
    };

    useEffect(() => {
        getData();
    }, [])

    return (
        <View style={[styles.container, { width: width }]}>
            <View style={[styles.wrapper]}>
                <MaterialCommunityIcons
                    name="piggy-bank"
                    size={28}
                    color={theme.light}
                />
                <Text style={[styles.text, { color: theme.light }]}>
                    Bucket Balance
                </Text>
            </View>
            <View style={[styles.moneyWrapper]}>
                <Text onLayout={onLayout} style={[styles.textWrapper, { marginBottom: 6 }]}>
                    <Text style={[styles.saved, { color: theme.money }]}>
                        {formatMoney(saved)} {currency}
                    </Text>
                </Text>
                <Text style={[styles.textWrapper, { width: savedWidth }, { textAlign: "right" }]}>
                    <Text style={[styles.goal, { color: theme.light }]}>
                        / {formatMoney(goal)} {currency}
                    </Text>
                </Text>
            </View>
            <View style={[styles.wrapper, { gap: 6 }]}>
                <Text style={[styles.text, { color: theme.light }]}>
                    Remaining:
                </Text>
                <Text style={[styles.text, { color: theme.money }]}>
                    {formatMoney(getRemaining(goal, saved))} {currency}
                </Text>
            </View>
            <View style={[styles.progressContainer]}>
                <View style={[styles.progressText]}>
                    <Text style={[{ color: theme.light }]}>Progress</Text>
                    <Text style={[{ color: theme.money }]}>{getProgress(saved, goal)}</Text>
                </View>
                <View style={[styles.progressBar, { backgroundColor: theme.inactive }]}>
                    <View style={[styles.progress, { width: getProgress(saved, goal), backgroundColor: theme.accent }]}></View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
    },
    text: {
        fontSize: 15,
    },
    moneyWrapper: {
        marginTop: "10%",
        marginBottom: "10%",
        alignItems: "center",
        justifyContent: "center",
    },
    textWrapper: {
    },
    saved: {
        fontSize: 42,
        fontFamily: "monospace",
    },
    goal: {
        fontFamily: "monospace",
        fontSize: 14,
    },
    progressContainer: {
        marginLeft: "6%",
        marginRight: "6%",
        marginTop: "10%",
    },
    progressBar: {
        padding: 3,
        borderRadius: 12,
        position: "relative",
        overflow: "hidden",
    },
    progress: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        borderRadius: 12,
    },
    progressText: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 8,
    },
})

export default Overview;