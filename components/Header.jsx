import { View, TouchableHighlight, Image } from "react-native";
import { StyleSheet, Dimensions } from "react-native";
import { theme } from "../Colors";

const height = Dimensions.get("window").height;

const Header = ({
    navigation,
    back,
    edit,
    settings,
}) => {
    return (
        <View style={[styles.container, { height: height * 0.16 }]}>
            {
                back &&
                <TouchableHighlight
                    style={[styles.back]}
                    onPress={() => {
                        navigation.goBack();
                    }}
                >
                    <Image
                        source={require("../assets/back.png")}
                        style={{ width: 25, height: 25 }}
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
                    <Image
                        source={require("../assets/setting.png")}
                        style={{ width: 25, height: 25 }}
                    />
                </TouchableHighlight>
            }
            <Image
                source={require("../assets/logo.png")}
            />
            {
                edit &&
                <TouchableHighlight
                    style={[styles.edit]}
                    onPress={() => {

                    }}
                >
                    <Image
                        source={require("../assets/setting.png")}
                        style={{ width: 25, height: 25 }}
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