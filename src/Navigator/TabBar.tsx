import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

import RobotoText from "../Components/Common/Roboto/Text";
import HomeIcon from "../Components/Icons/Home";
import CartIcon from "../Components/Icons/Cart";
import InvoiceIcon from "../Components/Icons/Invoice";
import LoginIcon from "../Components/Icons/Login";
import { colors } from "../config/color";
import { route } from "../routes";




interface Idata {
    label: string,
    onPress: () => void
    onLongPress: () => void
    Icon: React.JSX.Element
    index: number
}


const TabBar: React.FC<BottomTabBarProps> = ({ descriptors, insets, navigation, state }) => {

    const IconSize = 25;
    const icons = {
        [route.home.index]: <HomeIcon width={IconSize} height={IconSize} />,
        [route.shop.index]: <CartIcon width={IconSize} height={IconSize} />,
        [route.invoices.index]: <InvoiceIcon width={IconSize} height={IconSize} />,

        // switch icon depending on auth tokens
        [route.users.index]: <LoginIcon width={IconSize} height={IconSize} />
    }


    // array of objects used to display nav icons in tab bar and navigate between screens
    const data: Idata[] = []




    state.routes.map((route, index) => {

        const { options } = descriptors[route.key];

        // text to display below icon
        const label = options.title ? options.title : route.name;

        const onPress = () => {
            const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true
            });

            const isFocused = state.index === index

            if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name, route.params);
            }
        };


        const onLongPress = () => {
            navigation.emit({
                type: 'tabLongPress',
                target: route.key,
            });
        };

        // icon to render
        const Icon = icons[route.name as keyof typeof icons]

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