import { StyleProp, StyleSheet, TextStyle, View, ViewStyle } from "react-native";
import RobotoText from "./Roboto/Text";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { colors } from "@src/config/color";


interface Iprops {
    text: string
    handlePress: () => void

    textStyle?: StyleProp<TextStyle>
    buttonStyle?: StyleProp<ViewStyle>
}

const SecondaryButton: React.FC<Iprops> = ({ text, textStyle, buttonStyle, handlePress }) => {
    return (
        <TouchableWithoutFeedback onPress={handlePress}>
            <View style={[styles.button, buttonStyle]}>
                <RobotoText style={[styles.text, textStyle]}>{text}</RobotoText>
            </View>
        </TouchableWithoutFeedback>
    );
}


const styles = StyleSheet.create({

    button: {
        alignItems: "center",

        paddingVertical: 10,
        borderRadius: 8,
        backgroundColor: colors.secondaryColor,
    },

    text: {
        fontSize: 20
    }
})

export default SecondaryButton;