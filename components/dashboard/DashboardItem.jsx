import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
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
        <TouchableOpacity
            style={styles.container}
            onPress={() => {
                saveID(id)
            }}>
            <View style={styles.itemContainer}>
                <Text style={[
                    styles.name,
                    {color: theme.white}
                ]}>
                    {name}
                </Text>
                <Text 
                    style={[
                        styles.saved,
                        {color: theme.accent}
                    ]}
                >
                    {formatMoney(saved)} $
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 12,
        flexDirection: 'column',
        padding: 26,
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
