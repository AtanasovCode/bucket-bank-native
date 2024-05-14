import React from "react";
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

const Settings = ({ navigation }) => {

    const [selectedTheme, setSelectedTheme] = useState("automatic");

    const colorScheme = useColorScheme();

    const theme = colorScheme === "light" ? lightTheme : darkTheme;

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
                    <Picker
                        style={[styles.picker,
                        { backgroundColor: theme.inactive, color: theme.text}]}
                        selectedValue={selectedTheme}
                        mode="dropdown"
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedTheme(itemValue)
                        }
                    >
                        <Picker.Item
                            label="Automatic"
                            value="automatic"
                            style={{ backgroundColor: theme.inactive, color: theme.light }}
                        />
                        <Picker.Item
                            label="Dark"
                            value="dark"
                            style={{ backgroundColor: theme.inactive, color: theme.light }}
                        />
                        <Picker.Item
                            label="Light"
                            value="light"
                            style={{ backgroundColor: theme.inactive, color: theme.light }}
                        />
                    </Picker>
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
        marginBottom: "6%",
    },
    name: {
        flex: 1,
        fontSize: 15,
    },
    picker: {
        flex: 1,
        borderRadius: 12,
    },
})

export default Settings;