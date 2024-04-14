import { StyleProp, StyleSheet, TextStyle } from "react-native";
import RobotoText from "../Common/Roboto/Text";
import { colors } from "@src/config/color";


interface Iprops {
    text: string;
    style?: StyleProp<TextStyle>
}

const CheckoutSectionHeader: React.FC<Iprops> = ({ text, style = {} }) => {
    return (
        <RobotoText style={[styles.header, style]}>{text}</RobotoText>
    );
}



const styles = StyleSheet.create({
    header: {
        fontSize: 24,
        color: colors.orange,
        marginVertical: 15
    }
})

export default CheckoutSectionHeader;