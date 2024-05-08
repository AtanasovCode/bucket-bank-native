import React, { useEffect } from "react";
import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
} from "react-native";
import { StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { theme } from "../Colors";


const Dashboard = () => {

    const [loading, setLoading] = useState(true);
    const [buckets, setBuckets] = useState([]);
    const [name, setName] = useState("");
    const [goal, setGoal] = useState("");

    const saveData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem("buckets", jsonValue)
        } catch (e) {
            console.log(e)
        }
    }

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
        } finally {
            setLoading(false);
        }
    }

    const saveBucket = (name, goal) => {
        const savedBucket = {
            name: name,
            goal: goal,
        }

        setBuckets([savedBucket, ...buckets])
    }

    useEffect(() => {
        getData()
        console.log("Get data effect active")
    }, [])

    useEffect(() => {
        console.log(buckets);
        saveData(buckets);
    }, [buckets])

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <TextInput
                style={{ padding: 15, color: "#fff", backgroundColor: "#383535", margin: 24, }}
                value={name}
                placeholder="Name"
                placeholderTextColor={"#ada6a6"}
                onChangeText={(value) => {
                    setName(value)
                }}
            />
            <TextInput
                style={{ padding: 15, color: "#fff", backgroundColor: "#383535", margin: 24, }}
                value={goal}
                placeholder="Goal"
                placeholderTextColor={"#ada6a6"}
                onChangeText={(value) => {
                    setGoal(value)
                }}
            />

            <Button
                title="Save Bucket"
                onPress={() => {
                    saveBucket(name, goal)
                }}
            />

            <Text style={{color: "#fff"}}>
                {name}
            </Text>

            <View style={{ margin: 24 }}>
                {
                    loading ?
                        <Text style={{ color: "#fff" }}>Loading...</Text>
                        :
                        buckets.map((bucket) => {
                            return (
                                <View key={bucket.name} style={{ marginBottom: 26 }}>
                                    <Text style={{ color: "#fff" }}>
                                        {bucket.name}
                                    </Text>
                                    <Text style={{ color: "#fff" }}>
                                        {bucket.goal}
                                    </Text>
                                </View>
                            )
                        })
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default Dashboard;