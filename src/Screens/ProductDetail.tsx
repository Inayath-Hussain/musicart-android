import { useContext, useMemo } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import BuyNowButton from "@src/Components/Common/BuyNowButton";
import GoBackButton from "@src/Components/Common/GoBackButton";
import CustomCarousel from "@src/Components/ProductDetail/Carousel";
import { MainTabStackParamList, ProductStackParamList } from "@src/config/interface";
import { useGetProductsQuery } from "@src/store/slices/productApi";
import { productQuerySelector } from "@src/store/slices/productQuery";
import RobotoText from "@src/Components/Common/Roboto/Text";
import StarIcon from "@src/Components/Icons/Star";
import { colors } from "@src/config/color";
import ProductRating from "@src/Components/ProductDetail/Rating";
import { capitalize } from "@src/utilities/capitalize";
import ProductDescription from "@src/Components/ProductDetail/ProductDescription";
import StockAndBrand from "@src/Components/ProductDetail/StockAndBrand";
import SecondaryButton from "@src/Components/Common/SecondaryButton";
import { authCookieContext } from "@src/contexts/authCookie";
import { addToCartService } from "@src/services/cart/addToCart";
import { updateCartItem } from "@src/store/slices/cartItems";
import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { route } from "@src/routes";
import { UnauthorizedError } from "@src/services/errors";



const ProductDetail: React.FC<NativeStackScreenProps<ProductStackParamList, "product-detail">> = ({ navigation, route: routeProp }) => {

    const { id } = routeProp.params;
    const { queryString } = useSelector(productQuerySelector);
    const { data } = useGetProductsQuery(queryString);

    const { loggedIn } = useContext(authCookieContext);
    const dispatch = useDispatch();
    const { navigate } = useNavigation<BottomTabNavigationProp<MainTabStackParamList>>();

    const getData = () => {
        return data?.find(d => d._id === id)
    }

    const productDetail = useMemo(getData, [id]);

    // go back functionality
    const goBack = () => navigation.navigate("product-list");


    const addToCart = (buyNow: boolean) => {
        if (loggedIn) {

            // make api call
            addToCartService({ product_id: productDetail?._id as string })
                // dispatch
                .then(result => {
                    dispatch(updateCartItem(1))

                    if (buyNow === true) navigate(route.shop.index, { screen: "checkout" })
                })
                .catch(err => {
                    switch (true) {
                        case (err instanceof UnauthorizedError):
                            navigate(route.users.index, { screen: "login" })
                            // toast("please login again")
                            return

                        default:
                            // toast(err.message)
                            return
                    }
                })
        }
        else {
            // navigate(route.users.index  `?path=${pathname}`)
            navigate(route.users.index, { screen: "login" })
        }
    }


    return (
        <ScrollView contentContainerStyle={styles.layout}>

            <GoBackButton onPress={goBack} />

            <BuyNowButton handlePress={() => addToCart(true)} buttonStyle={styles.buyNow} />

            {
                productDetail &&
                <>
                    <CustomCarousel images={[productDetail.main_image, ...productDetail.other_images]} />

                    <RobotoText style={styles.name}>{productDetail.name}</RobotoText>


                    <ProductRating rating={productDetail.review.rating} total_customers_reviewed={productDetail.review.total_customer_reviews} />

                    <RobotoText style={styles.fullTitle}>{productDetail.full_title}</RobotoText>

                    <RobotoText style={styles.color_and_type}>{capitalize(productDetail.color)} | {capitalize(productDetail.headphone_type)} headphone</RobotoText>

                    <ProductDescription points={productDetail.description} />

                    <StockAndBrand available={productDetail.available} brand={productDetail.brand} />


                    <SecondaryButton text="Add to cart" handlePress={() => addToCart(false)} buttonStyle={styles.addToCart} />
                    <BuyNowButton handlePress={() => addToCart(true)} buttonStyle={styles.buyNow} />

                </>
            }


        </ScrollView>
    );
}


const styles = StyleSheet.create({
    addToCart: {
        marginTop: 20
    },

    buyNow: {
        marginVertical: 20
    },

    color_and_type: {
        fontSize: 22,
        marginVertical: 15
    },

    fullTitle: {
        fontSize: 22
    },

    layout: {
        padding: 15,
        backgroundColor: colors.white,
        minHeight: "100%"
    },

    name: {
        marginVertical: 25,
        fontSize: 22
    }

})


export default ProductDetail;