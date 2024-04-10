import { StyleProp, StyleSheet, Text, TextStyle, TextProps } from "react-native";
import { fonts } from "../../../config/fonts";
import { PropsWithChildren } from "react";
import { colors } from "@src/config/color";


// interface Iprops {
//     style?: StyleProp<TextStyle>
// }

const RobotoText: React.FC<PropsWithChildren<TextProps>> = ({ style, children, ...props }) => {
    return (
        <Text style={[styles.text, style]} {...props}>
            {children}
        </Text>
    );
}



const styles = StyleSheet.create({
    text: {
        fontFamily: fonts.roboto,
        color: colors.black
    }
})

export default RobotoText;