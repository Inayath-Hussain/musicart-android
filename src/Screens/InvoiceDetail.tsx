import { useCallback, useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useNetInfo } from "@react-native-community/netinfo";

import GoBackButton from "@src/Components/Common/GoBackButton";
import RobotoText from "@src/Components/Common/Roboto/Text";
import CheckoutSectionHeader from "@src/Components/Checkout/SectionHeader";
import { InvoiceStackParamList, MainTabStackParamList } from "@src/config/interface";
import { route } from "@src/routes";
import { IOrderDetail, OrderNotFound, getOrderService } from "@src/services/order/getOrder";
import { UnauthorizedError } from "@src/services/errors";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { authCookieContext } from "@src/contexts/authCookie";
import HomeLoader from "@src/Components/Home/HomeLoader";
import { colors } from "@src/config/color";
import ReviewItems from "@src/Components/Checkout/ReviewItems";
import OrderSummary from "@src/Components/Checkout/OrderSummary";


const InvoiceDetailScreen: React.FC<NativeStackScreenProps<InvoiceStackParamList, "invoice_detail">> = ({ navigation, route: routeProp }) => {

    const { id } = routeProp.params;
    const { isConnected: isOnline } = useNetInfo();
    const { navigate } = useNavigation<BottomTabNavigationProp<MainTabStackParamList>>();
    const { logout } = useContext(authCookieContext);

    const [orderDetail, setOrderDetail] = useState<IOrderDetail | null>(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const call = () => {
        if (isOnline === false) {
            // toast("you are offline")
            setError("You are offline");
            return
        }

        if (!id) return navigation.navigate(route.invoices.list)

        setIsLoading(true);
        getOrderService(id)
            .then(data => {
                setOrderDetail(data)
                setIsLoading(false);
            })
            .catch(err => {
                switch (true) {
                    case (err instanceof UnauthorizedError):
                        navigate(route.users.index, { screen: route.users.login })
                        // toast("Please login again")
                        logout();
                        return

                    case (err instanceof OrderNotFound):
                        // navigate(route.);
                        // toast("Order Not Found")
                        setError("Order not found")
                        return


                    default:
                        // navigate(route.home)
                        // toast(err.message)
                        setError(err.message)
                        return

                }
            })
    }

    useFocusEffect(
        useCallback(call, [])
    )



    const paymentOptions = {
        "POD": "Pay on Delivery",
        "UPI": "UPI",
        "CARD": "Card"
    }

    const handleGoBack = () => navigation.navigate(route.invoices.list)

    return (
        <ScrollView contentContainerStyle={styles.layout}>

            {
                isLoading &&
                <HomeLoader />
            }

            <GoBackButton onPress={handleGoBack} />

            <RobotoText style={styles.header}>Invoice</RobotoText>
            {
                orderDetail &&
                <>
                    <CheckoutSectionHeader text="1. Delivery Address" />
                    <RobotoText style={styles.detail}>{orderDetail.address}</RobotoText>

                    <View style={styles.horizontalRule} />

                    <CheckoutSectionHeader text="2. Payment method" />
                    <RobotoText style={styles.detail}>{paymentOptions[orderDetail.paymentMethod as keyof typeof paymentOptions]}</RobotoText>

                    <View style={styles.horizontalRule} />


                    <CheckoutSectionHeader text="3. Review items and delivery" />
                    <ReviewItems data={orderDetail.products} />


                    <View style={styles.horizontalRule} />

                    <OrderSummary convenienceFee={orderDetail.deliveryFee}
                        total_items_price={orderDetail.total_items_price} totalAmount={orderDetail.total_amount} />
                </>
            }
        </ScrollView>
    );
}




const styles = StyleSheet.create({
    detail: {
        fontSize: 22,
        marginLeft: 23
    },

    header: {
        fontSize: 28,
        fontWeight: "700",
        textAlign: "center",
        marginVertical: 20
    },

    horizontalRule: {
        height: 2,
        backgroundColor: colors.horizontalRule,

        marginVertical: 30
    },

    layout: {
        paddingHorizontal: 10,
        paddingTop: 20,
        paddingBottom: 30,
        backgroundColor: colors.white,
        minHeight: "100%",
    }
});

export default InvoiceDetailScreen;