import { MutableRefObject, forwardRef, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Image, StyleSheet, TextInput, TouchableWithoutFeedback, View } from "react-native";
import { NavigationContainerRef, Route, createNavigationContainerRef } from "@react-navigation/native";

import { colors } from "../../config/color";
import ClearIcon from "../Icons/Clear";
import { fonts } from "../../config/fonts";
import { productQuerySelector, updateProductQuery } from "@src/store/slices/productQuery";
import { route } from "@src/routes";
import { MainTabStackParamList } from "@src/config/interface";


interface Iprops {
    navigationRef: NavigationContainerRef<MainTabStackParamList> | null
}


const SearchBar: React.FC<Iprops> = ({ navigationRef }) => {

    const [currentRoute, setCurrentRoute] = useState<string | Route<string>>(route.home.index);

    // local input state variable, used to provide input clear option
    const [value, setValue] = useState("");

    useEffect(() => {

        const getCurrentRoute = () => {
            console.log(navigationRef?.getCurrentRoute())

            setCurrentRoute(navigationRef?.getCurrentRoute()?.name || "")
        }

        // navigationRef.addListener("ready", () => console.log("ready"))
        navigationRef && navigationRef.addListener("state", getCurrentRoute)

        return () => {
            navigationRef && navigationRef.removeListener("state", getCurrentRoute)
        }
    }, [navigationRef]);

    // used to track focus status of input
    const [inputFocused, setInputFocused] = useState(false);

    // used to focus and blur when respective buttons are pressed
    const inputRef = useRef<TextInput | null>(null);

    // const { name, path, params } = useRoute();

    const { queryString } = useSelector(productQuerySelector)
    const dispatch = useDispatch();


    const timeOutRef = useRef<NodeJS.Timeout>();

    // debounce function to minimize sending api requests
    const handleChange = (value: string) => {

        setValue(value)
        clearTimeout(timeOutRef.current)

        timeOutRef.current = setTimeout(() => {
            dispatch(updateProductQuery({ key: "name", value: value }))

            // in mobile device when user's use search bar from other pages such as cart then user is navigated to products list page
            if (currentRoute !== route.home.productList) navigationRef?.navigate(route.home.index, { screen: "product-list" })
        }, 900)
    }



    return (
        <View style={styles.container}>

            <View style={styles.inputContainer}>

                {
                    inputFocused === false ?
                        // focus icon
                        <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
                            <Image source={require("../../assets/icons/search_icon.png")}
                                style={styles.searchImage} />
                        </TouchableWithoutFeedback>
                        :
                        // blur icon
                        <TouchableWithoutFeedback onPress={() => inputRef.current?.blur()} >
                            <Image source={require("../../assets/icons/go_back.png")}
                                width={50} height={50} style={styles.closeImage} />
                        </TouchableWithoutFeedback>
                }

                <TextInput ref={inputRef} value={value} onChangeText={value => handleChange(value)}
                    onFocus={() => setInputFocused(true)} onBlur={() => setInputFocused(false)}
                    autoFocus={false} placeholder="Search Musicart" placeholderTextColor={"#909090"}
                    style={styles.input} />


                {
                    value &&
                    // clear icon
                    <TouchableWithoutFeedback onPress={() => handleChange("")}>
                        <ClearIcon width={25} height={25} />
                    </TouchableWithoutFeedback>
                }

            </View>

        </View>
    );
}



const styles = StyleSheet.create({
    closeImage: {
        marginLeft: 9
    },


    container: {
        backgroundColor: colors.primaryColor,
        paddingVertical: 12,
        paddingHorizontal: 20,

        paddingLeft: 15,

    },


    searchImage: {
        width: 25,
        height: 25,
    },


    input: {
        paddingVertical: 7,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: colors.white,

        flex: 1,

        fontFamily: fonts.roboto
    },


    inputContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",

        backgroundColor: colors.white,

        borderRadius: 4,

        paddingLeft: 10,
        paddingRight: 10
    }
})


export default SearchBar;