import React, { useState, useEffect } from "react";
import { View, Text, TouchableHighlight, ScrollView, useColorScheme } from "react-native";
import { StyleSheet, Dimensions } from "react-native";
import { lightTheme, darkTheme } from "../../Colors";
import { formatMoney } from "../Utils";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";

const width = Dimensions.get("window").width;

const Payments = ({ navigation, bucket, setBucket }) => {

    const colorScheme = useColorScheme();

    const theme = colorScheme === "light" ? lightTheme : darkTheme;

    const [currency, setCurrency] = useState("$");



    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem("currency");
            if (value !== null) {
                const parsedValue = JSON.parse(value);
                setCurrency(parsedValue);
            }
        } catch (e) {
            console.log("Error getting data:", e);
        }
    };

    useEffect(() => {
        getData();
    }, [])


    return (
        <View style={[styles.container, { width: width }]}>
            <View style={[styles.wrapper]}>
                <MaterialCommunityIcons
                    name="history"
                    size={24}
                    color={theme.light}
                />
                <Text style={[styles.text, { color: theme.light }]}>
                    History
                </Text>
            </View>
            <View style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1 }}>
                    {bucket.payments && bucket.payments.length > 0 ? (
                        bucket.payments.map((item) => (
                            <View key={item.id} style={[styles.paymentContainer]}>
                                <View style={[styles.paymentWrapper]}>
                                    <MaterialCommunityIcons
                                        name="bank-plus"
                                        size={22}
                                        color={theme.light}
                                    />
                                    <Text style={[styles.text, { color: theme.text }]}>{item.date}</Text>
                                </View>
                                <View style={[styles.paymentWrapper]}>
                                    <Text style={[styles.text, { color: theme.money, fontFamily: "monospace" }]}>
                                        + {formatMoney(item.amount)} {currency}
                                    </Text>
                                </View>
                            </View>
                        ))
                    ) : (
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 22 }}>
                            <AntDesign
                                name="minuscircle"
                                size={24}
                                color={theme.light}
                            />
                            <Text style={{ color: theme.light, fontSize: 14 }}>
                                No payments found
                            </Text>
                        </View>
                    )}
                </ScrollView>
                <View style={[styles.addContainer, { backgroundColor: theme.background }]}>
                    <TouchableHighlight
                        style={[styles.add, { backgroundColor: theme.accent }]}
                        onPress={() => {
                            navigation.navigate("Payment");
                        }}
                    >
                        <AntDesign name="plus" size={24} color="black" />
                    </TouchableHighlight>
                </View>
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
    text: {
        fontSize: 14,
    },
    paymentContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: "7%",
        marginLeft: "6%",
        marginRight: "6%",
    },
    paymentWrapper: {
        flexDirection: "row",
        gap: 22,
        alignItems: "center",
    },
    title: {},
    addContainer: {
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "4%",
        paddingBottom: "4%",
    },
    add: {
        padding: "3.5%",
        borderRadius: 50,
    },
})

export default Payments;
