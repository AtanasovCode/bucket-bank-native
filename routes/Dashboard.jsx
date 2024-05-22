import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Dimensions,
    TouchableHighlight,
    useColorScheme,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";
import Header from "../components/Header";
import DashboardItem from "../components/dashboard/DashboardItem";
import DashboardData from "../components/dashboard/DashboardData";
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Add from "../components/Add";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Dashboard = ({ navigation, route }) => {
    const colorScheme = useColorScheme();
    const { colors, dark } = useTheme();
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
            console.log("Error saving data:", e);
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

    //useEffect(() => {clearAsyncStorage()}, [])

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
    }, []);

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
                        setBuckets(updatedBuckets);
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
    }, [route.params?.delete, route.params?.id]);

    const renderItem = ({ item }) => (
        <DashboardItem
            id={item.id}
            name={item.name}
            goal={item.goal}
            saved={item.saved}
            navigation={navigation}
            theme={theme}
            currency={currency}
        />
    );

    const ListEmptyComponent = () => (
        <View style={[styles.emptyContainer]}>
            <Entypo name="bucket" size={24} color={theme.light} />
            <Text style={[{ color: theme.light }]}>No buckets found</Text>
        </View>
    );


    return (
        <SafeAreaView style={[styles.container, { minHeight: height, width: width }]}>
            <StatusBar style={dark ? "light" : "dark"} />
            <View style={styles.headerContainer}>
                <Header settings={true} navigation={navigation} />
            </View>
            <TouchableHighlight
                style={[styles.settings]}
                onPress={() => {
                    navigation.navigate("Settings")
                }}
            >
                <Ionicons
                    name="settings-sharp"
                    size={25}
                    color={theme.light}
                />
            </TouchableHighlight>
            <FlatList
                contentContainerStyle={[styles.contentContainer]}
                style={[styles.bucketsWrapper, {}]}
                data={buckets}
                renderItem={renderItem}
                ListEmptyComponent={loading ? <Text>Loading...</Text> : <ListEmptyComponent />}
                keyExtractor={(item) => item.id.toString()}
                ListHeaderComponent={
                    <>
                        <DashboardData buckets={buckets} currency={currency} theme={theme} />
                        <Text style={[styles.title, { color: theme.light, backgroundColor: theme.background }]}>Buckets</Text>
                    </>
                }
                ListFooterComponent={<View style={{ height: 100 }} />} // Placeholder for footer space
                stickyHeaderIndices={[0]} // Make DashboardData sticky
            />
            <Add
                navigation={navigation}
                theme={theme}
                screen="Input"
                style={styles.addButton}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        paddingTop: "5%",
        zIndex: 1,
    },
    settings: {
        position: "absolute",
        left: "6%",
        top: "6%",
        zIndex: 10,
    },
    contentContainer: {
        paddingTop: height * 0.16,
        width: '100%',
    },
    bucketsWrapper: {
        flex: 1,
        paddingLeft: "6%",
        paddingRight: "6%",
        width: width,
        zIndex: 3,
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
    addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
});

export default Dashboard;