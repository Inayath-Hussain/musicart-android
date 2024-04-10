import { ScrollView, StyleSheet } from "react-native";
import Banner from "../Components/Home/Banner";
import SortAndFilter from "../Components/Home/SortAndFilter";
import ProductList from "@src/Components/Home/ProductList";



const HomeScreen = () => {

    return (
        <ScrollView style={styles.page_layout}>
            <Banner />

            <SortAndFilter />

            <ProductList />

        </ScrollView>
    );
}


const styles = StyleSheet.create({
    page_layout: {
        paddingHorizontal: 10,
        paddingVertical: 10
    }
})

export default HomeScreen;