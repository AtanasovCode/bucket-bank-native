import React, { useEffect } from "react";
import { useState } from "react";
import {
    View,
    Text,
    TouchableHighlight,
    Image,
} from "react-native";
import { StyleSheet, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Crypto from 'expo-crypto';
import { theme } from "../Colors";
import { StatusBar } from "expo-status-bar";

import Header from "../components/Header";
import DashboardItem from "../components/dashboard/DashboardItem";



const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Dashboard = ({ navigation }) => {

    const [buckets, setBuckets] = useState([]);

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem("buckets");
            if (value !== null) {
                console.log(JSON.parse(value));
                const parsedValue = JSON.parse(value);
                setBuckets(parsedValue);
            }
        } catch (e) {
            console.log("Error getting data");
        }
    }

    const clearAsyncStorage = async () => {
        try {
            await AsyncStorage.clear();
            console.log('AsyncStorage cleared successfully.');
        } catch (error) {
            console.error('Error clearing AsyncStorage:', error);
        }
    };

    const saveBucket = (name, goal) => {
        const savedBucket = {
            id: Crypto.randomUUID(),
            name: name,
            goal: goal,
            saved: 0,
            payments: [],
        }

        setBuckets([savedBucket, ...buckets])
    }

    const saveData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem("buckets", jsonValue)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        saveData(buckets);
    }, [buckets])

    useEffect(() => {
        getData()
    }, [])

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background, minHeight: height, width: width }]}>
            <Header />
            <StatusBar style="light" />
            <Text style={[styles.title, { color: theme.light }]}>
                Buckets
            </Text>
            <View style={{ marginLeft: "3%", marginRight: "3%" }}>
                {

                    buckets.map((bucket) => {
                        return (
                            <DashboardItem
                                key={bucket.id}
                                id={bucket.id}
                                name={bucket.name}
                                goal={bucket.goal}
                                saved={bucket.saved}
                                navigation={navigation}
                            />
                        )
                    })
                }
            </View>
            <View style={[styles.wrapper, { backgroundColor: theme.background }]}>
                <TouchableHighlight
                    style={[styles.add, { backgroundColor: theme.accent }]}
                    onPress={() => {
                        navigation.navigate("Input", {
                            saveBucket: saveBucket,
                        });
                    }}
                >
                    <Image
                        source={require("../assets/plus.png")}
                        style={{ height: 20, width: 20, }}
                    />
                </TouchableHighlight>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapper: {
        padding: 26,
        paddingBottom: 32,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
    },
    title: {
        textAlign: "center",
        fontSize: 20,
        marginBottom: "15%",
    },
    add: {
        padding: "5%",
        borderRadius: 50,
    },
})

export default Dashboard;