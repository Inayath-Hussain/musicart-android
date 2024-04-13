import { StyleProp, StyleSheet, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import RobotoText from "./Roboto/Text";



interface Iprops {
    buttonStyle?: StyleProp<ViewStyle>
    textStyle?: StyleProp<TextStyle>

    handlePress: () => void
}

const BuyNowButton: React.FC<Iprops> = ({ textStyle = {}, buttonStyle = {}, handlePress }) => {
    return (
        <TouchableWithoutFeedback onPress={handlePress}>
            <View style={[styles.button, buttonStyle]}>
                <RobotoText style={[styles.buttonText, textStyle]}>Buy Now</RobotoText>
            </View>
        </TouchableWithoutFeedback>
    );
}


const styles = StyleSheet.create({
    button: {
        backgroundColor: "#FFB800",
        paddingVertical: 7,
        borderRadius: 8,

        justifyContent: "center",
        alignItems: "center"
    },


    buttonText: {
        fontSize: 20
    }
})


export default BuyNowButton;