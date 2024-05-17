import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { formatMoney } from '../Utils';

const DataItem = ({ iconComponent, text, theme, flex, total, currency }) => {
    return (
        <View style={[styles.dataWrapper, { backgroundColor: theme.inactive, flex: flex }]}>
            <View style={styles.dataTitle}>
                {iconComponent}
                <Text style={{ color: theme.light }}>{text}</Text>
            </View>
            <Text style={[styles.total, { color: theme.light }]}>
                {
                    currency ? `${formatMoney(total)} ${currency}` : (total)
                }
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    dataWrapper: {
        padding: "5%",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
    },
    dataTitle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "5%",
        gap: 10,
    },
    total: {
        fontSize: 20,
        textAlign: "center",
    },
});

export default DataItem;
