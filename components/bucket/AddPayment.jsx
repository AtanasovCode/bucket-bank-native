import React from "react";
import { useState } from "react";
import {
    View,
    Text,
    TouchableHighlight,
    TextInput,
    Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Dimensions } from "react-native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import Header from "../Header";
import { theme } from "../../Colors";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const AddPayment = ({ navigation }) => {

    const [date, setDate] = useState(new Date());
    const [payment, setPayment] = useState();

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
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
            <Header back={true} navigation={navigation} />
            <Text style={[styles.title, { color: theme.light }]}>
                Add Payment
            </Text>
            <View>
                <View style={[styles.wrapper]}>
                    <Text style={[styles.label, { color: theme.light }]}>
                        Date
                    </Text>
                    <TouchableHighlight
                        style={[styles.input, { backgroundColor: theme.inactive }]}
                        onPress={showDatepicker}
                    >
                        <Text style={{ color: theme.text }}>{date.toLocaleDateString()}</Text>
                    </TouchableHighlight>
                </View>
                <View style={[styles.wrapper]}>
                    <Text style={[styles.label, { color: theme.light }]}>
                        Payment Amount
                    </Text>
                    <TextInput
                        style={[styles.input, {
                            backgroundColor: theme.inactive, fontFamily: "monospace", color: theme.text
                        }]}
                        placeholderTextColor={"#ada6a6"}
                        placeholder="150.00"
                        keyboardType="numeric"
                        onChangeText={(value) => {
                            setPayment(value)
                        }}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {},
    title: {
        fontSize: 20,
        textAlign: "center",
        marginBottom: "15%",
    },
    wrapper: {
        marginBottom: "8%",
        marginLeft: "6%",
        marginRight: "6%",
    },
    input: {
        padding: 10,
        paddingLeft: 26,
        paddingRight: 26,
        borderRadius: 16,
        fontSize: 14,
        fontFamily: "sans-serif",
    },
    label: {
        fontSize: 14,
        textAlign: "left",
        marginBottom: 12,
    },
})

export default AddPayment;