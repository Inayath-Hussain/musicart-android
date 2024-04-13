import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import GoBackIcon from "../Icons/GoBack";
import { colors } from "@src/config/color";


interface Iprops {
    onPress: () => void
}


const GoBackButton: React.FC<Iprops> = ({ onPress }) => {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.button}>
                <GoBackIcon height={25} width={25} />
            </View>
        </TouchableWithoutFeedback>
    );
}


const styles = StyleSheet.create({
    button: {
        padding: 5,
        height: 40,
        width: 40,
        borderRadius: 30,
        elevation: 10,
        backgroundColor: colors.white,

        justifyContent: "center",
        alignItems: "center"
    }
})

export default GoBackButton;