import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";
import { fonts } from "../../../config/fonts";
import { PropsWithChildren } from "react";


interface Iprops {
    style?: StyleProp<TextStyle>
}

const RobotoText: React.FC<PropsWithChildren<Iprops>> = ({ style, children }) => {
    return (
        <Text style={[styles.text, style]}>
            {children}
        </Text>
    );
}



const styles = StyleSheet.create({
    text: {
        fontFamily: fonts.roboto
    }
})

export default RobotoText;