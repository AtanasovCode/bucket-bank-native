import React from "react";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    View,
    Text,
    Image,
    TouchableHighlight,
    FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Dimensions } from "react-native";
import { theme } from "../Colors";

import Header from "../components/Header";
import Overview from "../components/bucket/Overview";
import Payments from "../components/bucket/Payments";


const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Bucket = ({ navigation }) => {

    const [selectedID, setSelectedID] = useState();
    const [bucket, setBucket] = useState({});
    const [selectedTab, setSelectedTab] = useState("overview");

    const getID = async () => {
        try {
            const value = await AsyncStorage.getItem("selectedId")
            if (value !== null) {
                const parsedValue = JSON.parse(value);
                setSelectedID(parsedValue);
            }
        } catch (e) {
            console.log(e);
        }
    }

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem("buckets");
            if (value !== null) {
                const parsedValue = JSON.parse(value);
                console.log(parsedValue);
                const selectedBucket = parsedValue.find((item) => item.id === selectedID);

                setBucket(selectedBucket);
            }
        } catch (e) {
            console.log("Error getting data");
        }
    }

    useEffect(() => {
        getID();
    }, [])

    useEffect(() => {
        getData();
    }, [selectedID])

    const DATA = [
        <Overview />,
        <Payments />
    ];

    const renderItem = ({ item }) => {
        return (
            <View>
                {item}
            </View>
        );
    }

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background, width: width }]}>
            <Header navigation={navigation} back={true} />
            {
                bucket ?
                    <View style={[styles.bucketWrapper]}>
                        <Text style={[styles.subTitle, { color: theme.light }]}>Bucket Name</Text>
                        <Text style={[styles.title, { color: theme.text }]}>
                            {bucket.name}
                        </Text>
                    </View>
                    :
                    <Text style={{ color: "#fff" }}>
                        Loading...
                    </Text>
            }
            <View style={[styles.tabContainer]}>
                <TouchableHighlight style={[
                    styles.tab,
                    { backgroundColor: selectedTab === "overview" ? theme.accent : theme.inactive }]}
                    onPress={() => {
                        setSelectedTab("overview");
                    }}
                >
                    <Text style={[styles.text, { color: selectedTab === "overview" ? "#000" : theme.text }]}>
                        Overview
                    </Text>
                </TouchableHighlight>
                <TouchableHighlight style={[
                    styles.tab,
                    { backgroundColor: selectedTab === "payments" ? theme.accent : theme.inactive }]}
                    onPress={() => {
                        setSelectedTab("payments")
                    }}
                >
                    <Text style={[styles.text, { color: selectedTab === "payments" ? "#000" : theme.text }]}>
                        Payments
                    </Text>
                </TouchableHighlight>
            </View>

            {/* <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={(item, index) => String(index)}
                horizontal={true}
            /> */}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bucketWrapper: {
        marginBottom: "10%",
    },
    title: {
        fontSize: 32,
        fontWeight: "700",
        textAlign: "center",
        marginLeft: "6%",
        marginRight: "6%",
    },
    subTitle: {
        fontSize: 14,
        marginBottom: 8,
        textAlign: "center",
    },
    money: {},
    tabContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 26,
    },
    tab: {
        padding: 12,
        paddingLeft: 26,
        paddingRight: 26,
        borderRadius: 22,
    },
    text: {
        fontSize: 15,
    },
})

export default Bucket;