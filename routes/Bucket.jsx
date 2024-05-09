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


const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Bucket = ({navigation}) => {

    const [selectedID, setSelectedID] = useState();
    const [bucket, setBucket] = useState({});

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
        console.log("Getting ID");
    }, [])

    useEffect(() => {
        getData();
        console.log(`Got ID: ${selectedID}`);
        console.log("Getting Data");
    }, [selectedID])

    useEffect(() => {
        console.log(`Got Data: ${bucket}`)
    }, [bucket])

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background, width: width }]}>
            <Header navigation={navigation} back={true} />
            {
                bucket ?
                    <View style={[styles.container]}>
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
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
})

export default Bucket;