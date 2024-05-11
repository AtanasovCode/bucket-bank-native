import React from "react";
import { useState } from "react";
import {
    View,
    Text,
    Image,
    Button,
    TouchableHighlight,
} from "react-native";
import { StyleSheet, Dimensions } from "react-native";
import { theme } from "../../Colors";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Payments = ({ navigation, bucket }) => {

    const [date, setDate] = useState(new Date(1598051730000));

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: currentMode,
            display: "spinner",
            is24Hour: true,
        });
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };


    return (
        <View style={[styles.container, { width: width }]}>
            <View style={[styles.wrapper]}>
                <Image source={require('../../assets/history.png')} style={{ width: 35, height: 35, }} />
                <Text style={[styles.text, { color: theme.light }]}>
                    History
                </Text>
            </View>
            <View>
                <Button onPress={showDatepicker} title="Show date picker!" />
                <Button onPress={showTimepicker} title="Show time picker!" />
                <Text>selected: {date.toLocaleString()}</Text>
            </View>
            <View style={[styles.addContainer, { backgroundColor: theme.background }]}>
                <TouchableHighlight
                    style={[styles.add, { backgroundColor: theme.accent }]}
                >
                    <Image source={require("../../assets/plus.png")} style={{ height: 20, width: 20 }} />
                </TouchableHighlight>
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
        marginBottom: "10%",
    },
    text: {},
    title: {},
    addContainer: {
        padding: 26,
        paddingBottom: 32,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
    },
    add: {
        padding: "5%",
        borderRadius: 50,
    },
})

export default Payments;