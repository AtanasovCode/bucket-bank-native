import React from "react";
import { useState, useEffect, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    View,
    Text,
    TouchableHighlight,
    FlatList,
    useColorScheme,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Dimensions } from "react-native";
import * as Crypto from 'expo-crypto';
import { lightTheme, darkTheme } from "../Colors";

import Header from "../components/Header";
import Overview from "../components/bucket/Overview";
import Payments from "../components/bucket/Payments";


const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Bucket = ({ navigation, route }) => {

    const { colors } = useTheme();
    const theme = colors;

    const flatListRef = useRef(null);

    const [selectedID, setSelectedID] = useState();
    const [bucket, setBucket] = useState({});
    const [selectedTab, setSelectedTab] = useState("overview");

    useEffect(() => {
        if (route.params?.date && route.params?.amount !== undefined && route.params?.withdrawal === true || route.params?.withdrawal === false) {
            const newPayment = {
                id: Crypto.randomUUID(),
                date: route.params.date,
                amount: route.params.amount,
                withdrawal: route.params.withdrawal,
            };
            const updatedBucket = {
                ...bucket,
                saved: route.params.withdrawal ? parseFloat(bucket.saved) - parseFloat(route.params.amount) : parseFloat(bucket.saved) + parseFloat(route.params.amount),
                payments: [newPayment, ...bucket.payments],
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
                        // Update local state immediately after AsyncStorage update
                        setBucket(updatedBucket);
                    }
                } catch (error) {
                    console.log("Error updating buckets in AsyncStorage:", error);
                }
            };


            updateBuckets();
        }
    }, [route.params?.date, route.params?.amount, route.params?.withdrawal]);

    useEffect(() => {
        if (route.params?.name && route.params.goal) {
            const updatedBucket = {
                ...bucket,
                name: route.params.name,
                goal: route.params.goal,
            }

            const updateBuckets = async () => {
                try {
                    const bucketsData = await AsyncStorage.getItem("buckets");
                    if (bucketsData) {
                        const parsedBuckets = JSON.parse(bucketsData);
                        const updatedBuckets = parsedBuckets.map((item) =>
                            item.id === selectedID ? updatedBucket : item
                        );
                        await setData("buckets", updatedBuckets);
                        // Update local state immediately after AsyncStorage update
                        setBucket(updatedBucket);
                    }
                } catch (error) {
                    console.log("Error updating buckets in AsyncStorage:", error);
                }
            };

            updateBuckets();
        }
    }, [route.params?.name, route.params?.goal])



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
        <Overview
            bucket={bucket}
            navigation={navigation}
            theme={theme}
        />,
        <Payments
            bucket={bucket}
            setBucket={setBucket}
            navigation={navigation}
            theme={theme}
        />
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
            <Header navigation={navigation} back={true} edit={true} />
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
                pagingEnabled={false}
                scrollEnabled={false}
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