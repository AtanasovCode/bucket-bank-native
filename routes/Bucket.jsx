import React from "react";
import { useState, useEffect, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    View,
    Text,
    TouchableHighlight,
    FlatList,
    Animated,
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
        if (route.params?.date
            && route.params?.amount !== undefined
            && route.params?.withdrawal !== undefined
            && route.params?.edit !== undefined
            && route.params?.id !== undefined
        ) {
            const newPayment = {
                id: Crypto.randomUUID(),
                date: route.params.date,
                amount: route.params.amount,
                withdrawal: route.params.withdrawal,
            };

            const paymentToEdit = bucket.payments.find((item) => item.id === route.params.id);

            const editedPayment = {
                ...paymentToEdit,
                amount: route.params.amount,
                date: route.params.date,
                withdrawal: route.params.withdrawal,
            };

            let updatedPayments;
            let newSavedValue;

            if (route.params.edit) {
                // Edit existing payment
                updatedPayments = bucket.payments.map((payment) =>
                    payment.id === route.params.id ? editedPayment : payment
                );
                // Adjust saved value based on the difference between the old and new amounts
                const oldAmount = parseFloat(paymentToEdit.amount);
                const newAmount = parseFloat(route.params.amount);
                const amountDifference = newAmount - oldAmount;
                newSavedValue = route.params.withdrawal
                    ? parseFloat(bucket.saved) - amountDifference
                    : parseFloat(bucket.saved) + amountDifference;
            } else {
                // Add new payment
                updatedPayments = [newPayment, ...bucket.payments];
                newSavedValue = route.params.withdrawal
                    ? parseFloat(bucket.saved) - parseFloat(route.params.amount)
                    : parseFloat(bucket.saved) + parseFloat(route.params.amount);
            }

            const updatedBucket = {
                ...bucket,
                saved: newSavedValue,
                payments: updatedPayments,
                complete: newSavedValue >= bucket.goal,
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
    }, [route.params]);



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
            console.log(e);
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
            selectedID={selectedID}
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
        if (flatListRef.current) {
            flatListRef.current.scrollToIndex({ index: index, animated: true })
        }
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
                <TouchableHighlight style={[styles.tab]}
                    onPress={() => {
                        setSelectedTab("overview");
                        handleTabChange("overview");
                    }}
                >
                    <Text style={[styles.text, { color: theme.text }]}>
                        Overview
                    </Text>
                </TouchableHighlight>
                <TouchableHighlight style={[styles.tab]}
                    onPress={() => {
                        setSelectedTab("payments")
                        handleTabChange("payments");
                    }}
                >
                    <Text style={[styles.text, { color: theme.text }]}>
                        Payments
                    </Text>
                </TouchableHighlight>
                <View style={[styles.tabBorder, {
                    backgroundColor: theme.accent,
                    left: selectedTab === "overview" ? 0 : "50%"
                }]}>

                </View>
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
        marginBottom: "6%",
    },
    title: {
        fontSize: 32,
        fontWeight: "700",
        textAlign: "center",
        marginHorizontal: "6%",
    },
    subTitle: {
        fontSize: 14,
        marginBottom: 8,
        textAlign: "center",
    },
    money: {},
    tabContainer: {
        flexDirection: "row",
    },
    tab: {
        flex: 1,
        paddingVertical: "3%",
    },
    tabBorder: {
        width: width * 0.5,
        height: "4%",
        position: "absolute",
        bottom: 0,
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