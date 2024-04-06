import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginStackParamList, MainTabStackParamList } from "../config/interface";
import { route } from "../routes";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import LoginScreen from "../Screens/LoginScreen";
import RegisterScreen from "../Screens/RegisterScreen";
import { useEffect, useState } from "react";

const loginStackNavigator = createNativeStackNavigator<LoginStackParamList>();



const LoginStackNavigator: React.FC<BottomTabScreenProps<MainTabStackParamList, 'user'>> =
    ({ route: routeProp, navigation }) => {

        const [value, setValue] = useState(0);

        useEffect(() => {

            setValue(prev => prev + 1)
            console.log("user use effect ... ")

        }, [])

        return (
            <loginStackNavigator.Navigator initialRouteName={route.users.login} >
                <loginStackNavigator.Screen name={route.users.login} component={LoginScreen} />
                <loginStackNavigator.Screen name={route.users.register} component={RegisterScreen} />
            </loginStackNavigator.Navigator>
        );
    }

export default LoginStackNavigator;