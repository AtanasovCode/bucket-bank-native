import React from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { formatMoney, getProgress } from '../Utils';
import { theme } from '../../Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';



const DashboardItem = ({
    navigation,
    id,
    name,
    goal,
    saved,
}) => {

    const saveID = async (id) => {
        try {
            const jsonValue = JSON.stringify(id);
            await AsyncStorage.setItem("selectedId", jsonValue);
        } catch (e) {
            console.log(e);
        } finally {
            navigation.navigate("Bucket");
        }
    }

    return (
        <TouchableHighlight
            style={[styles.container]}
            onPress={() => {
                saveID(id)
            }}>
            <View>
                <View style={styles.itemContainer}>
                    <Text style={[
                        styles.name,
                        { color: theme.text }
                    ]}>
                        {name}
                    </Text>
                    <Text
                        style={[
                            styles.saved,
                            { color: theme.money }
                        ]}
                    >
                        {formatMoney(saved)} $
                    </Text>
                </View>
                <View style={[styles.progressContainer]}>
                    <View style={[styles.progressBar, { backgroundColor: theme.inactive }]}>
                        <View style={[styles.progress, { width: getProgress(saved, goal), backgroundColor: theme.accent }]}></View>
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: "5%",
        flexDirection: 'column',
        padding: "5%",
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    name: {
        fontSize: 16,
        textAlign: 'left',
    },
    saved: {
        fontSize: 16,
        color: 'blue',
        textAlign: 'right',
        fontFamily: "monospace"
    },
    progressContainer: {
        marginTop: "4%",
    },
    progressBar: {
        padding: 2,
        borderRadius: 12,
        position: "relative",
        overflow: "hidden",
    },
    progress: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        borderRadius: 12,
    },
});

export default DashboardItem;
