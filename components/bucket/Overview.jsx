import React from "react";
import {
    View,
    Text,
 } from "react-native";
 import { StyleSheet, Dimensions } from "react-native";

 const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

 const Overview = ({navigation}) => {
    return (
        <View style={[styles.container, {width: width}]}>
            <Text>Overview</Text>
        </View>
    );
 }

 const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
 })

 export default Overview;