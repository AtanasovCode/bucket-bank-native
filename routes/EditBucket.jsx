import React, { useState, useEffect, useRef } from "react";
import {
    View,
    Text,
    TouchableHighlight,
    TextInput,
    Alert,
    Modal,
    Dimensions,
    StyleSheet,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;


const EditBucket = ({ navigation }) => {

    const { colors, dark } = useTheme();
    const theme = colors;

    const [selectedID, setSelectedID] = useState();
    const [bucket, setBucket] = useState({});
    const [name, setName] = useState("");
    const [goal, setGoal] = useState("");
    const [inputs, setInputs] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const firstInputRef = useRef(null);
    const secondInputRef = useRef(null);

    const checkInputs = () => {
        name && goal ? setInputs(true) : setInputs(false);
    }

    useEffect(() => {
        checkInputs();
    }, [name, goal])

    const getID = async () => {
        try {
            const value = await AsyncStorage.getItem("selectedId")
            if (value !== null) {
                const parsedValue = JSON.parse(value);
                setSelectedID(parsedValue);
            }
        } catch (e) {
            console.log(e);
        }
    }

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem("buckets");
            if (value !== null) {
                const parsedValue = JSON.parse(value);
                const selectedBucket = parsedValue.find((item) => item.id === selectedID);

                setBucket(selectedBucket);
            }
        } catch (e) {
            console.log("Error getting data");
        }
    }

    useEffect(() => {
        getID();
    }, [])

    useEffect(() => {
        selectedID && getData();
    }, [selectedID])

    useEffect(() => {
        setName(bucket.name);
        setGoal(bucket.goal);
    }, [bucket])


    const showAlert = () => {
        Alert.alert(
            'Delete Bucket',
            'Are you sure you want to delete this bucket?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: () => {
                        navigation.navigate({
                            name: "Dashboard",
                            params: { delete: true, id: selectedID },
                            merge: true,
                        })
                    },
                    style: 'delete',
                },
            ],
            {
                cancelable: true,
            },
        );
    }

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background, height: height }]}>
            <Modal
                animationType="fade"
                visible={modalVisible}
                transparent={true}
                style={{ alignItem: "center", justifyContent: "center" }}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={[styles.modalContainer]}>
                    <View style={[styles.modalWrapper, { backgroundColor: theme.inactive }]}>
                        <Text style={[styles.title, { color: theme.light }]}>Delete Bucket</Text>
                        <Text style={[styles.modalDescription, { color: theme.light }]}>
                            Are you sure you want to delete bucket
                            <Text style={[styles.bucketName, { color: theme.text }]}> {bucket.name}</Text>?
                        </Text>

                        <View style={styles.modalChoices}>
                            <TouchableHighlight style={styles.modalOption}>
                                <View style={[styles.modalOption]}>
                                    <MaterialCommunityIcons name="cancel" size={24} color={theme.light} />
                                    <Text style={{ color: theme.light }}>Cancel</Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.modalOption}>
                                <View style={[styles.modalOption]}>
                                    <MaterialIcons name="delete" size={24} color={theme.red} />
                                    <Text style={{ color: theme.light }}>Delete</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </Modal>
            <View style={[styles.infoWrapper]}>
                <Header
                    navigation={navigation}
                    back={true}
                />
                <Text style={[styles.title, { color: theme.light }]}>Edit Bucket</Text>
                <View>
                    <View style={[styles.wrapper]}>
                        <Text style={[styles.label, { color: theme.light }]}>
                            Bucket Name
                        </Text>
                        <TextInput
                            style={[styles.input, { backgroundColor: theme.inactive, color: theme.text }]}
                            value={name}
                            placeholder="Enter name"
                            placeholderTextColor={theme.light}
                            ref={firstInputRef}
                            returnKeyType="next"
                            onSubmitEditing={() => {
                                secondInputRef.current.focus();
                            }}
                            onChangeText={(value) => {
                                setName(value)
                            }}
                        />
                    </View>
                    <View style={[styles.wrapper]}>
                        <Text style={[styles.label, { color: theme.light }]}>
                            Goal
                        </Text>
                        <TextInput
                            style={[styles.input, {
                                backgroundColor: theme.inactive, fontFamily: "monospace", color: theme.text
                            }]}
                            value={goal}
                            placeholder="Enter goal"
                            keyboardType="numeric"
                            placeholderTextColor={theme.light}
                            ref={secondInputRef}
                            onChangeText={(value) => {
                                setGoal(value)
                            }}
                        />
                    </View>
                    <View style={[styles.wrapper]}>
                        <Text style={[styles.label, { color: theme.light }]}>
                            Finished saving?
                        </Text>
                        <TouchableHighlight
                            style={[styles.save, { backgroundColor: theme.inactive }]}
                            onPress={() => {
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <Text style={{ color: theme.red }}>
                                Delete Bucket
                            </Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
            <View style={[styles.saveContainer]}>
                <TouchableHighlight
                    style={[styles.save, { backgroundColor: inputs ? theme.accent : theme.inactive }]}
                    onPress={() => {
                        if (inputs) {
                            navigation.navigate({
                                name: "Bucket",
                                params: { name: name, goal: goal },
                                merge: true,
                            })
                        }
                    }}
                >
                    <Text style={{ color: inputs ? theme.white : theme.light }}>
                        Save
                    </Text>
                </TouchableHighlight>
            </View>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
    },
    infoWrapper: {},
    title: {
        fontSize: 18,
        marginBottom: "10%",
        textAlign: "center",
    },
    wrapper: {
        marginBottom: "8%",
        marginLeft: "6%",
        marginRight: "6%",
    },
    input: {
        padding: 10,
        paddingLeft: 26,
        paddingRight: 26,
        borderRadius: 16,
        fontSize: 14,
        fontFamily: "sans-serif",
    },
    label: {
        fontSize: 14,
        textAlign: "left",
        marginBottom: 12,
    },
    deleteContainer: {
        marginLeft: "6%",
        marginRight: "6%",
        marginBottom: "10%",
    },
    saveContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "6%",
        marginRight: "6%",
        marginBottom: "10%",
    },
    save: {
        alignItems: "center",
        justifyContent: 'center',
        padding: 18,
        paddingLeft: 26,
        paddingRight: 26,
        width: "100%",
        borderRadius: 16,
    },
    modalContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, .5)"
    },
    modalWrapper: {
        padding: "10%",
        width: width * 0.75,
        borderRadius: 16,
        borderWidth: 1,
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

export default EditBucket;