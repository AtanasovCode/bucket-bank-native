import React, { useEffect, useState } from "react";
import { 
    View,
    ScrollView,
    Text, 
    TouchableHighlight, 
    Image,
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

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Dashboard = ({ navigation }) => {

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
                    <Image source={require("../assets/plus.png")} style={{ height: 20, width: 20 }} />
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
