import { StyleProp, StyleSheet, TextStyle } from "react-native";
import RobotoText from "./Roboto/Text";
import { colors } from "@src/config/color";


interface Iprops {
    errorMessage: string
    type: "Field" | "Form"
    style?: StyleProp<TextStyle>
}

const FormError: React.FC<Iprops> = ({ type, errorMessage, style = {} }) => {

    const errorStyle = type === "Form" ? styles.textCenter : styles.textLeft;

    const errorMessageStyle = errorMessage === "" ? styles.hide : styles.errorMessage

    return (
        <RobotoText style={[errorMessageStyle, errorStyle, style]}>
            {errorMessage}
        </RobotoText>
    );
}



const styles = StyleSheet.create({

    errorMessage: {
        fontSize: 14,
        color: colors.errorColor
    },

    hide: {
        display: "none"
    },

    textCenter: {
        textAlign: "center"
    },

    textLeft: {
        textAlign: "left"
    }
})

export default FormError;