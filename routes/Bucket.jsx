import React from "react";
import { useState, useEffect, useRef } from "react";
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
import * as Crypto from 'expo-crypto';
import { theme } from "../Colors";

import Header from "../components/Header";
import Overview from "../components/bucket/Overview";
import Payments from "../components/bucket/Payments";


const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Bucket = ({ navigation, route }) => {

    const flatListRef = useRef(null);

    const [selectedID, setSelectedID] = useState();
    const [bucket, setBucket] = useState({});
    const [selectedTab, setSelectedTab] = useState("overview");


    //checks if params have been sent from route
    //updates bucket with new params (date and payment amount)
    useEffect(() => {
        if (route.params?.date && route.params?.amount) {
            const newPayment = {
                id: Crypto.randomUUID(),
                date: route.params.date,
                amount: route.params.amount,
            };
            const updatedBucket = {
                ...bucket,
                payments: [...bucket.payments, newPayment],
            };

            const updateBuckets = async () => {
                try {
                    const bucketsData = await AsyncStorage.getItem("buckets");
                    if (bucketsData) {
                        const parsedBuckets = JSON.parse(bucketsData);
                        const updatedBuckets = parsedBuckets.map((item) =>
                            item.id === selectedID ? updatedBucket : item
                        );
                        await setData("buckets", updatedBuckets);
                    }
                } catch (error) {
                    console.log("Error updating buckets in AsyncStorage:", error);
                }
            };

            updateBuckets();
        }
    }, [route.params?.date, route.params?.amount]);


    console.log(bucket);


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
                const selectedBucket = parsedValue.find((item) => item.id === selectedID);

                setBucket(selectedBucket);
            }
        } catch (e) {
            console.log("Error getting data");
        }
    }

    const setData = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.log("Error saving data");
        }
    };

    useEffect(() => {
        getID();
    }, [])

    useEffect(() => {
        selectedID && getData();
    }, [selectedID])


    const DATA = [
        <Overview bucket={bucket} navigation={navigation} />,
        <Payments bucket={bucket} setBucket={setBucket} navigation={navigation} />
    ];

    const renderItem = ({ item }) => {
        return (
            <View style={[styles.component]}>
                {item}
            </View>
        );
    }

    const getVisible = (viewableItems) => {
        const visibleItemIds = viewableItems.viewableItems.map((item) => item.key);

        visibleItemIds[0] === "0" ? setSelectedTab("overview") : setSelectedTab("payments");
    }

    const handleTabChange = (value) => {
        const index = value === "overview" ? 0 : 1;
        flatListRef.current.scrollToIndex({ index: index, animated: true })
    }

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background, width: width, height: height }]}>
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
                        handleTabChange("overview");
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
                        handleTabChange("payments");
                    }}
                >
                    <Text style={[styles.text, { color: selectedTab === "payments" ? "#000" : theme.text }]}>
                        Payments
                    </Text>
                </TouchableHighlight>
            </View>

            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={(item, index) => String(index)}
                horizontal={true}
                pagingEnabled={true}
                ref={flatListRef}
                style={{ flex: 1 }}
                initialScrollIndex={0}
                onViewableItemsChanged={getVisible}
            />
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
        gap: 20,
        marginLeft: "6%",
        marginRight: "6%",
    },
    tab: {
        padding: 8,
        flex: 1,
        borderRadius: 16,
    },
    text: {
        fontSize: 15,
        textAlign: "center",
    },
    component: {
        marginTop: "10%",
    },
})

export default Bucket;