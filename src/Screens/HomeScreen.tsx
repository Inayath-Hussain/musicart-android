import { StyleSheet, View } from "react-native";
import Banner from "../Components/Home/Banner";
import SortAndFilter from "../Components/Home/SortAndFilter";



const HomeScreen = () => {

    return (
        <View style={styles.page_layout}>
            <Banner />

            <SortAndFilter />

        </View>
    );
}


const styles = StyleSheet.create({
    page_layout: {
        paddingHorizontal: 10,
        paddingVertical: 10
    }
})

export default HomeScreen;