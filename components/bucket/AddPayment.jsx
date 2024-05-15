import React from "react";
import { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableHighlight,
    TextInput,
    Image,
    useColorScheme,
} from "react-native";
import Checkbox from "expo-checkbox";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Dimensions } from "react-native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import Header from "../Header";
import { lightTheme, darkTheme } from "../../Colors";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const AddPayment = ({ navigation }) => {

    const colorScheme = useColorScheme();

    const theme = colorScheme === "light" ? lightTheme : darkTheme;


    const [inputs, setInputs] = useState(false);
    const [date, setDate] = useState(new Date());
    const [payment, setPayment] = useState();
    const [withdrawal, setWithdrawal] = useState(false);

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
            positiveButton: { label: "Done", textColor: colorScheme === "light" ? "#000" : "#FFF" },
            negativeButton: { label: "Cancel", textColor: colorScheme === "light" ? "#000" : "#FFF" },
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
                            style={[
                                styles.input,
                                { backgroundColor: colorScheme === "dark" ? theme.inactive : theme.inactiveLighter }]}
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
                                backgroundColor: colorScheme === "dark" ? theme.inactive : theme.inactiveLighter,
                                fontFamily: "monospace",
                                color: theme.text
                            }]}
                            placeholderTextColor={colorScheme === "dark" ? "#ada6a6" : theme.light}
                            placeholder="Enter payment"
                            keyboardType="numeric"
                            onChangeText={(value) => {
                                setPayment(value)
                            }}
                        />
                    </View>
                    <View style={[styles.checkboxContainer]}>
                        <Checkbox
                            style={styles.checkbox}
                            value={withdrawal}
                            onValueChange={setWithdrawal}
                            color={theme.accent}
                        />

                        <Text style={[styles.checkboxText, { color: theme.light }]}>
                            Mark as withdrawal (optional)
                        </Text>
                    </View>
                </View>
            </View>
            <View style={[styles.saveContainer, styles.wrapper]}>
                <TouchableHighlight
                    style={[styles.save, { backgroundColor: inputs ? theme.accent : colorScheme === "light" ? theme.inactiveLighter : theme.inactive }]}
                    onPress={() => {
                        if (inputs) {
                            navigation.navigate({
                                name: "Bucket",
                                params: { date: date.toLocaleDateString(), amount: payment, withdrawal: withdrawal },
                                merge: true,
                            })
                        }
                    }}
                >
                    <Text style={{ color: inputs ? theme.text : theme.light }}>
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
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: "6%",
        marginRight: "6%",
    },
    checkboxText: {
        fontSize: 14,
        textAlign: "left",
    },
    checkbox: {
        marginRight: "5%",
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