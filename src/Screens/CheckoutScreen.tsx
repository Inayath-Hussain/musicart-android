import { useCallback, useContext, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useNetInfo } from "@react-native-community/netinfo";

import CheckoutSectionHeader from "@src/Components/Checkout/SectionHeader";
import DrawerSelect from "@src/Components/Common/DrawerSelect";
import GoBackButton from "@src/Components/Common/GoBackButton";
import RobotoText from "@src/Components/Common/Roboto/Text";
import { colors } from "@src/config/color";
import { MainTabStackParamList, ShopStackParamList } from "@src/config/interface";
import { route } from "@src/routes";
import { EmptyCart, ICartData, getCartService } from "@src/services/cart/getCartItems";
import { UnauthorizedError } from "@src/services/errors";
import ReviewItems from "@src/Components/Checkout/ReviewItems";
import OrderSummary from "@src/Components/Checkout/OrderSummary";
import SecondaryButton from "@src/Components/Common/SecondaryButton";
import { NoCartItems, PlaceOrderBodyError, placeOrderService } from "@src/services/order/placeOrder";
import { useDispatch } from "react-redux";
import { updateCart } from "@src/store/slices/cartItems";
import { authCookieContext } from "@src/contexts/authCookie";
import CartLoader from "@src/Components/Cart/CartLoader";
import FormError from "@src/Components/Common/FormError";
import OrderPlaced from "@src/Components/Checkout/OrderPlaced";



const CheckoutScreen: React.FC<NativeStackScreenProps<ShopStackParamList, "checkout">> = ({ navigation }) => {

    const { navigate } = useNavigation<BottomTabNavigationProp<MainTabStackParamList>>();
    const { isConnected: isOnline } = useNetInfo();
    const dispatch = useDispatch();
    const { logout } = useContext(authCookieContext);

    const [address, setAddress] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");

    const [cartItems, setCartItems] = useState<ICartData | null>(null);
    const [loading, setLoading] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);


    const initalErrors = { address: "", paymentMethod: "" }
    const [errors, setErrors] = useState(initalErrors);


    const paymentOptions = {
        "POD": "Pay on Delivery",
        "UPI": "UPI",
        "CARD": "Card"
    }

    const call = () => {
        setLoading(true);

        getCartService()
            .then(result => {
                setLoading(false);
                if (result instanceof EmptyCart) {
                    // navigate(route.home)
                    // toast("no items in cart")
                    return
                }

                setCartItems(result)
            })
            .catch(err => {
                setLoading(false);
                if (err instanceof UnauthorizedError) {
                    navigate(route.users.index, { screen: route.users.login })
                    return
                }

                // set errorMessage (err.message)
            })

    }


    useFocusEffect(
        useCallback(call, [])
    )


    const handleGoBack = () => navigation.navigate(route.shop.cart);



    // validate's address and payment method values
    const validate = () => {

        let valid = true;

        const localErrorObj = { ...initalErrors };

        if (address === "") { valid = false; localErrorObj.address = "required" }
        if (paymentMethod === "") { valid = false; localErrorObj.paymentMethod = "required" }

        setErrors(localErrorObj)
        return valid
    }


    const handlePlaceOrder = async () => {
        if (isOnline === false) {
            // toast("you are offline")
            return
        }

        // validate address and payment method
        const validStatus = validate()
        if (validStatus === false) return


        // make api call
        try {
            setLoading(true);
            await placeOrderService({ address, paymentMethod })

            setLoading(false);
            // toast("order placed", { type: "success" })
            setOrderPlaced(true)
            setErrors(initalErrors)
            setAddress("");
            setPaymentMethod("");

            dispatch(updateCart(0))
        }

        catch (ex) {
            setLoading(false);
            switch (true) {
                case (ex instanceof PlaceOrderBodyError):
                    setErrors(ex.errors)
                    break;

                case (ex instanceof UnauthorizedError):
                    // toast("please login again")
                    logout();
                    navigate(route.users.index, { screen: route.users.login });
                    break;

                case (ex instanceof NoCartItems):
                    // toast("no cart items found")
                    navigate(route.home.index, { screen: route.home.productList });
            }
            console.log(ex)
        }
    }


    if (orderPlaced) return (

        <OrderPlaced />

    );

    return (
        <ScrollView contentContainerStyle={styles.layout}>

            {
                loading &&
                <CartLoader />
            }

            <GoBackButton onPress={handleGoBack} />

            <RobotoText style={styles.header}>Checkout</RobotoText>
            {
                cartItems &&
                <>
                    <CheckoutSectionHeader text="1. Delivery Address"
                        style={styles.sectionHeader} />
                    <TextInput multiline
                        numberOfLines={5}
                        style={styles.addressInput}
                        value={address} onChangeText={value => setAddress(value)}
                    />
                    <FormError errorMessage={errors.address} type="Field" />



                    <CheckoutSectionHeader text="2. Payment method"
                        style={styles.sectionHeader} />
                    <DrawerSelect
                        defaultText="Mode of payment"
                        options={paymentOptions}
                        value={paymentMethod}
                        handleChange={setPaymentMethod}
                    />
                    <FormError errorMessage={errors.paymentMethod} type="Field" />


                    <CheckoutSectionHeader text="3. Review items and delivery"
                        style={styles.sectionHeader} />
                    <ReviewItems data={cartItems?.data} />


                    <View style={styles.horizontalRule} />


                    <OrderSummary convenienceFee={cartItems.convenienceFee} total_items_price={cartItems.total_items_price} totalAmount={cartItems.totalAmount} />


                    <SecondaryButton text="Place your order" handlePress={handlePlaceOrder}
                        buttonStyle={styles.placeOrderButton} />

                </>
            }
        </ScrollView>
    );
}




const styles = StyleSheet.create({
    addressInput: {
        borderWidth: 1,
        borderColor: colors.black,
        borderRadius: 8,

        textAlignVertical: "top"
    },

    header: {
        fontSize: 28,
        fontWeight: "600",
        marginTop: 25,
        marginBottom: 10
    },

    horizontalRule: {
        height: 2,
        backgroundColor: colors.horizontalRule,

        marginVertical: 30
    },

    layout: {
        paddingVertical: 20,
        paddingHorizontal: 10,
        backgroundColor: colors.white
    },

    placeOrderButton: {
        marginTop: 40,
        marginBottom: 20
    },

    sectionHeader: {
        marginTop: 30
    }
})

export default CheckoutScreen;