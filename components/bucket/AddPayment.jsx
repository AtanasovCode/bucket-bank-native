import React from "react";
import { useState } from "react";
import {
    View,
    Text,
    TouchableHighlight,
    Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import Header from "../Header";
import { theme } from "../../Colors";

const AddPayment = ({navigation}) => {
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: theme.background}}>
            <Header back={true} navigation={navigation} />
            <Text style={[{color: theme.text}]}>
                Add Payment
            </Text>
        </SafeAreaView>
    );
}

export default AddPayment;