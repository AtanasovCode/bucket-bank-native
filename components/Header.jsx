import { View, TouchableHighlight, Image } from "react-native";
import { StyleSheet, Dimensions } from "react-native";

const height = Dimensions.get("window").height;

const Header = ({navigation}) => {
    return (
        <View style={[styles.container, {height: height * 0.16}]}>
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
})

export default Header;