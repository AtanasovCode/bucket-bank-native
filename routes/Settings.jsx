import React from "react";
import { useState } from "react";
import {
    View,
    Text,
    ScrollableHighlight,
    useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { lightTheme, darkTheme } from "../Colors";
import Header from "../components/Header";

const Settings = ({ navigation }) => {

    const colorScheme = useColorScheme();

    const theme = colorScheme === "light" ? lightTheme : darkTheme;

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: theme.background}}>
            <Header
                navigation={navigation}
                back={true}
            />
            <Text style={{color: theme.text}}>Settings</Text>
        </SafeAreaView>
    );
}

export default Settings;