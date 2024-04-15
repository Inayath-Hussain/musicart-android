import { IOrderList } from "@src/services/order/getOrderList";
import { FlatList, ListRenderItemInfo, StyleSheet, View } from "react-native";
import InvoiceIcon from "../Icons/Invoice";
import RobotoText from "../Common/Roboto/Text";
import { userSliceSelector } from "@src/store/slices/userSlice";
import { useSelector } from "react-redux";
import PrimaryButton from "../Common/PrimaryButton";
import { colors } from "@src/config/color";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { InvoiceStackParamList } from "@src/config/interface";
import { route } from "@src/routes";



interface Iprops {
    data: IOrderList[],
}

const OrderList: React.FC<Iprops> = ({ data }) => {

    const { name } = useSelector(userSliceSelector);


    return (
        <FlatList
            data={data}
            renderItem={props => <Item {...props} name={name} />}

            ItemSeparatorComponent={() => <View style={styles.horizontalRule} />}

            scrollEnabled={false}
        />
    );
}



const styles = StyleSheet.create({
    horizontalRule: {
        marginVertical: 20,
        height: 3,
        backgroundColor: colors.horizontalRule
    }
})
export default OrderList;




const Item: React.FC<ListRenderItemInfo<IOrderList> & { name: string }> = ({ item, name }) => {

    const { navigate } = useNavigation<NativeStackNavigationProp<InvoiceStackParamList>>();

    const handlePress = () => navigate(route.invoices.detail, { id: item._id })

    return (
        <View style={itemStyles.container}>
            <InvoiceIcon width={30} height={30} fill={"#828282"} />

            <View style={itemStyles.infoContainer}>
                <RobotoText style={itemStyles.name}>{name}</RobotoText>

                <RobotoText style={itemStyles.address} numberOfLines={2}>{item.address}</RobotoText>
            </View>


            <PrimaryButton text="View Invoice" handlePress={handlePress} buttonStyle={itemStyles.button} />
        </View>
    );
}


const itemStyles = StyleSheet.create({
    address: {
        fontSize: 16,
        marginTop: 5
    },

    button: {
        borderRadius: 50,
        paddingHorizontal: 20
    },

    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        columnGap: 20
    },

    infoContainer: {
        flex: 1
    },

    name: {
        fontSize: 20
    }
})
