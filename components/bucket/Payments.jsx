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

const Payments = ({ navigation, bucket, setBucket, theme }) => {

    const [buckets, setBuckets] = useState();
    const [currency, setCurrency] = useState("$");
    const [modalVisible, setModalVisible] = useState(false);
    const [visiblePopoverId, setVisiblePopoverId] = useState(null);
    const [visiblePopover, setVisiblePopover] = useState(false);

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

    const getBuckets = async () => {
        try {
            const value = await AsyncStorage.getItem("buckets");
            if (value !== null) {
                const parsedValue = JSON.parse(value);
                setBuckets(parsedValue);
            }
        } catch (e) {
            console.log("Error getting data:", e);
        }
    };

    useEffect(() => {
        getData();
        getBuckets();
    }, []);

    const parseLocaleDateString = (dateString) => {
        const [day, month, year] = dateString.split('/').map(Number);
        return new Date(year, month - 1, day);
    };

    const sortedPayments = bucket.payments
        ? [...bucket.payments].sort((a, b) => parseLocaleDateString(b.date).getTime() - parseLocaleDateString(a.date).getTime())
        : [];

    const saveData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem("buckets", jsonValue)
        } catch (e) {
            console.log(e)
        }
    }

    const deletePayment = async (id) => {
        // Find the bucket with the selectedID (you need to ensure selectedID is available in your scope)
        const selectedID = bucket.id;  // Assuming bucket is passed as a prop and has an id field

        // Filter out the payment with the given id
        const updatedPayments = bucket.payments.filter((item) => item.id !== id);
        const paymentToDelete = bucket.payments.find((item) => item.id === id);

        if (!paymentToDelete) {
            console.error("Payment not found");
            return;
        }

        // Create the updated bucket object
        const updatedBucket = {
            ...bucket,
            saved: paymentToDelete.withdrawal ?
                parseFloat(bucket.saved) + parseFloat(paymentToDelete.amount)
                :
                parseFloat(bucket.saved) - parseFloat(paymentToDelete.amount)
            ,
            payments: updatedPayments,
        };

        // Update the bucket within the buckets array
        const updatedBuckets = buckets.map((bucket) =>
            bucket.id === selectedID ? updatedBucket : bucket
        );

        saveData(updatedBuckets);
        setBucket(updatedBucket);
        setBuckets(updatedBuckets);  // Update state with new buckets
    };


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
                    {sortedPayments && sortedPayments.length > 0 ? (
                        sortedPayments.map((item) => (
                            <TouchableHighlight
                                key={item.id} style={{ flex: 1, marginBottom: "4%" }}
                                onLongPress={() => {
                                    setVisiblePopover(true);
                                    setVisiblePopoverId(item.id);
                                }}
                            >
                                <View style={[styles.paymentContainer]}>
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
                                            arrowSize={{ width: 20, height: 12 }}
                                            isVisible={visiblePopoverId === item.id && visiblePopover ? true : false}
                                            onRequestClose={() => {
                                                setVisiblePopoverId(null);
                                                setVisiblePopover(false);
                                            }}
                                            from={(
                                                <TouchableHighlight
                                                    style={[styles.editIconContainer]}
                                                    onPress={() => {
                                                        setVisiblePopoverId(item.id);
                                                        setVisiblePopover(true);
                                                    }}
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
                                                <TouchableHighlight
                                                    style={[styles.info]}
                                                    onPress={() => {
                                                        setVisiblePopover(false);
                                                        setVisiblePopoverId(null);

                                                        navigation.navigate({
                                                            name: "Payment",
                                                            params: {
                                                                edit: true,
                                                                id: item.id,
                                                                date: item.date,
                                                                amount: item.amount,
                                                                withdrawal: item.withdrawal
                                                            },
                                                            merge: true,
                                                        })
                                                    }}
                                                >
                                                    <View style={[styles.moreInfoWrapper]}>
                                                        <Feather name="edit-3" size={20} color={theme.light} />
                                                        <Text style={[{ color: theme.light }]}>Edit</Text>
                                                    </View>
                                                </TouchableHighlight>
                                                <TouchableHighlight
                                                    style={[styles.info]}
                                                    onPress={() => {
                                                        setModalVisible(!modalVisible);
                                                        setVisiblePopover(false);
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
                            </TouchableHighlight>
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
                            <Text style={[styles.bucketName, { color: theme.text }]}> {sortedPayments.find((item) => item.id === visiblePopoverId)?.date || "N/A"} </Text>,
                            payment amount
                            <Text style={[styles.bucketName, { color: theme.text }]}> {sortedPayments.find((item) => item.id === visiblePopoverId)?.withdrawal ? "-" : ""}{formatMoney(sortedPayments.find((item) => item.id === visiblePopoverId)?.amount || 0)} {currency}</Text>
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
                                onPress={() => {
                                    deletePayment(visiblePopoverId);
                                    setModalVisible(false);
                                    setVisiblePopoverId(null);
                                }}
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
        paddingVertical: "8%",
        paddingHorizontal: "4%",
        width: width * 0.75,
        borderRadius: 16,
        borderWidth: 1,
    },
    modalTitle: {
        fontSize: 22,
        textAlign: "center",
        marginBottom: "5%",
    },
    modalDescription: {
        textAlign: "center",
        fontSize: 14,
    },
    bucketName: {
        fontWeight: "500",
    },
    modalChoices: {
        flexDirection: "row",
        marginTop: "10%",
        alignItems: "center",
        justifyContent: "flex-end",
    },
    modalOption: {
        flexDirection: "row",
        gap: 6,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "5%",
    },
})

export default Payments;