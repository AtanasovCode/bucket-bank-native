import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { formatMoney } from '../Utils';

const DataItem = ({ iconComponent, text, theme, flex, total, currency }) => {
    return (
        <View className="p-[5%] items-center justify-center rounded-xl" style={{ backgroundColor: theme.inactive, flex: flex}}>
            <View className="flex-row items-center justify-center mb-[5%] gap-2">
                {iconComponent}
                <Text style={{ color: theme.light }}>{text}</Text>
            </View>
            <Text className="text-xl text-center" style={{ color: theme.light }}>
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
