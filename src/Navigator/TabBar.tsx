import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

import RobotoText from "../Components/Common/Roboto/Text";
import HomeIcon from "../Components/Icons/Home";
import InvoiceIcon from "../Components/Icons/Invoice";
import LoginIcon from "../Components/Icons/Login";
import { colors } from "../config/color";
import { route } from "../routes";
import LogoutIcon from "@src/Components/Icons/Logout";
import Cart from "./Cart";




interface Idata {
    label: string,
    onPress: () => void
    onLongPress: () => void
    Icon: React.JSX.Element
    index: number
}


interface Iprops {
    loggedIn: boolean
    logout: () => void
}


const TabBar: React.FC<BottomTabBarProps & Iprops> = ({ descriptors, insets, navigation, state, loggedIn, logout }) => {

    const IconSize = 25;
    const icons = {
        [route.home.index]: <HomeIcon width={IconSize} height={IconSize} />,
        [route.shop.index]: <Cart width={IconSize} height={IconSize} />,
        [route.invoices.index]: <InvoiceIcon width={IconSize} height={IconSize} />,

        // switch icon depending on auth tokens
        [route.users.index]: <LoginIcon width={IconSize} height={IconSize} />
    }


    // array of objects used to display nav icons in tab bar and navigate between screens
    const data: Idata[] = []




    state.routes.map((stateRoute, index) => {

        const { options } = descriptors[stateRoute.key];

        // text to display below icon
        const label = options.title ? options.title : stateRoute.name;


        let key = stateRoute.key;
        let name = stateRoute.name;
        let params = stateRoute.params;

        // for protected routes like cart and invoice, if user is not logged in then navigate to login screen
        if (stateRoute.name === route.shop.index || stateRoute.name === route.invoices.index) {
            if (loggedIn === false) {
                const userRoute = state.routes.find(s => s.name === route.users.index);

                // this is just a safety measure, if user route is not found then use their respective one's.
                key = userRoute?.key || key
                name = userRoute?.name || name
                params = userRoute?.params || params
            }
        }

        const onPress = () => {
            const event = navigation.emit({
                type: 'tabPress',
                target: key,
                canPreventDefault: true
            });

            const isFocused = state.index === index

            if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(name, params);
            }
        };


        const onLongPress = () => {
            navigation.emit({
                type: 'tabLongPress',
                target: key,
            });
        };

        // icon to render
        const Icon = icons[stateRoute.name as keyof typeof icons]



        // for login route if user is loggedin then provide logout functionality
        if (stateRoute.name === route.users.index && loggedIn) {

            const onPress = () => {
                const event = navigation.emit({
                    type: 'tabPress',
                    target: stateRoute.key,
                    canPreventDefault: true
                });

                const isFocused = state.index === index

                if (!isFocused && !event.defaultPrevented) {
                    logout();
                }
            }


            const onLongPress = () => {
                logout()
            }

            const Icon = <LogoutIcon width={IconSize} height={IconSize} />

            data.push({ label: "Logout", onPress, onLongPress, Icon, index })

            return
        }

        data.push({ label, onPress, onLongPress, Icon, index })

        return;
    })



    return (
        <View style={styles.container}>

            {data.map(d => (
                <TouchableWithoutFeedback key={d.label}
                    onPress={d.onPress} onLongPress={d.onLongPress}>

                    <View style={[styles.link, d.index === state.index ? styles.linkActive : {}]}>
                        {d.Icon}
                        <RobotoText style={styles.linkText}>{d.label}</RobotoText>
                    </View>

                </TouchableWithoutFeedback>

            ))}


        </View>
    );
}




const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        width: "100%",

        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",

        borderTopWidth: 2,
        borderTopColor: "#C8C8C8"
    },

    link: {
        display: "flex",
        justifyContent: "center",
        alignItems: 'center',

        paddingTop: 12,

        borderTopWidth: 4,
        borderTopColor: colors.white,


        minWidth: 50
    },

    linkActive: {
        borderTopColor: colors.primaryColor
    },

    linkText: {
        fontWeight: "600",
        fontSize: 16,
        color: colors.black,
    }
})


export default TabBar;