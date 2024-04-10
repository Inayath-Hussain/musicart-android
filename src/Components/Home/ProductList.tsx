import { FlatList, Image, StyleSheet, Text, View, useWindowDimensions } from "react-native";

import RobotoText from "../Common/Roboto/Text";
import { capitalize } from "@src/utilities/capitalize";


interface Idata {
    _id: string
    color: string
    name: string
    headphone_type: string
    price: number
    main_image: string
}

const ProductList = () => {

    const data: Idata[] = [
        {
            _id: "a",
            name: "boAt Rockerz 551ANC",
            color: "Stellar black",
            headphone_type: "on-ear",
            price: 5999,
            main_image: "https://firebasestorage.googleapis.com/v0/b/music-cart-3af3b.appspot.com/o/Products%2FboAt%20Rockerz%20551ANC%2FboAt%20Rockerz%20551ANC.webp_1711607331508.webp?alt=media&token=e8ea863c-021a-4770-82d2-bf39eb65e679"
        },

        {
            _id: "b",
            name: "Sony Wh-Ch 520",
            color: "black",
            headphone_type: "on-ear",
            price: 5999,
            main_image: "https://firebasestorage.googleapis.com/v0/b/music-cart-3af3b.appspot.com/o/Products%2FSony%20Wh-Ch510%2FSony%20Wh-Ch510.webp_1711601748365.webp?alt=media&token=3b935684-9278-444c-a15b-1f0b916dcac3"
        },
        {
            _id: "c",
            name: "Wony Sh-Ch 520 onoub8tcu hibv iovu vbiuh",
            color: "black",
            headphone_type: "on-ear",
            price: 5999,
            main_image: "https://firebasestorage.googleapis.com/v0/b/music-cart-3af3b.appspot.com/o/Products%2FSony%20Wh-Ch510%2FSony%20Wh-Ch510.webp_1711601748365.webp?alt=media&token=3b935684-9278-444c-a15b-1f0b916dcac3"
        }

    ]


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









const Card: React.FC<Idata> = ({ main_image, name, price, color, headphone_type }) => {

    const { width } = useWindowDimensions();

    const formattedPrice = Intl.NumberFormat("en-In").format(price)

    return (
        <View style={[cardStyles.layout, { width: width / 2 - 10 }]}>

            {/* card */}
            <View style={cardStyles.card}>

                {/* image container */}
                <View style={cardStyles.imageContainer}>
                    <Image src={main_image} style={cardStyles.image} />
                </View>


                <View style={cardStyles.textContainer}>
                    <RobotoText numberOfLines={2} style={cardStyles.name}>{name}</RobotoText>
                    <RobotoText>Price - &#8377; {formattedPrice}</RobotoText>
                    <RobotoText>{capitalize(color)} | {capitalize(headphone_type)} headphone</RobotoText>
                </View>

            </View>

        </View>
    )
}


const cardStyles = StyleSheet.create({

    card: {
        borderWidth: 1,
        borderColor: "#CECECE",
        borderRadius: 6,
        height: 240
    },

    image: {
        maxWidth: 120,
        maxHeight: 120,
        minWidth: 100,
        minHeight: 80,
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