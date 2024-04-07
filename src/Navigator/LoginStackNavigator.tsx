import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

import { LoginStackParamList, MainTabStackParamList } from "../config/interface";
import { route } from "../routes";
import LoginScreen from "../Screens/LoginScreen";
import RegisterScreen from "../Screens/RegisterScreen";

const userStackNavigator = createNativeStackNavigator<LoginStackParamList>();



const UserStackNavigator: React.FC<BottomTabScreenProps<MainTabStackParamList, 'user'>> =
    ({ route: routeProp, navigation }) => {
        return (
            <userStackNavigator.Navigator initialRouteName={route.users.login} >
                <userStackNavigator.Screen name={route.users.login} component={LoginScreen} />
                <userStackNavigator.Screen name={route.users.register} component={RegisterScreen} />
            </userStackNavigator.Navigator>
        );
    }

export default UserStackNavigator;