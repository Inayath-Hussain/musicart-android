import { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";
import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

import FormError from "@src/Components/Common/FormError";
import GoBackButton from "@src/Components/Common/GoBackButton";
import RobotoText from "@src/Components/Common/Roboto/Text";
import HomeLoader from "@src/Components/Home/HomeLoader";
import InvoiceIcon from "@src/Components/Icons/Invoice";
import OrderList from "@src/Components/InvoiceList/OrderList";
import { colors } from "@src/config/color";
import { authCookieContext } from "@src/contexts/authCookie";
import { MainTabStackParamList } from "@src/config/interface";
import { route } from "@src/routes";
import { IOrderList, getOrderListService } from "@src/services/order/getOrderList";
import { UnauthorizedError } from "@src/services/errors";

const InvoiceListScreen = () => {

    const { navigate } = useNavigation<BottomTabNavigationProp<MainTabStackParamList>>();
    const { isConnected: isOnline } = useNetInfo();
    const { logout } = useContext(authCookieContext);

    const handleGoBack = () => navigate(route.home.index, { screen: route.home.productList })

    const [orders, setOrders] = useState<IOrderList[] | null>(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const call = async () => {
            if (isOnline === false) {
                // toast("you are offline")
                setError("You are offline")
                return
            }

            setLoading(true)
            getOrderListService()
                .then(data => {
                    setOrders(data);
                    setLoading(false);
                    setError("");
                })
                .catch(err => {
                    setLoading(false);
                    setError("Something went wrong");

                    switch (true) {
                        case (err instanceof UnauthorizedError):
                            navigate(route.users.index, { screen: route.users.login });
                            logout();
                            // toast("please login again")
                            return

                        default:
                            // toast("Please try again later")
                            setError(err.message)
                    }
                })
        }

        call();
    }, [])

    return (
        <ScrollView contentContainerStyle={styles.layout}>

            {
                loading &&
                <HomeLoader />
            }

            <GoBackButton onPress={handleGoBack} />

            <RobotoText>{error}</RobotoText>

            <View style={styles.header}>
                <InvoiceIcon width={30} height={30} />

                <RobotoText style={styles.headerText}>My Invoices</RobotoText>
            </View>

            <FormError errorMessage={error} type="Form" />

            {
                orders &&
                <OrderList data={orders} />
            }
        </ScrollView>
    );
}



const styles = StyleSheet.create({
    errorMessage: {
        fontSize: 24,
        color: colors.errorColor,
        textAlign: "center"
    },

    header: {
        flexDirection: "row",
        columnGap: 20,
        marginTop: 30,
        marginBottom: 40,
        alignSelf: "center"
    },

    headerText: {
        fontSize: 22
    },

    layout: {
        backgroundColor: colors.white,
        paddingLeft: 15,
        paddingRight: 10,
        paddingVertical: 20,
        flex: 1
    }
})

export default InvoiceListScreen;
