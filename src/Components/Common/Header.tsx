import { NavigationContainerRef, Route } from "@react-navigation/native";
import { Image, StyleSheet, View } from "react-native";

import { MainTabStackParamList } from "@src/config/interface";
import { route } from "@src/routes";
import SearchBar from "./SearchBar";
import { colors } from "@src/config/color";
import RobotoText from "./Roboto/Text";
import { useContext, useEffect, useState } from "react";
import { navigationContext } from "@src/contexts/navigationContext";


const Header = () => {

    const { currentRoute } = useContext(navigationContext)

    const searchbarRoutes: (Route<string> | string)[] = [
        route.home.productList,
        route.home.productDetail,
        route.shop.cart
    ]

    const showSearchbar = searchbarRoutes.includes(currentRoute)


    if (showSearchbar)
        return (
            <SearchBar />
        )

    return (
        <View style={styles.container}>
            <Image source={require("@src/assets/images/logo.png")} />

            <RobotoText style={styles.text}>Musicart</RobotoText>
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primaryColor,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        columnGap: 10,

        paddingHorizontal: 20,
        paddingVertical: 12,
        height: 66
    },


    text: {
        color: colors.white,
        fontSize: 22
    }
})


export default Header;