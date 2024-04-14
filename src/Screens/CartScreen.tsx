import { useCallback, useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { ScrollView, StyleSheet, View } from "react-native";

import { useNetInfo } from "@react-native-community/netinfo";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";


import CartItems from "@src/Components/Cart/CartItems";
import CartLoader from "@src/Components/Cart/CartLoader";
import GoBackButton from "@src/Components/Common/GoBackButton";
import RobotoText from "@src/Components/Common/Roboto/Text";
import SecondaryButton from "@src/Components/Common/SecondaryButton";
import { colors } from "@src/config/color";
import { MainTabStackParamList, ShopStackParamList } from "@src/config/interface";
import { authCookieContext } from "@src/contexts/authCookie";
import { route } from "@src/routes";
import { AddToCartBodyError, addToCartService } from "@src/services/cart/addToCart";
import { EmptyCart, ICartData, getCartService } from "@src/services/cart/getCartItems";
import { UnauthorizedError } from "@src/services/errors";
import { updateCart, updateCartItem } from "@src/store/slices/cartItems";
import FormError from "@src/Components/Common/FormError";



export type IhandleQuantityChange = (product_id: string, quantity: number, type: "add" | "sub") => Promise<void>


const CartScreen: React.FC<NativeStackScreenProps<ShopStackParamList, "cart">> = ({ navigation }) => {

    const { navigate } = useNavigation<BottomTabNavigationProp<MainTabStackParamList>>();

    const dispatch = useDispatch();
    const { isConnected: isOnline } = useNetInfo();
    const { logout } = useContext(authCookieContext);

    const [cartData, setCartData] = useState<ICartData | null>(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const call = () => {
        if (isOnline === false) return setError("You are offline")
        // return toast("you are offline")

        setLoading(true);
        getCartService()
            .then(result => {
                setLoading(false);
                if (result instanceof EmptyCart) {
                    // toast("no cart items")
                    setError("No cart items")
                    return
                }

                setCartData(result)
                dispatch(updateCart(Number(result.total_items)))
            })
            .catch(err => {
                setLoading(false);
                if (err instanceof UnauthorizedError) {
                    navigate(route.users.index, { screen: route.users.login })
                    logout();
                    // toast("please login again")
                    return
                }

                setError(err.message)
                // toast(err.message)
            })
    }

    useFocusEffect(
        useCallback(call, [])
    )


    const handlePress = () => navigate(route.home.index, { screen: route.home.productList })


    const handleQuantityChange: IhandleQuantityChange = async (product_id, quantity, type) => {

        if (isOnline === false) {
            setError("You are offline");
            // toast("you are offline")
            return
        }

        const newQuantity = type === "add" ? quantity + 1 : quantity - 1;

        addToCartService({ product_id, quantity: newQuantity })
            .then(result => {
                // get difference between previous quantity and now quantity
                const diff = newQuantity - quantity;
                dispatch(updateCartItem(diff))

                call();
            })
            .catch(err => {

                if (err instanceof AddToCartBodyError) {
                    console.log(err)
                }

                if (err instanceof UnauthorizedError) {
                    navigate(route.users.index, { screen: route.users.login })
                    logout();
                    // toast("please login again")
                    return
                }

                // toast(err.message)
                setError(err.message)
            })
    }


    const handlePlaceOrder = () => navigation.navigate(route.shop.checkout)


    return (
        <ScrollView contentContainerStyle={styles.layout}>

            {
                loading &&
                <CartLoader />
            }

            <GoBackButton onPress={handlePress} />

            <FormError errorMessage={error} type="Form" style={styles.error} />

            {cartData &&

                <>
                    <CartItems items={cartData.data} handleQuantityChange={handleQuantityChange} />

                    <View style={styles.horizontalRule} />

                    {/* cart total price info */}
                    <View style={styles.totalPriceContainer}>
                        <View style={styles.totalPriceSection}>
                            <RobotoText style={styles.mediumText}>Total MRP</RobotoText>
                            <RobotoText style={styles.mediumText}>Convenience Fee</RobotoText>
                            <RobotoText style={styles.mediumText}>Total Amount</RobotoText>
                        </View>

                        <View style={styles.totalPriceSection}>
                            <RobotoText style={styles.mediumText}>&#8377; {cartData.total_items_price}</RobotoText>
                            <RobotoText style={styles.mediumText}>&#8377; {cartData.convenienceFee}</RobotoText>
                            <RobotoText style={[styles.mediumText, styles.bold]}>&#8377; {cartData.totalAmount}</RobotoText>
                        </View>
                    </View>


                    <SecondaryButton text="PLACE ORDER" handlePress={handlePlaceOrder}
                        buttonStyle={styles.placeOrderButton} />

                </>
            }

        </ScrollView>
    );
}


const styles = StyleSheet.create({

    bold: {
        fontWeight: "700"
    },

    error: {
        fontSize: 22
    },

    horizontalRule: {
        width: "100%",
        height: 2,
        backgroundColor: colors.black,

        marginVertical: 20
    },

    layout: {
        backgroundColor: colors.white,
        paddingVertical: 20,
        paddingHorizontal: 10,

        minHeight: "100%"
    },

    mediumText: {
        fontSize: 20
    },

    placeOrderButton: {
        marginVertical: 30
    },

    totalPriceContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

        marginTop: 20
    },

    totalPriceSection: {
        rowGap: 8
    }
})

export default CartScreen;