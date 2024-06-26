import LottieView from "lottie-react-native";
import { StyleSheet } from "react-native";
import Loader from "../Common/Loader";

const CartLoader = () => {
    return (
        <Loader>
            <LottieView
                autoPlay
                loop
                source={require("@src/assets/lottie/cart-loader-animation.json")}

                style={styles.lottie}
            />
        </Loader>
    );
}


const styles = StyleSheet.create({
    lottie: {
        width: 300,
        height: 300
    }
})

export default CartLoader;