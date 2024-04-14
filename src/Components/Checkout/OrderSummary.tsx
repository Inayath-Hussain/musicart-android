import { StyleSheet, View } from "react-native";
import RobotoText from "../Common/Roboto/Text";
import { colors } from "@src/config/color";



interface Iprops {
    total_items_price: number
    convenienceFee: number
    totalAmount: number
}

const OrderSummary: React.FC<Iprops> = ({ total_items_price, convenienceFee, totalAmount }) => {
    return (
        <>
            <RobotoText style={styles.fontSize}>Order Summary</RobotoText>

            <View style={styles.container}>

                <View style={styles.leftSection}>
                    <RobotoText style={[styles.fontSize, styles.summaryText]}>Items :</RobotoText>
                    <RobotoText style={[styles.fontSize, styles.summaryText]}>Delivery :</RobotoText>

                </View>


                <View style={styles.rightSection}>
                    <RobotoText style={[styles.fontSize, styles.summaryText]}>&#8377; {total_items_price}</RobotoText>
                    <RobotoText style={[styles.fontSize, styles.summaryText]}>&#8377; {convenienceFee}</RobotoText>
                </View>

            </View>


            <View style={styles.horizontalRule} />

            <View style={styles.container}>
                <RobotoText style={[styles.fontSize, styles.totalText]}>Order Total :</RobotoText>

                <RobotoText style={[styles.fontSize, styles.totalText]}>&#8377; {totalAmount}</RobotoText>
            </View>
        </>
    );
}



const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between"
    },

    fontSize: {
        fontSize: 22
    },

    horizontalRule: {
        height: 3,
        backgroundColor: colors.horizontalRule,
        width: "100%",

        marginVertical: 25
    },

    leftSection: {
    },


    rightSection: {
    },

    summaryText: {
        color: "#797979",
        marginVertical: 5
    },


    totalText: {
        color: colors.orange
    }
})

export default OrderSummary;