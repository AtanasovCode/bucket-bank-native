import { View, TouchableHighlight, Image, useColorScheme } from "react-native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Dimensions } from "react-native";
import { lightTheme, darkTheme } from "../Colors";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const height = Dimensions.get("window").height;

const Header = ({
    navigation,
    back,
    edit,
    settings,
}) => {

    const colorScheme = useColorScheme();

    const theme = colorScheme === "light" ? lightTheme : darkTheme;

    return (
        <View style={[styles.container, { height: height * 0.16, backgroundColor: theme.background }]}>
            <StatusBar style="dark" />
            {
                back &&
                <TouchableHighlight
                    style={[styles.back]}
                    onPress={() => {
                        navigation.goBack();
                    }}
                >
                    <MaterialCommunityIcons
                        name="arrow-left"
                        size={28}
                        color={colorScheme === "light" ? "#000" : "#FFF"}
                    />
                </TouchableHighlight>
            }
            {
                settings &&
                <TouchableHighlight
                    style={[styles.settings]}
                    onPress={() => {
                        navigation.navigate("Settings")
                    }}
                >
                    <Ionicons
                        name="settings-sharp"
                        size={28}
                        color={colorScheme === "light" ? "#000" : "#FFF"}
                    />
                </TouchableHighlight>
            }
            <Image
                source={
                    colorScheme === "light" ?
                        require("../assets/logo-dark.png")
                        :
                        require("../assets/logo.png")
                }
            />
            {
                edit &&
                <TouchableHighlight
                    style={[styles.edit]}
                    onPress={() => {

                    }}
                >
                    <MaterialCommunityIcons 
                        name="circle-edit-outline" 
                        size={28} 
                        color={colorScheme === "light" ? "#000" : "#FFF"} 
                    />
                </TouchableHighlight>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },
    back: {
        position: "absolute",
        left: "6%",
    },
    settings: {
        position: "absolute",
        left: "6%",
    },
    edit: {
        position: "absolute",
        right: "6%",
    },
})

export default Header;