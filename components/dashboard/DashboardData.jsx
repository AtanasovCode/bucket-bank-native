import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Entypo, FontAwesome5, FontAwesome6, FontAwesome } from '@expo/vector-icons';
import DataItem from './DataItem'; // Assuming DataItem is in the same directory

const DashboardData = ({ theme, buckets, currency }) => {

    const getValue = (value) => {
        let total = 0;
        let complete = 0;
        let uncomplete = 0;

        buckets.map((bucket) => {
            total += bucket.saved;
            if(bucket.complete) complete++;
            if(!bucket.complete) uncomplete++;
        })

        return value === "total" ? total : value === "complete" ? complete : uncomplete;
    }

    return (
        <View style={[styles.container, {backgroundColor: theme.background}]}>
            <Text style={[styles.title, { color: theme.light }]}>Dashboard</Text>
            <View style={styles.wrapper}>
                <DataItem
                    iconComponent={<FontAwesome6 name="vault" size={24} color={theme.light} />}
                    text="Total Saved:"
                    theme={theme}
                    flex= {1.4}
                    total={getValue("total")}
                    currency={currency}
                />
                <DataItem
                    iconComponent={<Entypo name="bucket" size={24} color={theme.light} />}
                    text="Total Buckets"
                    theme={theme}
                    flex= {1}
                    total={buckets.length}
                />
            </View>
            <View style={styles.wrapper}>
                <DataItem
                    iconComponent={<FontAwesome name="th-list" size={24} color={theme.light} />}
                    text="Remaining"
                    theme={theme}
                    flex= {1}
                    total={getValue("uncomplete")}
                />
                <DataItem
                    iconComponent={<FontAwesome5 name="check-double" size={24} color={theme.light} />}
                    text="Complete"
                    theme={theme}
                    flex= {1.4}
                    total={getValue("complete")}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: "4%",
    },
    wrapper: {
        flexDirection: "row",
        gap: 10,
        marginBottom: 10,
    },
    title: {
        fontSize: 20,
        textAlign: "center",
        marginBottom: "5%",
    },
});

export default DashboardData;
