// src/routes/Settings.js

import React, { useEffect, useContext, useState } from "react";
import {
    View,
    Text,
    useColorScheme,
} from "react-native";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeContext } from "../components/ThemeContext";

const Settings = ({ navigation }) => {
    const { currentTheme, setThemePreference } = useContext(ThemeContext);
    const [selectedTheme, setSelectedTheme] = useState("automatic");
    const [selectedCurrency, setSelectedCurrency] = useState("dollar");

    const colorScheme = useColorScheme();
    const theme = currentTheme;

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

    const getData = async (key, setValue) => {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null) {
                const parsedValue = JSON.parse(value);
                setValue(parsedValue);
            }
        } catch (e) {
            console.log("Error getting data:", e);
        }
    };

    useEffect(() => {
        getData("currency", setSelectedCurrency);
        getData("theme", setSelectedTheme);
    }, []);

    useEffect(() => {
        setThemePreference(selectedTheme);
    }, [selectedTheme, setThemePreference]);

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Header navigation={navigation} back={true} />
            <Text style={[styles.title, { color: theme.colors.light }]}>Settings</Text>
            <View style={[styles.wrapper]}>
                <View style={[styles.settingWrapper]}>
                    <Text style={[styles.name, { color: theme.colors.text }]}>Theme</Text>
                    <View style={[styles.pickerWrapper]}>
                        <Picker
                            style={[styles.picker, { backgroundColor: colorScheme === "dark" ? theme.colors.inactive : theme.colors.inactiveLighter, color: theme.colors.text }]}
                            selectedValue={selectedTheme}
                            mode="dropdown"
                            onValueChange={(itemValue) => {
                                setSelectedTheme(itemValue);
                                saveData("theme", itemValue);
                            }}
                        >
                            {themes.map((item) => (
                                <Picker.Item
                                    key={item.value}
                                    label={item.label}
                                    value={item.value}
                                    style={{ backgroundColor: colorScheme === "dark" ? theme.colors.inactive : theme.colors.inactiveLighter, color: theme.colors.light }}
                                />
                            ))}
                        </Picker>
                    </View>
                </View>
                <View style={[styles.settingWrapper]}>
                    <Text style={[styles.name, { color: theme.colors.text }]}>Currency</Text>
                    <View style={[styles.pickerWrapper]}>
                        <Picker
                            style={[styles.picker, { backgroundColor: colorScheme === "dark" ? theme.colors.inactive : theme.colors.inactiveLighter, color: theme.colors.text }]}
                            selectedValue={selectedCurrency}
                            mode="dropdown"
                            onValueChange={(itemValue) => {
                                setSelectedCurrency(itemValue);
                                saveData("currency", itemValue);
                            }}
                        >
                            {currencies.map((item) => (
                                <Picker.Item
                                    key={item.value}
                                    label={item.label}
                                    value={item.value}
                                    style={{ backgroundColor: colorScheme === "dark" ? theme.colors.inactive : theme.colors.inactiveLighter, color: theme.colors.light }}
                                />
                            ))}
                        </Picker>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

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
