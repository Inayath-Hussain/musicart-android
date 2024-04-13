import { FlatList, ListRenderItemInfo, StyleSheet } from "react-native";
import RobotoText from "../Common/Roboto/Text";

interface Iprops {
    points: string[]
}


const ProductDescription: React.FC<Iprops> = ({ points }) => {
    return (
        <FlatList
            data={points}
            renderItem={(props) => <Item {...props} />}
            contentContainerStyle={styles.flatList}
            ListHeaderComponent={<Header />}

            scrollEnabled={false}
        />
    );
}


const styles = StyleSheet.create({
    flatList: {
        marginTop: 10,
        marginBottom: 20
    },

    header: {
        fontSize: 20
    }
})

export default ProductDescription;



const Header = () => <RobotoText style={styles.header}>About this item</RobotoText>


const Item: React.FC<ListRenderItemInfo<string>> = ({ item }) => {
    return (
        <RobotoText style={itemStyles.text}>{`\u2022 ${item}`}</RobotoText>
    )
}


const itemStyles = StyleSheet.create({
    text: {
        fontSize: 20,
        marginVertical: 5,
        marginLeft: 14
    }
})