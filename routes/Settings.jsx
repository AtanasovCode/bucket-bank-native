import React, { useEffect } from "react";
import { useState } from "react";
import {
    View,
    Text,
    ScrollableHighlight,
    useColorScheme,
} from "react-native";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { lightTheme, darkTheme } from "../Colors";
import Header from "../components/Header";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Settings = ({ navigation }) => {

    const [selectedTheme, setSelectedTheme] = useState("automatic");
    const [selectedCurrency, setSelectedCurrency] = useState("dollar");

    const colorScheme = useColorScheme();

    const theme = colorScheme === "light" ? lightTheme : darkTheme;

    const currencies = [
        { label: "US Dollar (USD) - $", value: "$" },
        { label: "Euro (EUR) - €", value: "€" },
        { label: "Japanese Yen (JPY) - ¥", value: "¥" },
        { label: "British Pound Sterling (GBP) - £", value: "£" },
        { label: "Australian Dollar (AUD) - A$", value: "A$" },
        { label: "Canadian Dollar (CAD) - CA$", value: "CA$" },
        { label: "Swiss Franc (CHF) - CHF", value: "CHF" },
        { label: "Swedish Krona (SEK) - SEK", value: "SEK" },
        { label: "New Zealand Dollar (NZD) - NZ$", value: "NZ$" },
        { label: "South Korean Won (KRW) - ₩", value: "₩" },
        { label: "Singapore Dollar (SGD) - S$", value: "S$" },
        { label: "Mexican Peso (MXN) - Mex$", value: "Mex$" },
        { label: "Indian Rupee (INR) - ₹", value: "₹" },
        { label: "Brazilian Real (BRL) - R$", value: "R$" },
        { label: "Thai Baht (THB) - ฿", value: "THB" },
        { label: "Indonesian Rupiah (IDR) - Rp", value: "IDR" },
        { label: "UAE Dirham (AED) - AED", value: "AED" },
        { label: "Philippine Peso (PHP) - ₱", value: "PHP" },
        { label: "Polish Złoty (PLN) - zł", value: "PLN" },
    ];

    const themes = [
        { label: "Automatic", value: "automatic" },
        { label: "Dark", value: "dark" },
        { label: "Light", value: "light" },
    ];

    const saveData = async (key, value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue)
        } catch (e) {
            console.log(e)
        }
    }

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem("currency");
            if (value !== null) {
                const parsedValue = JSON.parse(value);
                setSelectedCurrency(parsedValue);
            }
        } catch (e) {
            console.log("Error getting data:", e);
        }
    };

    useEffect(() => {
        getData();
    }, [])


    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <Header
                navigation={navigation}
                back={true}
            />
            <Text style={[styles.title, { color: theme.light }]}>Settings</Text>
            <View style={[styles.wrapper]}>
                <View style={[styles.settingWrapper]}>
                    <Text style={[styles.name, { color: theme.text }]}>
                        Theme
                    </Text>
                    <View style={[styles.pickerWrapper]}>
                        <Picker
                            style={[styles.picker,
                            { backgroundColor: colorScheme === "dark" ? theme.inactive : theme.inactiveLighter, color: theme.text }]}
                            selectedValue={selectedTheme}
                            mode="dropdown"
                            onValueChange={(itemValue, itemIndex) => {
                                setSelectedTheme(itemValue);
                                saveData("theme", itemValue);
                            }}
                        >
                            {
                                themes.map((item) => {
                                    return (
                                        <Picker.Item
                                            label={item.label}
                                            value={item.value}
                                            style={{ backgroundColor: colorScheme === "dark" ? theme.inactive : theme.inactiveLighter, color: theme.light }}
                                        />
                                    );
                                })
                            }
                        </Picker>
                    </View>
                </View>
                <View style={[styles.settingWrapper]}>
                    <Text style={[styles.name, { color: theme.text }]}>
                        Currency
                    </Text>
                    <View style={[styles.pickerWrapper]}>
                        <Picker
                            style={[styles.picker,
                            { backgroundColor: colorScheme === "dark" ? theme.inactive : theme.inactiveLighter, color: theme.text }]}
                            selectedValue={selectedCurrency}
                            mode="dropdown"
                            onValueChange={(itemValue, itemIndex) => {
                                setSelectedCurrency(itemValue);
                                saveData("currency", itemValue);
                            }}
                        >
                            {
                                currencies.map((currency) => {
                                    return (
                                        <Picker.Item
                                            label={currency.label}
                                            value={currency.value}
                                            style={{ backgroundColor: colorScheme === "dark" ? theme.inactive : theme.inactiveLighter, color: theme.light }}
                                        />
                                    );
                                })
                            }
                        </Picker>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        textAlign: "center",
        marginBottom: "12%",
    },
    wrapper: {
        marginLeft: "4%",
        marginRight: "4%",
    },
    settingWrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "20%",
    },
    name: {
        flex: 1,
        fontSize: 15,
    },
    pickerWrapper: {
        flex: 1,
        borderRadius: 12,
        overflow: "hidden",
    },
    picker: {
        flex: 1,
    },
})

export default Settings;