import { StyleSheet, View } from "react-native";
import RobotoText from "../Common/Roboto/Text";

interface Iprops {
    available: boolean
    brand: string
}

const StockAndBrand: React.FC<Iprops> = ({ available, brand }) => {
    return (
        <>
            <View style={styles.textContainer}>
                <RobotoText style={styles.bold}>Available -</RobotoText>
                <RobotoText style={styles.text}>{available ? "In" : "Out of"} stock</RobotoText>
            </View>

            <View style={styles.textContainer}>
                <RobotoText style={styles.bold}>Brand -</RobotoText>
                <RobotoText style={styles.text}>{brand}</RobotoText>

            </View>
        </>
    );
}



const styles = StyleSheet.create({

    bold: {
        fontWeight: "700",
        fontSize: 20
    },

    text: {
        fontSize: 20
    },

    textContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        columnGap: 5
    }
})


export default StockAndBrand;