import React, { useState } from "react";
import {
    View,
    TouchableHighlight,
    Text,
    StyleSheet,
} from "react-native";
import { AntDesign } from '@expo/vector-icons';

const Add = ({
    navigation,
    theme,
    screen,
}) => {
    return (
        <View style={[styles.addContainer, { backgroundColor: theme.background }]}>
            <TouchableHighlight
                style={[styles.add, { backgroundColor: theme.accent }]}
                onPress={() => navigation.navigate(screen)}
            >
                <AntDesign name="plus" size={24} color="black" />
            </TouchableHighlight>
        </View>
    );
}


const styles = StyleSheet.create({
    addContainer: {
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "4%",
        paddingBottom: "4%",
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
    },
    add: {
        padding: "3.5%",
        borderRadius: 50,
    },
})

export default Add;