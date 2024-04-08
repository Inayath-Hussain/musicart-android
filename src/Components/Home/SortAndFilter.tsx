import { useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { colors } from "../../config/color";
import DrawerSelect, { ICustomSelectoption } from "../Common/DrawerSelect";

const SortAndFilter = () => {

    const [sortBy, setSortBy] = useState("");
    const [headphoneType, setHeadphoneType] = useState("");
    const [company, setCompany] = useState("");
    const [color, setColor] = useState("");
    const [price, setPrice] = useState("");


    const sortOptions: ICustomSelectoption = {
        "price_asc": "Price : Lowest",
        "price_desc": "Price : Highest",
        "name_asc": "Name : (A-Z)",
        "name_desc": "Name : (Z-A)"
    }


    const headphoneTypeOptions: ICustomSelectoption = {
        "in-ear": "In-ear headphone",
        "on-ear": "On-ear headphone",
        "over-ear": "Over-ear headphone"
    }


    const companyOptions: ICustomSelectoption = {
        "jbl": "JBL",
        "sony": "Sony"
    }


    const colorOptions = {
        "Red": "Red",
        "Blue": "Blue"
    }

    const rupeeSymbol = String.fromCharCode(8377)

    const getPriceFormat = (value: number) => `${rupeeSymbol}${Intl.NumberFormat("en-In").format(value)}`

    const priceOptions: ICustomSelectoption = {
        "0-1000": `${getPriceFormat(0)} - ${getPriceFormat(1000)}`,
        "1000-10000": `${getPriceFormat(1000)} - ${getPriceFormat(10000)}`,
        "10000-20000": `${getPriceFormat(10000)} - ${getPriceFormat(20000)}`
    }


    return (
        <ScrollView horizontal style={styles.container}
            contentContainerStyle={styles.containerFlex} >

            <DrawerSelect value={sortBy} handleChange={(e) => setSortBy(e)}
                defaultText="Sort By" options={sortOptions} />


            <View style={styles.filterContainer}>


                <DrawerSelect value={headphoneType} handleChange={(value) => setHeadphoneType(value)}
                    defaultText="Headphone Type" options={headphoneTypeOptions} style={styles.filter} />

                <DrawerSelect value={company} handleChange={(value) => setCompany(value)}
                    defaultText="Company" options={companyOptions} style={styles.filter} />

                <DrawerSelect value={color} handleChange={(value) => setColor(value)}
                    defaultText="Color" options={colorOptions} style={styles.filter} />


                <DrawerSelect value={price} handleChange={(value) => setPrice(value)}
                    defaultText="Price" options={priceOptions} style={styles.filter} />

            </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({

    container: {
        borderBottomWidth: 1,
        borderBottomColor: "#BBBABA"

    },

    containerFlex: {
        columnGap: 40,
        justifyContent: "flex-start"
    },

    filterContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        columnGap: 20
    },

    filter: {
        backgroundColor: "#D9D9D9"
    }
})

export default SortAndFilter;