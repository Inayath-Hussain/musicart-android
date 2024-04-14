import LottieView from "lottie-react-native";
import Loader from "../Common/Loader";
import { StyleSheet } from "react-native";

const HomeLoader = () => {
    return (
        <Loader>
            <LottieView
                autoPlay
                loop
                source={require("@src/assets/lottie/musicart-loader.json")}

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


export default HomeLoader;