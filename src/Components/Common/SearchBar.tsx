import { useRef, useState } from "react";
import { Image, StyleSheet, TextInput, TouchableWithoutFeedback, View } from "react-native";
import { colors } from "../../config/color";
import ClearIcon from "../Icons/Clear";


const SearchBar = () => {

    // input value
    const [value, setValue] = useState("");

    // used to track focus status of input
    const [inputFocused, setInputFocused] = useState(false);

    // used to focus and blur when respective buttons are pressed
    const inputRef = useRef<TextInput | null>(null);


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

                <TextInput ref={inputRef} value={value} onChangeText={e => setValue(e)}
                    onFocus={() => setInputFocused(true)} onBlur={() => setInputFocused(false)}
                    autoFocus={false} placeholder="Search Musicart" placeholderTextColor={"#909090"}
                    style={styles.input} />


                {
                    value &&
                    // clear icon
                    <TouchableWithoutFeedback onPress={() => setValue("")}>
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

        flex: 1
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