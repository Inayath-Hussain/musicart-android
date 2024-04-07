import { StyleSheet, View } from "react-native";
import Banner from "../Components/Home/Banner";

const HomeScreen = () => {
    return (
        <View style={styles.page_layout}>
            <Banner />
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