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
import Header from "../components/Header";
import DashboardItem from "../components/dashboard/DashboardItem";
import { lightTheme, darkTheme } from "../Colors";
import { AntDesign } from '@expo/vector-icons';

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Dashboard = ({ navigation, route }) => {

    const colorScheme = useColorScheme();

    const theme = colorScheme === "light" ? lightTheme : darkTheme;


    const [buckets, setBuckets] = useState([]);
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            setLoading(true);
            getData();
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
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background, height: height, width: width }]}>
            <Header settings={true} navigation={navigation} />
            <StatusBar style="light" />
            <Text style={[styles.title, { color: theme.light }]}>Buckets</Text>
            <ScrollView style={[styles.bucketsWrapper]}>
                {loading ? (
                    <Text>Loading...</Text>
                ) : (
                    buckets.map((bucket) => (
                        <DashboardItem
                            key={bucket.id}
                            id={bucket.id}
                            name={bucket.name}
                            goal={bucket.goal}
                            saved={bucket.saved}
                            navigation={navigation}
                        />
                    ))
                )}
            </ScrollView>
            <View style={[styles.addContainer, { backgroundColor: theme.background }]}>
                <TouchableHighlight
                    style={[styles.add, { backgroundColor: theme.accent }]}
                    onPress={() => {
                        navigation.navigate("Input");
                    }}
                >
                    <AntDesign name="plus" size={24} color="black" />
                </TouchableHighlight>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bucketsWrapper: {
        paddingLeft: "4%",
        paddingRight: "4%",
        paddingBottom: "3%",
    },
    title: {
        textAlign: "center",
        fontSize: 18,
        marginBottom: "8%",
    },
    addContainer: {
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "4%",
        paddingBottom: "4%",
    },
    add: {
        padding: "3.5%",
        borderRadius: 50,
    },
});

export default Dashboard;
