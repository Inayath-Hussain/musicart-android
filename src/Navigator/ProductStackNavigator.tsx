import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MainTabStackParamList, ProductStackParamList } from "../config/interface";
import { route } from "../routes";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import HomeScreen from "../Screens/HomeScreen";
import ProductDetail from "../Screens/ProductDetail";

const productStackNavigator = createNativeStackNavigator<ProductStackParamList>();


const ProductStackNavigator: React.FC<BottomTabScreenProps<MainTabStackParamList, "home">> =
    ({ route: routeProp, navigation }) => {
        return (
            <productStackNavigator.Navigator initialRouteName={route.home.productList}>
                <productStackNavigator.Screen name={route.home.productList} component={HomeScreen} />
                <productStackNavigator.Screen name={route.home.productDetail} component={ProductDetail} />
            </productStackNavigator.Navigator>
        );
    }

export default ProductStackNavigator;