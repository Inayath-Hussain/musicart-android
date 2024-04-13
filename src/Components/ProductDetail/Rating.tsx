import { StyleSheet, View } from "react-native";
import StarIcon from "../Icons/Star";
import RobotoText from "../Common/Roboto/Text";



interface Iprops {
    rating: number,
    total_customers_reviewed: number
}

const ProductRating: React.FC<Iprops> = ({ rating, total_customers_reviewed }) => {

    const ratings = [1, 2, 3, 4, 5]

    return (
        <View style={styles.ratingContainer}>
            {ratings.map(i => (
                <StarIcon key={i} width={25} height={25}
                    fill={i <= rating ? "#FFD600" : "#FFF"} />
            ))}

            <RobotoText style={styles.total_customers_text}>({total_customers_reviewed} Customer reviews)</RobotoText>
        </View>
    );
}



const styles = StyleSheet.create({
    ratingContainer: {
        flexDirection: "row",
        gap: 5,
        alignItems: "center",
        flexWrap: "wrap",

        marginBottom: 25
    },

    total_customers_text: {
        marginLeft: 3,
        fontSize: 18
    }
})

export default ProductRating;