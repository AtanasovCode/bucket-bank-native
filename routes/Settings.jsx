import React from "react";
import { useState } from "react";
import {
    View,
    Text,
    Image,
    ScrollableHighlight,
} from "react-native";
import { theme } from "../Colors";
import Header from "../components/Header";

const Settings = ({ navigation }) => {
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