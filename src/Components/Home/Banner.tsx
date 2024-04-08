import { Image, StyleSheet, Text } from "react-native";
import LinearGradient from "react-native-linear-gradient"
import { colors } from "../../config/color";

const Banner = () => {
    return (
        <LinearGradient style={styles.container}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={["#7286B4", "#E794CE"]} >

            <Text style={styles.mainText}>
                Grab upto 50% off on{"\n"}
                Selected headphones
            </Text>

            <Text style={styles.secondaryText}>
                Buy Now
            </Text>

            <Image source={require("../../assets/images/banner.png")}
                style={styles.image} />

        </LinearGradient>
    );
}



const styles = StyleSheet.create({
    container: {
        // background: linear-gradient(90deg, #7286B4 0%, #E794CE 100%);

        borderRadius: 7,

        marginTop: 25,
        marginBottom: 40,
        paddingVertical: 14,
        paddingHorizontal: "4%",

        alignItems: "flex-start"
    },


    image: {
        position: "absolute",
        right: -10,
        bottom: 4,
        width: 130,
        height: 140
    },


    mainText: {
        color: colors.primaryColor,
        fontWeight: "600",
        fontSize: 22,

        marginBottom: 15
    },


    secondaryText: {
        paddingVertical: 6,
        paddingHorizontal: 30,
        borderRadius: 18,

        backgroundColor: colors.primaryColor,
        color: colors.white
    }
})

export default Banner;