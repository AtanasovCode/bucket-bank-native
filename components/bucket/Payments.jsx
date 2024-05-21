import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableHighlight,
    ScrollView,
    Modal,
} from "react-native";
import { StyleSheet, Dimensions } from "react-native";
import { formatMoney } from "../Utils";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Add from "../Add";
import Popover from "react-native-popover-view/dist/Popover";

const width = Dimensions.get("window").width;

const Payments = ({ navigation, bucket, theme }) => {

    const [currency, setCurrency] = useState("$");
    const [modalVisible, setModalVisible] = useState(false);
    const [visiblePopoverId, setVisiblePopoverId] = useState(null);

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem("currency");
            if (value !== null) {
                const parsedValue = JSON.parse(value);
                setCurrency(parsedValue);
            }
        } catch (e) {
            console.log("Error getting data:", e);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const parseLocaleDateString = (dateString) => {
        const [day, month, year] = dateString.split('/').map(Number);
        return new Date(year, month - 1, day);
    };

    const sortedPayments = bucket.payments
        ? [...bucket.payments].sort((a, b) => parseLocaleDateString(b.date).getTime() - parseLocaleDateString(a.date).getTime())
        : [];

    return (
        <View style={[styles.container, { width: width }]}>
            <View style={[styles.wrapper]}>
                <MaterialCommunityIcons
                    name="history"
                    size={24}
                    color={theme.light}
                />
                <Text style={[styles.text, { color: theme.light }]}>
                    History
                </Text>
            </View>
            <View style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1 }}>
                    {bucket.payments && bucket.payments.length > 0 ? (
                        sortedPayments.map((item) => (
                            <View key={item.id} style={[styles.paymentContainer]}>
                                <View style={[styles.paymentWrapper]}>
                                    {
                                        item.withdrawal ?
                                            <MaterialCommunityIcons
                                                name="bank-minus"
                                                size={22}
                                                color={theme.red}
                                            />
                                            :
                                            <MaterialCommunityIcons
                                                name="bank-plus"
                                                size={22}
                                                color={theme.money}
                                            />
                                    }
                                    <Text style={[styles.text, { color: theme.text }]}>{item.date}</Text>
                                </View>
                                <View style={[styles.paymentWrapper, { gap: 12 }]}>
                                    <Text style={[styles.text, { color: item.withdrawal ? theme.red : theme.money, fontFamily: "monospace" }]}>
                                        {item.withdrawal ? "-" : "+"} {formatMoney(item.amount)} {currency}
                                    </Text>
                                    <Popover
                                        popoverStyle={{
                                            backgroundColor: theme.inactive,
                                            borderRadius: 12,
                                        }}
                                        arrowSize={{ width: 26, height: 22 }}
                                        isVisible={visiblePopoverId === item.id}
                                        onRequestClose={() => setVisiblePopoverId(null)}
                                        from={(
                                            <TouchableHighlight
                                                style={[styles.editIconContainer]}
                                                onPress={() => setVisiblePopoverId(item.id)}
                                            >
                                                <Entypo
                                                    name="dots-three-vertical"
                                                    size={16}
                                                    color={theme.light}
                                                />
                                            </TouchableHighlight>
                                        )}
                                    >
                                        <View style={[styles.moreInfo]}>
                                            <TouchableHighlight style={[styles.info]}>
                                                <View style={[styles.moreInfoWrapper]}>
                                                    <Feather name="edit-3" size={20} color={theme.light} />
                                                    <Text style={[{ color: theme.light }]}>Edit</Text>
                                                </View>
                                            </TouchableHighlight>
                                            <TouchableHighlight
                                                style={[styles.info]}
                                                onPress={() => {
                                                    setModalVisible(!modalVisible);
                                                }}
                                            >
                                                <View style={[styles.moreInfoWrapper]}>
                                                    <MaterialIcons name="delete" size={20} color={theme.red} />
                                                    <Text style={[{ color: theme.light }]}>Delete</Text>
                                                </View>
                                            </TouchableHighlight>
                                        </View>
                                    </Popover>
                                </View>
                            </View>
                        ))
                    ) : (
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 22 }}>
                            <AntDesign
                                name="minuscircle"
                                size={24}
                                color={theme.light}
                            />
                            <Text style={{ color: theme.light, fontSize: 14 }}>
                                No payments found
                            </Text>
                        </View>
                    )}
                </ScrollView>
                <Add
                    navigation={navigation}
                    theme={theme}
                    screen="Payment"
                />
            </View>
            <Modal
                animationType="fade"
                visible={modalVisible}
                transparent={true}
                style={{ alignItems: "center", justifyContent: "center" }}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={[styles.modalContainer]}>
                    <View style={[styles.modalWrapper, { backgroundColor: theme.inactive }]}>
                        <Text style={[styles.modalTitle, { color: theme.light }]}>Delete Payment</Text>
                        <Text style={[styles.modalDescription, { color: theme.light }]}>
                            Are you sure you want to delete the payment made on
                            <Text style={[styles.bucketName, { color: theme.text }]}>
                                {sortedPayments.find((item) => item.id === visiblePopoverId)?.date || "N/A"}
                            </Text>,
                            payment amount
                            <Text style={[styles.bucketName, { color: theme.text }]}>
                                {formatMoney(sortedPayments.find((item) => item.id === visiblePopoverId)?.amount || 0)} {currency}
                            </Text>
                        </Text>

                        <View style={styles.modalChoices}>
                            <TouchableHighlight
                                style={styles.modalOption}
                                onPress={() => {
                                    setModalVisible(!modalVisible);
                                    setVisiblePopoverId(null);
                                }}
                            >
                                <View style={[styles.modalOption]}>
                                    <MaterialCommunityIcons name="cancel" size={20} color={theme.light} />
                                    <Text style={{ color: theme.light }}>Cancel</Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={styles.modalOption}
                                onPress={() => {}}
                            >
                                <View style={[styles.modalOption]}>
                                    <MaterialIcons name="delete" size={20} color={theme.red} />
                                    <Text style={{ color: theme.light }}>Delete</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </Modal>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        marginBottom: "10%",
    },
    text: {
        fontSize: 14,
    },
    paymentContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: "7%",
        marginLeft: "6%",
        marginRight: "6%",
    },
    paymentWrapper: {
        flexDirection: "row",
        gap: 18,
        alignItems: "center",
    },
    title: {},
    editIconContainer: {
        padding: 6,
        borderRadius: 12,
    },
    addContainer: {
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "4%",
        paddingBottom: "4%",
    },
    add: {
        padding: "3.5%",
        borderRadius: 50,
    },
    moreInfo: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        width: width * 0.5,
    },
    info: {
        flex: 1,
        padding: "5%",
        paddingVertical: "8%",
    },
    moreInfoWrapper: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 6,
    },
    modalContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, .2)"
    },
    modalWrapper: {
        paddingTop: "10%",
        paddingBottom: "10%",
        paddingLeft: "5%",
        paddingRight: "5%",
        width: width * 0.75,
        borderRadius: 16,
        borderWidth: 1,
    },
    modalTitle: {
        fontSize: 18,
        textAlign: "center",
        marginBottom: "5%",
    },
    modalDescription: {
        textAlign: "center",
    },
    bucketName: {
        fontWeight: "500",
    },
    modalChoices: {
        flexDirection: "row",
        gap: 16,
        marginTop: "10%",
        alignItems: "center",
        justifyContent: "flex-end",
    },
    modalOption: {
        flexDirection: "row",
        gap: 6,
        alignItems: "center",
        justifyContent: "center",
    },
})

export default Payments;
