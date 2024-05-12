import React from "react";
import { useState, useEffect } from "react";
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

    const [inputs, setInputs] = useState(false);
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
            positiveButton: {label: "Done", textColor: "#fff"},
            negativeButton: {label: "Cancel", textColor: "#fff"},
        });
    };

    const showDatepicker = () => {
        showMode('date');
    };

    useEffect(() => {
        date && payment ? setInputs(true) : setInputs(false);
    }, [date, payment])

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <View>
                <Header back={true} navigation={navigation} />
                <Text style={[styles.title, { color: theme.light }]}>
                    New Payment
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
            </View>
            <View style={[styles.saveContainer, styles.wrapper]}>
                <TouchableHighlight
                    style={[styles.save, { backgroundColor: inputs ? theme.accent : theme.inactive }]}
                    onPress={() => {
                        if (inputs) {
                            navigation.navigate({
                                name: "Bucket",
                                params: {date: date.toLocaleDateString(), amount: payment},
                                merge: true,
                            })
                        }
                    }}
                >
                    <Text style={{ color: inputs ? theme.white : theme.light }}>
                        Save
                    </Text>
                </TouchableHighlight>
            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
    },
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
        padding: 12,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 16,
        fontSize: 14,
        fontFamily: "sans-serif",
    },
    label: {
        fontSize: 14,
        textAlign: "left",
        marginBottom: 12,
        paddingLeft: 20,
    },
    saveContainer: {
        paddingBottom: 22,
        alignItems: "center",
        justifyContent: "center",
    },
    save: {
        alignItems: "center",
        justifyContent: 'center',
        padding: 18,
        paddingLeft: 26,
        paddingRight: 26,
        width: "100%",
        borderRadius: 16,
    },
})

export default AddPayment;