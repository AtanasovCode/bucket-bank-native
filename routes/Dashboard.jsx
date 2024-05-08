import React from "react";
import { 
    View,
    Text, 
} from "react-native";
import { StyleSheet } from "react-native";
import { theme } from "../Colors";


const Dashboard = () => {
    return (
        <View style={[styles.container, {backgroundColor: theme.background}]}>
            <Text style={[{color: theme.white}]}>Dashboard</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default Dashboard;