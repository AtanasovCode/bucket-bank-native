import React from "react";
import {
    View,
    Text,
    Image,
    TouchableHighlight,
} from "react-native";
import { StyleSheet, Dimensions } from "react-native";
import { theme } from "../../Colors";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Payments = ({ navigation, bucket }) => {

    console.log(bucket.payments.length);

    return (
        <View style={[styles.container, { width: width }]}>
            <View style={[styles.wrapper]}>
                <Image source={require('../../assets/history.png')} style={{ width: 35, height: 35, }} />
                <Text style={[styles.text, { color: theme.light }]}>
                    History
                </Text>
            </View>
            {
                bucket.payments.length > 0 ?
                <View>
                    <Text style={{color: "#fff"}}>{payment.date}</Text>
                    <Text style={{color: "#fff"}}>{payment.amount}</Text>
                </View>
                :
                <Text style={{color: "#fff"}}>No payments found</Text>
            }
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