import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableHighlight,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Dimensions } from "react-native";
import Header from "../components/Header";


const EditBucket = ({navigation}) => {

    const { colors } = useTheme();
    const theme = colors;

    return (
        <SafeAreaView style={[styles.container, {backgroundColor: theme.background}]}>
            <Header 
                navigation={navigation}
                back={true}
            />
            <Text style={[styles.title, {color: theme.light}]}>Edit Bucket</Text>
        </SafeAreaView>
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
})

export default EditBucket;