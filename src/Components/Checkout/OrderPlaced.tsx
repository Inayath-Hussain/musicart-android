import { colors } from "@src/config/color";
import { Image, StyleSheet, View } from "react-native";
import RobotoText from "../Common/Roboto/Text";
import PrimaryButton from "../Common/PrimaryButton";
import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { MainTabStackParamList } from "@src/config/interface";
import { route } from "@src/routes";

const OrderPlaced = () => {

    const { navigate } = useNavigation<BottomTabNavigationProp<MainTabStackParamList>>();

    const goToHomePage = () => navigate(route.home.index, { screen: route.home.productList })

    return (
        <View style={styles.layout}>
            <Image source={require("@src/assets/images/confetti.png")} style={styles.image} />

            <RobotoText style={styles.mainText}>Order is placed successfully!</RobotoText>

            <RobotoText style={styles.secondaryText}>You  will be receiving a confirmation email with order details</RobotoText>


            <PrimaryButton text="Go back to Home page" handlePress={goToHomePage} buttonStyle={styles.button} />

        </View>
    );
}



const styles = StyleSheet.create({

    button: {
        paddingHorizontal: 30,
        marginVertical: 20
    },

    image: {
        width: 150,
        height: 150
    },

    layout: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: "center",
        justifyContent: "center",

        paddingHorizontal: 20
    },

    mainText: {
        fontSize: 22,
        color: colors.black,
        marginTop: 20,
        marginBottom: 10
    },

    secondaryText: {
        color: "#969696",
        textAlign: "center",
        fontSize: 18
    }
})

export default OrderPlaced;