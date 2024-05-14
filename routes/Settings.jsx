import React from "react";
import { useState } from "react";
import {
    View,
    Text,
    Image,
    ScrollableHighlight,
    useColorScheme,
} from "react-native";
import { lightTheme, darkTheme } from "../Colors";
import Header from "../components/Header";

const Settings = ({ navigation }) => {

    const colorScheme = useColorScheme();

    const theme = colorScheme === "light" ? lightTheme : darkTheme;

    return (
        <View style={{flex: 1, backgroundColor: theme.background}}>
            <Header
                navigation={navigation}
                back={true}
            />
            <Text style={{color: theme.text}}>Settings</Text>
        </View>
    );
}

export default Settings;