import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { InvoiceStackParamList, MainTabStackParamList } from "../config/interface";
import { route } from "../routes";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import InvoiceListScreen from "../Screens/InvoiceScreen";
import InvoiceDetailScreen from "../Screens/InvoiceDetail";

const invoiceStackNavigator = createNativeStackNavigator<InvoiceStackParamList>();


const InvoiceStackNavigator: React.FC<BottomTabScreenProps<MainTabStackParamList, "invoices">> =
    ({ route: routeProp }) => {
        return (
            <invoiceStackNavigator.Navigator initialRouteName={route.invoices.list}>
                <invoiceStackNavigator.Screen name={route.invoices.list} component={InvoiceListScreen} />
                <invoiceStackNavigator.Screen name={route.invoices.detail} component={InvoiceDetailScreen} />
            </invoiceStackNavigator.Navigator>
        );
    }

export default InvoiceStackNavigator;