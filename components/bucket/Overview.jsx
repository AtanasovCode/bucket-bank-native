import React from "react";
import { useState } from "react";
import {
    View,
    Text,
    Image,
} from "react-native";
import { StyleSheet, Dimensions } from "react-native";
import { theme } from "../../Colors";
import { formatMoney } from "../Utils";

import { getRemaining, getProgress } from "../Utils";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Overview = ({
    navigation,
    bucket,
}) => {

    const { goal, saved } = bucket ? bucket : "";

    const [savedWidth, setSavedWidth] = useState(0);

    const onLayout = (e) => {
        setSavedWidth(e.nativeEvent.layout.width);
      };

    return (
        <View style={[styles.container, { width: width }]}>
            <View style={[styles.wrapper]}>
                <Image
                    source={require('../../assets/bank.png')}
                    style={[{ width: 25, height: 25 }]}
                />
                <Text style={[styles.text, { color: theme.light }]}>
                    Bucket Balance
                </Text>
            </View>
            <View style={[styles.moneyWrapper]}>
                <Text onLayout={onLayout} style={[styles.textWrapper, {marginBottom: 6}]}>
                    <Text style={[styles.saved, { color: theme.money }]}>
                        {formatMoney(saved)} $
                    </Text>
                </Text>
                <Text style={[styles.textWrapper, {width: savedWidth}, {textAlign: "right"}]}>
                    <Text style={[styles.goal, { color: theme.light }]}>
                        / {formatMoney(goal)} $
                    </Text>
                </Text>
            </View>
            <View style={[styles.wrapper, { gap: 6 }]}>
                <Text style={[styles.text, { color: theme.light }]}>
                    Remaining:
                </Text>
                <Text style={[styles.text, { color: theme.money }]}>
                    {formatMoney(getRemaining(goal, saved))} $
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
        padding: 8,
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