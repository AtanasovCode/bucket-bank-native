import React from "react";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    View,
    Text,
    Image,
    TouchableHighlight,
} from "react-native";


const Bucket = () => {

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
                console.log(selectedBucket);

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
        <View style={{ flex: 1, backgroundColor: "#000", paddingTop: 64 }}>
            {
                bucket ?
                    <Text style={{ color: "#fff" }}>
                        {bucket.name}
                    </Text>
                    :
                    <Text style={{ color: "#fff" }}>
                        Loading...
                    </Text>
            }
        </View>
    );
}

export default Bucket;