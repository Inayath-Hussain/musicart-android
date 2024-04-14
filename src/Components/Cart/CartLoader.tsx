import LottieView from "lottie-react-native";
import { Modal, StyleSheet, View } from "react-native";

const CartLoader = () => {
    return (
        <Modal transparent>
            <View style={styles.modal}>

                <LottieView
                    autoPlay
                    loop
                    source={require("@src/assets/lottie/cart-loader-animation.json")}

                    style={styles.lottie}
                />

            </View>
        </Modal>
    );
}


const styles = StyleSheet.create({
    modal: {
        backgroundColor: "#00000070",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },

    lottie: {
        width: 300,
        height: 300
    }
})

export default CartLoader;