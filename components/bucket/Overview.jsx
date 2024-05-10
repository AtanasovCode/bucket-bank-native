import React from "react";
import {
    View,
    Text,
    Image,
 } from "react-native";
 import { StyleSheet, Dimensions } from "react-native";
 import { theme } from "../../Colors";
 import { formatMoney } from "../Utils";

 const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

 const Overview = ({
    navigation,
    bucket,
}) => {

    const { goal, saved } = bucket ? bucket : "";

    return (
        <View style={[styles.container, {width: width}]}>
            <View style={[styles.wrapper]}>
                <Image 
                    source={require('../../assets/bank.png')}
                    style={[{width: 45, height: 45}]}
                />
                <Text style={[styles.text, {color: theme.text}]}>
                    Balance
                </Text>
            </View>
            <View style={[styles.moneyWrapper]}>
                <Text style={[styles.saved, {color: theme.money}]}>
                    {formatMoney(saved)} $
                </Text>
                <Text style={[styles.goal, {color: theme.light}]}>
                    / {formatMoney(goal)} $
                </Text>
            </View>
            <View>
                <Text style={{color: theme.light, textAlign: "center"}}>Remaining:</Text>
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
        gap: 25,
    },
    text: {
        fontSize: 17,
    },
    moneyWrapper: {
        marginTop: "10%",
        marginBottom: "10%",
    },
    saved: {
        fontSize: 36,
        fontFamily: "monospace",
        textAlign: "center",
    },
    goal: {
        fontFamily: "monospace",
        fontSize: 14,
        textAlign: "center",
    },
 })

 export default Overview;