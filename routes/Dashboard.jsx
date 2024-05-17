import React, { useEffect, useState } from "react";
import {
    View,
    ScrollView,
    Text,
    TouchableHighlight,
    StyleSheet,
    Dimensions,
    useColorScheme,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "@react-navigation/native";
import Header from "../components/Header";
import DashboardItem from "../components/dashboard/DashboardItem";
import DashboardData from "../components/dashboard/DashboardData";
import { Entypo } from '@expo/vector-icons';
import Add from "../components/Add";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Dashboard = ({ navigation, route }) => {

    const colorScheme = useColorScheme();

    const { colors } = useTheme();

    const theme = colors;


    const [buckets, setBuckets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currency, setCurrency] = useState("$");


    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem("buckets");
            if (value !== null) {
                const parsedValue = JSON.parse(value);
                setBuckets(parsedValue);
            }
        } catch (e) {
            console.log("Error getting data:", e);
        } finally {
            setLoading(false);
        }
    };

    const updateData = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.log("Error saving data");
        }
    };

    const clearAsyncStorage = async () => {
        try {
            await AsyncStorage.clear();
            console.log('AsyncStorage cleared successfully.');
        } catch (error) {
            console.error('Error clearing AsyncStorage:', error);
        }
    };

    const getCurrency = async () => {
        try {
            const value = await AsyncStorage.getItem("currency");
            if (value !== null) {
                const parsedValue = JSON.parse(value);
                setCurrency(parsedValue);
            }
        } catch (e) {
            console.log("Error getting data:", e);
        } finally {
            console.log("Changed Currency");
        }
    };

    useEffect(() => {
        getData();
        getCurrency();
    }, [])

    //useEffect(() => {clearAsyncStorage()}, [])

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            setLoading(true);
            getData();
        });

        return unsubscribe;

    }, [navigation]);

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            getCurrency();
        });

        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        if (route.params?.delete === true && route.params?.id) {

            const updateBuckets = async () => {
                try {
                    const bucketsData = await AsyncStorage.getItem("buckets");
                    if (bucketsData) {
                        const parsedBuckets = JSON.parse(bucketsData);

                        const updatedBuckets = parsedBuckets.filter((item) => item.id !== route.params.id);

                        await updateData("buckets", updatedBuckets);
                        // Update local state immediately after AsyncStorage update
                        setBuckets(updatedBuckets);
                        // Clear the delete param after processing with a slight delay to ensure UI update
                        setTimeout(() => {
                            navigation.setParams({ delete: false, id: null });
                        }, 100);
                    }
                } catch (error) {
                    console.log("Error updating buckets in AsyncStorage:", error);
                }
            };

            updateBuckets();
        }
    }, [route.params?.delete, route.params?.id])


    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background, minHeight: height, width: width }]}>
            <Header settings={true} navigation={navigation} />
            <StatusBar style="light" />
            <DashboardData
                buckets={buckets}
                currency={currency}
                theme={theme}
            />
            <Text style={[styles.title, { color: theme.light }]}>Buckets</Text>
            <ScrollView style={[styles.bucketsWrapper]}>
                {loading ? (
                    <Text>Loading...</Text>
                ) : (
                    buckets.length ?
                        buckets.map((bucket) => (
                            <DashboardItem
                                key={bucket.id}
                                id={bucket.id}
                                name={bucket.name}
                                goal={bucket.goal}
                                saved={bucket.saved}
                                navigation={navigation}
                                theme={theme}
                                currency={currency}
                            />
                        ))
                        :
                        <View style={[styles.emptyContainer]}>
                            <Entypo name="bucket" size={24} color={theme.light} />
                            <Text style={[{ color: theme.light }]}>No buckets found</Text>
                        </View>
                )}
            </ScrollView>
            <Add
                navigation={navigation}
                theme={theme}
                screen="Input"
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bucketsWrapper: {
        marginLeft: "4%",
        marginRight: "4%",
        marginBottom: "3%",
    },
    title: {
        textAlign: "center",
        fontSize: 18,
        marginBottom: "8%",
    },
    emptyContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
    },
});

export default Dashboard;
