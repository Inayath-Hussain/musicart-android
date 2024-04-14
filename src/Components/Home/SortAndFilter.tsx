import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Text, View, ScrollView } from "react-native";

import { colors } from "../../config/color";
import DrawerSelect, { ICustomSelectoption } from "../Common/DrawerSelect";

import {
    IUpdateProductQueryActionPayload,
    productQuerySelector,
    updateOptions,
    updateProductQuery
} from "@src/store/slices/productQuery";
import { useGetProductsQuery } from "@src/store/slices/productApi";


const SortAndFilter = () => {


    const { queryOptions, queryString, options } = useSelector(productQuerySelector);
    const dispatch = useDispatch()

    const { color, company, headphoneType, name, price, sortBy } = queryOptions;

    // dispatch function for updateProductQuery action
    const updateProductQueryDispatch = (payload: IUpdateProductQueryActionPayload) => dispatch(updateProductQuery(payload))


    // event handlers for all select elements.
    // it is a function which takes onChange event handler paramter and returns functions for different select elements
    const handleChange = (value: string) => ({

        sort: () => updateProductQueryDispatch({ key: "sortBy", value }),
        headphoneType: () => updateProductQueryDispatch({ key: "headphoneType", value }),
        company: () => updateProductQueryDispatch({ key: "company", value }),
        color: () => updateProductQueryDispatch({ key: "color", value }),
        price: () => updateProductQueryDispatch({ key: "price", value })

    })

    const { isSuccess, data } = useGetProductsQuery(queryString, { refetchOnMountOrArgChange: true });

    useEffect(() => {

        const company: ICustomSelectoption = {}
        const color: ICustomSelectoption = {}

        if (isSuccess && !options.extracted) {
            data.forEach(d => {
                company[d.brand] = d.brand
                color[d.color] = d.color
            })

            dispatch(updateOptions({ extracted: true, color, company }))
        }

    }, [isSuccess])



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

    // string representation of indian rupee symbol 
    const rupeeSymbol = String.fromCharCode(8377)

    // format number according to indian numeral system
    const getPriceFormat = (value: number) => `${rupeeSymbol}${Intl.NumberFormat("en-In").format(value)}`

    const priceOptions: ICustomSelectoption = {
        "0-1000": `${getPriceFormat(0)} - ${getPriceFormat(1000)}`,
        "1000-10000": `${getPriceFormat(1000)} - ${getPriceFormat(10000)}`,
        "10000-20000": `${getPriceFormat(10000)} - ${getPriceFormat(20000)}`
    }


    return (
        <ScrollView horizontal style={styles.container}
            contentContainerStyle={styles.containerFlex} >

            <DrawerSelect value={sortBy} handleChange={(value) => handleChange(value).sort()}
                defaultText="Sort By" options={sortOptions} featureOption />


            <View style={styles.filterContainer}>


                <DrawerSelect value={headphoneType} handleChange={(value) => handleChange(value).headphoneType()}
                    defaultText="Headphone Type" options={headphoneTypeOptions} style={styles.filter} featureOption />

                <DrawerSelect value={company} handleChange={(value) => handleChange(value).company()}
                    defaultText="Company" options={options.company} style={styles.filter} featureOption />

                <DrawerSelect value={color} handleChange={(value) => handleChange(value).color()}
                    defaultText="Color" options={options.color} style={styles.filter} featureOption />


                <DrawerSelect value={price} handleChange={(value) => handleChange(value).price()}
                    defaultText="Price" options={priceOptions} style={styles.filter} featureOption />

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