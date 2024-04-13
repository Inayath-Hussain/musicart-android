import RobotoText from "@src/Components/Common/Roboto/Text";
import CartIcon from "@src/Components/Icons/Cart";
import { colors } from "@src/config/color";
import { cartSelector } from "@src/store/slices/cartItems";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";


interface Iprops {
    width: number
    height: number
}

const Cart: React.FC<Iprops> = ({ height, width }) => {

    const total = useSelector(cartSelector);

    return (
        <View style={styles.container}>
            <CartIcon width={width} height={height} />

            <View style={styles.textContainer}>
                <RobotoText style={styles.text}>{total}</RobotoText>
            </View>

        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        position: 'relative'
    },

    text: {
        color: colors.white,
        fontSize: 14
    },

    textContainer: {
        backgroundColor: colors.green,
        width: 20,
        height: 20,
        borderRadius: 20,

        justifyContent: "center",
        alignItems: "center",

        position: "absolute",
        top: -10,
        right: -10
    }
})

export default Cart;