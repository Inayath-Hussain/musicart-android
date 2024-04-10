import { FlatList, Image, StyleSheet, View, TouchableWithoutFeedback, useWindowDimensions } from "react-native";

import RobotoText from "../Common/Roboto/Text";
import { capitalize } from "@src/utilities/capitalize";
import { CompositeNavigationProp, useNavigation, } from "@react-navigation/native";
import { route } from "@src/routes";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { MainTabStackParamList, ProductStackParamList } from "@src/config/interface";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useGetProductsQuery } from "@src/store/slices/productApi";
import { useSelector } from "react-redux";
import { productQuerySelector } from "@src/store/slices/productQuery";


interface Idata {
    _id: string
    color: string
    name: string
    headphone_type: string
    price: number
    main_image: string
}

const ProductList = () => {

    const { queryString } = useSelector(productQuerySelector);

    const { data } = useGetProductsQuery(queryString, { refetchOnMountOrArgChange: true })



    return (
        <FlatList
            key={"product_list"}
            data={data}
            renderItem={(item) => <Card {...item.item} key={item.item._id} />}
            numColumns={2}
            keyExtractor={d => d._id}

            style={styles.flatList}
            columnWrapperStyle={styles.flatListColumn}

            // // wrapper of each row, 
            // CellRendererComponent={({ children }) => { return (<View style={styles.cell}>{children}</View>) }}

            scrollEnabled={false}
        />
    );
}


const styles = StyleSheet.create({
    // cell: {
    //     flexDirection: "row",
    //     justifyContent: "space-between"
    // },


    flatList: {

        marginTop: 32,
        marginBottom: 32,

        flexWrap: "wrap"
    },


    flatListColumn: {
        marginVertical: 10
    }
})

export default ProductList;









const Card: React.FC<Idata> = ({ main_image, name, price, color, headphone_type, _id }) => {

    const { width } = useWindowDimensions();

    const { navigate } = useNavigation<BottomTabNavigationProp<MainTabStackParamList>>();

    const handlePress = () => navigate(route.home.index, { screen: "product-detail", params: { id: _id } })

    const formattedPrice = Intl.NumberFormat("en-In").format(price)

    return (
        <View style={[cardStyles.layout, { width: (width / 2) - 10 }]}>


            <TouchableWithoutFeedback onPress={handlePress}>
                {/* card */}
                <View style={cardStyles.card}>
                    {/* image container */}
                    <View style={cardStyles.imageContainer}>
                        <Image src={main_image} style={cardStyles.image} />
                    </View>
                    <View style={cardStyles.textContainer}>
                        <RobotoText numberOfLines={2} style={cardStyles.name}>{name}</RobotoText>
                        <RobotoText>Price - &#8377; {formattedPrice}</RobotoText>
                        <RobotoText numberOfLines={2}>{capitalize(color)} | {capitalize(headphone_type)} headphone</RobotoText>
                    </View>
                </View>
            </TouchableWithoutFeedback>

        </View>
    )
}


const cardStyles = StyleSheet.create({

    card: {
        borderWidth: 1,
        borderColor: "#CECECE",
        borderRadius: 6,
        height: 240,
        minWidth: 180
    },

    image: {
        maxWidth: 120,
        maxHeight: 120,
        minWidth: 110,
        minHeight: 90,
        objectFit: "contain"
    },

    imageContainer: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0066ff2b",
        height: 140,
        borderRadius: 6
    },

    layout: {
        justifyContent: "flex-start",
        alignItems: "center"
    },

    name: {
        fontWeight: "700",
        fontSize: 16
    },

    textContainer: {
        paddingHorizontal: 9,
        paddingVertical: 6,
        justifyContent: "space-around",
        flex: 1
    }
})