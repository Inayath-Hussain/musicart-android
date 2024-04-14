import { ICartData } from "@src/services/cart/getCartItems";
import { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import RobotoText from "../Common/Roboto/Text";
import { colors } from "@src/config/color";


interface Iprops {
    data: ICartData["data"]
}

const ReviewItems: React.FC<Iprops> = ({ data }) => {

    const [selectedItem, setSelectedItem] = useState(data[0].product_id);

    const productInfo = data.find(d => d.product_id === selectedItem);

    data.forEach(d => console.log(d.image))

    return (
        <>
            <View style={styles.imagesContainer}>
                {data.map(d => (
                    <TouchableWithoutFeedback onPress={() => setSelectedItem(d.product_id)}>
                        <Image src={d.image} style={styles.image} />
                    </TouchableWithoutFeedback>
                ))}
            </View>

            <RobotoText style={[styles.name, styles.fontSize]}>{productInfo?.name}</RobotoText>

            <RobotoText style={[styles.fontSize, styles.color]}>Color: {productInfo?.color}</RobotoText>

            <RobotoText style={styles.fontSize}>Estimated delivery : </RobotoText>
            <RobotoText style={styles.fontSize}>Monday — FREE Standard Delivery</RobotoText>
        </>
    );
}



const styles = StyleSheet.create({
    color: {
        color: "#797979",
        marginVertical: 20
    },

    fontSize: {
        fontSize: 20
    },

    image: {
        width: 110,
        height: 110,
        borderWidth: 1,
        borderColor: colors.black,
        borderRadius: 8,
        objectFit: "contain",
        backgroundColor: colors.white
    },

    imagesContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 15,
        marginVertical: 15
    },

    name: {
        fontWeight: "600"
    }

})

export default ReviewItems;