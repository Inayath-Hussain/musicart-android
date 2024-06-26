import { StyleSheet, View, ViewStyle } from "react-native";
import { DropdownSelect } from "react-native-input-select";
import { colors } from "../../config/color";
import { fonts } from "../../config/fonts";


export interface ICustomSelectoption {
    [value: string]: string
}

export interface ICustomSelectProps {
    options: ICustomSelectoption
    style?: ViewStyle
    defaultText: string
    featureOption?: boolean

    value: string
    handleChange: (value: string) => void
}



const DrawerSelect: React.FC<ICustomSelectProps> = ({ options, defaultText, handleChange, value, style = {}, featureOption = false }) => {

    const optionsData = featureOption ? [{ title: "Featured", data: "featured" }] : []

    return (
        <View style={{ justifyContent: "center", alignItems: "flex-start" }}>

            <DropdownSelect
                placeholder={defaultText}
                options={
                    [
                        ...optionsData,
                        ...Object.keys(options).map(o => ({ data: o, title: options[o] }))
                    ]
                }
                optionLabel="title"
                optionValue="data"

                selectedValue={value}
                onValueChange={(value: string) => handleChange(value === "featured" ? "" : value)}

                dropdownStyle={{ ...styles.select, ...style }}
                selectedItemStyle={styles.displayValue}

                dropdownIconStyle={styles.dropDownIcon}

                isMultiple={false}
                isSearchable={false}

                listComponentStyles={{
                    itemSeparatorStyle: styles.optionSeparator,
                }}

                placeholderStyle={styles.placeholder}

                primaryColor={colors.blue}

            />
        </View>
    );
}



const styles = StyleSheet.create({

    // styles on the label of selected value being displayed
    displayValue: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start"
    },


    dropDownIcon: {
        position: "relative",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,

        alignSelf: "center"
    },


    optionSeparator: {
        backgroundColor: colors.black,
        marginVertical: 5
    },


    placeholder: {
        fontFamily: fonts.roboto
    },

    select: {
        columnGap: 10,
        borderRadius: 6,
        paddingVertical: 8,
        paddingHorizontal: 18,

        color: colors.black,

        minHeight: "auto",

        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start"
    },


})


export default DrawerSelect;