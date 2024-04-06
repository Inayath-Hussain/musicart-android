import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MainTabStackParamList, ShopStackParamList } from "../config/interface";
import { route } from "../routes";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import CartScreen from "../Screens/CartScreen";
import CheckoutScreen from "../Screens/CheckoutScreen";

const shopStackNavigator = createNativeStackNavigator<ShopStackParamList>();


const ShopStackNavigator: React.FC<BottomTabScreenProps<MainTabStackParamList, "shop">> =
    ({ route: routeProp, navigation }) => {
        return (
            <shopStackNavigator.Navigator initialRouteName={route.shop.cart}>
                <shopStackNavigator.Screen name={route.shop.cart} component={CartScreen} />
                <shopStackNavigator.Screen name={route.shop.checkout} component={CheckoutScreen} />
            </shopStackNavigator.Navigator>
        );
    }

export default ShopStackNavigator;