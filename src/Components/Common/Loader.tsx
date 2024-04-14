import { PropsWithChildren } from "react";
import { Modal, StyleSheet, View } from "react-native";


const Loader: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <Modal transparent>
            <View style={styles.modal}>
                {children}
            </View>
        </Modal>
    );
}



const styles = StyleSheet.create({
    modal: {
        backgroundColor: "#00000070",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default Loader;