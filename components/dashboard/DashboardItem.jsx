import React from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { formatMoney, formatName } from '../Utils';
import { theme } from '../../Colors';



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
            await AsyncStorage.setItem("selectedId", id);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <TouchableHighlight
            style={[styles.container, {backgroundColor: theme.inactive}]}
            onPress={() => {
                saveID(id)
            }}>
            <View style={styles.itemContainer}>
                <Text style={[
                    styles.name,
                    {color: theme.text}
                ]}>
                    {name}
                </Text>
                <Text 
                    style={[
                        styles.saved,
                        {color: theme.money}
                    ]}
                >
                    {formatMoney(saved)} $
                </Text>
            </View>
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: "5%",
        flexDirection: 'column',
        padding: 26,
        borderRadius: 15,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    name: {
        fontSize: 20,
        color: 'black',
        textAlign: 'left',
    },
    saved: {
        fontSize: 20,
        color: 'blue',
        textAlign: 'right',
        fontFamily: "monospace"
    },
});

export default DashboardItem;
