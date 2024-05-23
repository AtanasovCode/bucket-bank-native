import React from "react";
import { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableHighlight,
    TextInput,
} from "react-native";
import Checkbox from "expo-checkbox";
import { useTheme } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Dimensions } from "react-native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import Header from "../components/Header";
import { lightTheme, darkTheme } from "../Colors";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const AddPayment = ({ navigation, route }) => {

    const { colors, dark } = useTheme()

    const theme = colors;


    const [inputs, setInputs] = useState(false);
    const [date, setDate] = useState(new Date());
    const [payment, setPayment] = useState();
    const [withdrawal, setWithdrawal] = useState(false);
    const [title, setTitle] = useState("New Payment");
    const [edit, setEdit] = useState(false);
    const [id, setId] = useState(null);

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
            positiveButton: { label: "Done", textColor: dark ? "#fff" : "#000" },
            negativeButton: { label: "Cancel", textColor: dark ? "#fff" : "#000" },
        });
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const parseLocaleDateString = (dateString) => {
        const [day, month, year] = dateString.split('/').map(Number);
        return new Date(year, month - 1, day);
    };


    useEffect(() => {
        if (route.params?.amount !== undefined
            && route.params?.date !== undefined
            && route.params?.withdrawal !== undefined
            && route.params?.id !== undefined
            && route.params?.edit !== undefined
            && route.params?.id !== undefined
        ) {
            setPayment(route.params.amount);
            setDate(parseLocaleDateString(route.params.date));
            setWithdrawal(route.params.withdrawal);
            setTitle("Edit Payment");
            setEdit(route.params.edit);
            setId(route.params.id);
        }
    }, [route.params]);

    useEffect(() => {
        date && payment ? setInputs(true) : setInputs(false);
    }, [date, payment])

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <View>
                <Header back={true} navigation={navigation} />
                <Text style={[styles.title, { color: theme.light }]}>
                    {title}
                </Text>
                <View>
                    <View style={[styles.wrapper]}>
                        <Text style={[styles.label, { color: theme.light }]}>
                            Date
                        </Text>
                        <TouchableHighlight
                            style={[
                                styles.input,
                                { backgroundColor: theme.inactive }]}
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
                                backgroundColor: theme.inactive,
                                fontFamily: "monospace",
                                color: theme.text
                            }]}
                            placeholderTextColor={dark ? theme.light : "#ada6a6"}
                            placeholder="Enter payment"
                            keyboardType="numeric"
                            value={payment}
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
                    style={[styles.save, { backgroundColor: inputs ? theme.accent : theme.inactive }]}
                    onPress={() => {
                        if (inputs) {
                            navigation.navigate({
                                name: "Bucket",
                                params: {
                                    date: date.toLocaleDateString(),
                                    amount: payment,
                                    withdrawal: withdrawal,
                                    edit: edit,
                                    id: id,
                                },
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