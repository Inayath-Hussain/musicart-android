import { StyleProp, StyleSheet, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import RobotoText from "./Roboto/Text";
import { colors } from "@src/config/color";



interface Iprops {
    text: string
    handlePress: () => void
    disabled?: boolean

    buttonStyle?: StyleProp<ViewStyle>
    textStyle?: StyleProp<TextStyle>
}

const PrimaryButton: React.FC<Iprops> = ({ text, handlePress, buttonStyle = {}, textStyle = {}, disabled = false }) => {
    return (
        <TouchableWithoutFeedback onPress={handlePress} disabled={disabled}>
            <View style={[styles.button, buttonStyle]} >
                <RobotoText style={[styles.text, textStyle]}>{text}</RobotoText>
            </View>
        </TouchableWithoutFeedback>
    );
}



const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primaryColor,
        paddingVertical: 8,

        alignItems: "center",

        borderRadius: 5
    },


    text: {
        color: colors.white,
        fontSize: 18
    }

})


export default PrimaryButton;