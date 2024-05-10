import React from "react";
import {
    View,
    Text,
    Image,
} from "react-native";
import { StyleSheet, Dimensions } from "react-native";
import { theme } from "../../Colors";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Payments = ({ navigation }) => {
    return (
        <View style={[styles.container, { width: width }]}>
            <View style={[styles.wrapper]}>
                <Image source={require('../../assets/history.png')} style={{width: 35, height: 35,}} />
                <Text style={[styles.text, {color: theme.light}]}>
                    History
                </Text>
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
    text: {},
    title: {},
})

export default Payments;