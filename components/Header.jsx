import { View, TouchableHighlight, Image } from "react-native";
import { StyleSheet, Dimensions } from "react-native";
import { Ionicons } from '@expo/vector-icons';

const height = Dimensions.get("window").height;

const Header = ({
    navigation,
    back,
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
                    <Ionicons name="arrow-back" size={28} color="#FFF" />
                </TouchableHighlight>
            }
            <Image
                source={require("../assets/logo.png")}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        marginBottom: 26,
    },
    back: {
        position: "absolute",
        left: 22,
    },
})

export default Header;