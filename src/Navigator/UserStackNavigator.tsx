import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";


import { LoginStackParamList, MainTabStackParamList } from "../config/interface";
import { route } from "../routes";
import LoginScreen from "../Screens/LoginScreen";
import RegisterScreen from "../Screens/RegisterScreen";


const userStackNavigator = createNativeStackNavigator<LoginStackParamList>();


const UserStackNavigator: React.FC<BottomTabScreenProps<MainTabStackParamList, 'user'>> =
    ({ route: routeProp, navigation }) => {
        return (
            <userStackNavigator.Navigator initialRouteName={route.users.login} screenOptions={{ headerShown: false, presentation: "card", contentStyle: styles.content, animation: "fade" }} >
                <userStackNavigator.Screen name={route.users.login} component={LoginScreen} />
                <userStackNavigator.Screen name={route.users.register} component={RegisterScreen} />
            </userStackNavigator.Navigator>
        );
    }



const styles = StyleSheet.create({
    content: {
        backgroundColor: "transparent",
        flexGrow: 1
    }
})

export default UserStackNavigator;