import { Image, StyleSheet, useWindowDimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { CarouselRenderItemInfo } from "react-native-reanimated-carousel/lib/typescript/types";

import { colors } from "@src/config/color";

interface Iprops {
    images: string[]
}

const CustomCarousel: React.FC<Iprops> = ({ images }) => {

    const { width } = useWindowDimensions();

    return (
        <Carousel
            data={images}
            renderItem={(props) => <Item {...props} />}

            width={width - 30}
            height={300}

            loop
            autoPlay
            autoPlayInterval={3000}
            pagingEnabled

            style={styles.carousel}
        />
    );
}


const styles = StyleSheet.create({
    carousel: {
        borderWidth: 2,
        borderColor: colors.primaryColor,
        borderRadius: 8,

        height: 320,
        marginTop: 10
    }
})

export default CustomCarousel;





const Item: React.FC<CarouselRenderItemInfo<string>> = ({ item }) => {
    return (
        <Image src={item} style={itemStyles.image} key={item} />
    )
}



const itemStyles = StyleSheet.create({
    image: {
        width: "100%",
        height: "100%",
        objectFit: "contain"
    }
})