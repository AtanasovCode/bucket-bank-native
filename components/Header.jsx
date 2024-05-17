import { View, TouchableHighlight, Image, useColorScheme } from "react-native";
import { useTheme } from "@react-navigation/native";
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

    const { colors, dark } = useTheme();
    const theme = colors;

    return (
        <View style={[styles.container, { height: height * 0.16, backgroundColor: theme.background }]}>
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
                        color={dark ? "#fff" : "#000"}
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
                        size={25}
                        color={dark ? "#fff" : "#000"}
                    />
                </TouchableHighlight>
            }
            <Image
                source={
                    dark ?
                        require("../assets/logo.png")
                        :
                        require("../assets/logo-dark.png")
                }
            />
            {
                edit &&
                <TouchableHighlight
                    style={[styles.edit]}
                    onPress={() => {
                        navigation.navigate("Edit")
                    }}
                >
                    <MaterialCommunityIcons
                        name="circle-edit-outline"
                        size={28}
                        color={dark ? "#fff" : "#000"}
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