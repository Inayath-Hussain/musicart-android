import { FlatList, Image, ListRenderItemInfo, StyleSheet, TouchableWithoutFeedback, View } from "react-native";

import RobotoText from "../Common/Roboto/Text";
import AddIcon from "../Icons/Add";
import ReduceIcon from "../Icons/Reduce";
import { colors } from "@src/config/color";
import { fonts } from "@src/config/fonts";
import { IhandleQuantityChange } from "@src/Screens/CartScreen";
import { ICartData } from "@src/services/cart/getCartItems";

interface Iprops {
    items: ICartData["data"];

    handleQuantityChange: IhandleQuantityChange;
}


const CartItems: React.FC<Iprops> = ({ items, handleQuantityChange }) => {
    return (
        <FlatList
            scrollEnabled={false}
            contentContainerStyle={styles.container}

            data={items}
            renderItem={(props) => <Item {...props} handleQuantityChange={handleQuantityChange} />}
        />
    );
}


const styles = StyleSheet.create({
    container: {
        marginVertical: 20
    }
})

export default CartItems;



interface ItemProps {
    handleQuantityChange: IhandleQuantityChange
}

const Item: React.FC<ListRenderItemInfo<ICartData["data"][number]> & ItemProps> = ({ item, handleQuantityChange }) => {

    const handleAdd = () => handleQuantityChange(item.product_id, item.quantity, "add");
    const handleSub = () => handleQuantityChange(item.product_id, item.quantity, "sub");


    const formattedPrice = Intl.NumberFormat("en-In").format(item.price)

    const ICONSIZE = 25;

    const disabled = item.quantity === 1;

    return (
        <View style={itemStyles.container}>

            <View style={itemStyles.imageContainer}>
                <Image src={item.image} style={itemStyles.image} />
            </View>

            <View style={itemStyles.infoContainer}>
                <RobotoText style={itemStyles.name}>{item.name}</RobotoText>

                <RobotoText style={[itemStyles.price, itemStyles.bold, itemStyles.marginTop]}>&#8377; {formattedPrice}</RobotoText>

                <RobotoText style={[itemStyles.small, itemStyles.marginTop]}>Color: {item.color}</RobotoText>

                <RobotoText style={[itemStyles.small, itemStyles.marginTop]}>{item.available ? "In" : "Out of"} stock</RobotoText>

                <View style={[itemStyles.quantityContainer, itemStyles.marginTop]}>
                    <RobotoText style={itemStyles.quantity}>Quantity</RobotoText>


                    <View style={itemStyles.quantityControls}>


                        {/* reduce button */}
                        <TouchableWithoutFeedback onPress={handleSub} disabled={disabled}>
                            <View style={[itemStyles.quantityReduce, disabled ? itemStyles.disabled : {}]}>
                                <ReduceIcon width={ICONSIZE} height={ICONSIZE} />
                            </View>
                        </TouchableWithoutFeedback>


                        <RobotoText style={[itemStyles.quantity, itemStyles.quantityInput]}>{item.quantity}</RobotoText>


                        {/* increase button */}
                        <TouchableWithoutFeedback onPress={handleAdd}>
                            <View style={itemStyles.quantityAdd}>
                                <AddIcon width={ICONSIZE} height={ICONSIZE} />
                            </View>
                        </TouchableWithoutFeedback>


                    </View>
                </View>



                <View style={itemStyles.total}>
                    <RobotoText style={itemStyles.totalText}>Total :</RobotoText>

                    <RobotoText style={[itemStyles.totalText, itemStyles.bold]}>&#8377; {item.total_price}</RobotoText>
                </View>

            </View>

        </View>
    )
}


const itemStyles = StyleSheet.create({
    bold: {
        fontWeight: "700"
    },

    container: {
        backgroundColor: "#dbdbdb",
        paddingHorizontal: 8,
        paddingVertical: 16,

        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",

        marginVertical: 10
    },

    disabled: {
        backgroundColor: colors.errorColor + "50"
    },

    image: {
        width: 110,
        height: 110,
        objectFit: "contain"
    },

    imageContainer: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center"
    },

    infoContainer: {
        flex: 1,

        justifyContent: "flex-start",
        alignItems: "stretch"
    },

    marginTop: {
        marginTop: 4
    },

    name: {
        fontSize: 16
    },

    price: {
        fontSize: 18
    },

    quantity: {
        fontSize: 18,
    },

    quantityAdd: {
        backgroundColor: colors.green,
        borderRadius: 30
    },

    quantityContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },

    quantityControls: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        columnGap: 7
    },


    quantityInput: {
        fontFamily: fonts.roboto,
        padding: 0,
        alignItems: "center"
    },

    quantityReduce: {
        backgroundColor: colors.errorColor,
        borderRadius: 30
    },

    small: {
        fontSize: 14
    },

    total: {
        flexDirection: "row",
        justifyContent: "space-between",

        marginTop: 30
    },

    totalText: {
        fontSize: 20
    }
})