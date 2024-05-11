import React from "react";
import { View, Text, Image, TouchableHighlight, ScrollView } from "react-native";
import { StyleSheet, Dimensions } from "react-native";
import { theme } from "../../Colors";
import { formatMoney } from "../Utils";

const width = Dimensions.get("window").width;

const Payments = ({ navigation, bucket, setBucket }) => {
    console.log(bucket.payments && bucket.payments.length > 0 ? bucket.payments : "Empty");

    return (
        <View style={[styles.container, { width: width }]}>
            <View style={[styles.wrapper]}>
                <Image source={require('../../assets/history.png')} style={{ width: 35, height: 35 }} />
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
                                    <Image
                                        source={require('../../assets/save.png')}
                                        style={{ width: 30, height: 30 }}
                                    />
                                    <Text style={[styles.text, { color: theme.text }]}>{item.date}</Text>
                                </View>
                                <View style={[styles.paymentWrapper]}>
                                    <Text style={[{ color: theme.money, fontFamily: "monospace", fontSize: 16 }]}>
                                        {formatMoney(item.amount)} $
                                    </Text>
                                </View>
                            </View>
                        ))
                    ) : (
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 22 }}>
                            <Image
                                source={require('../../assets/empty.png')}
                                style={{ width: 20, height: 20 }}
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
                        <Image source={require("../../assets/plus.png")} style={{ height: 20, width: 20 }} />
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
        marginBottom: "10%",
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
        padding: "5%",
        borderRadius: 50,
    },
})

export default Payments;
