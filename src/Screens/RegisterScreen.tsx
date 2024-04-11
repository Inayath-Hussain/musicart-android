import {
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableWithoutFeedback,
    View
} from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";


import PrimaryButton from "@src/Components/Common/PrimaryButton";
import RobotoText from "@src/Components/Common/Roboto/Text";
import { colors } from "@src/config/color";
import { fonts } from "@src/config/fonts";
import { LoginStackParamList } from "@src/config/interface";

const RegisterScreen: React.FC<NativeStackScreenProps<LoginStackParamList, "register">> = ({ navigation }) => {


    const handleRegister = () => {
        console.log("register ... ")
    }


    return (
        <ScrollView contentContainerStyle={styles.layout}>

            <RobotoText style={styles.heading}>Welcome</RobotoText>

            {/* login form */}
            <View style={styles.container}>

                <View style={styles.header_container}>
                    <RobotoText style={styles.header_text_bold}>Create account.</RobotoText>

                    <RobotoText style={styles.header_text_normal}>Don’t have an account?</RobotoText>
                </View>


                {/* name */}
                <RobotoText style={styles.label}>
                    Your name
                </RobotoText>
                <TextInput
                    textContentType="name"
                    style={styles.textInput} />


                {/* mobile number */}
                <RobotoText style={styles.label}>
                    Mobile number
                </RobotoText>
                <TextInput
                    keyboardType="numeric" textContentType="telephoneNumber"
                    style={styles.textInput} />


                {/* email */}
                <RobotoText style={styles.label}>
                    Email Id
                </RobotoText>
                <TextInput
                    keyboardType="email-address" textContentType="emailAddress"
                    style={styles.textInput} />


                {/* email */}
                <RobotoText style={styles.label}>
                    Password
                </RobotoText>
                <TextInput
                    keyboardType="default" textContentType="password" secureTextEntry={true}
                    style={styles.textInput} />


                <RobotoText style={[styles.conditions_and_privacy, styles.registerConditionText]}>
                    By enrolling your mobile phone number, you consent to receive automated security notifications via text message from Musicart. Message and data rates may apply.
                </RobotoText>


                <PrimaryButton text="Continue" handlePress={handleRegister} buttonStyle={styles.button} />

                <RobotoText style={styles.conditions_and_privacy}>
                    By continuing, you agree to Musicart privacy notice and conditions of use.
                </RobotoText>

            </View>




            {/* register link */}
            <RobotoText style={styles.loginText}>
                Already have an account?
                <TouchableWithoutFeedback onPress={() => navigation.navigate("login")}>
                    <RobotoText style={styles.loginTextLink}> Sign in</RobotoText>
                </TouchableWithoutFeedback>
            </RobotoText>


        </ScrollView>
    );
}




const styles = StyleSheet.create({

    button: {
        marginVertical: 25
    },

    conditions_and_privacy: {
        textAlign: "left"
    },

    container: {
        borderColor: "#D0D0D0",
        borderWidth: 2,
        borderRadius: 6,

        padding: 16,
        paddingBottom: 36
    },

    dividerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        columnGap: 20,

        marginVertical: 30
    },

    header_container: {
        flexDirection: "row",
        columnGap: 5,
        marginBottom: 10,
        alignItems: "baseline"
    },


    header_text_bold: {
        fontWeight: "700",
        fontSize: 20
    },


    header_text_normal: {
        fontWeight: "400",
        fontSize: 16
    },

    heading: {
        fontSize: 28,
        marginTop: 26,
        marginBottom: 22
    },

    horizontalRule: {
        height: 1,
        backgroundColor: "#BDBDBD",
        flex: 1
    },

    label: {
        fontSize: 16,
        fontWeight: "500",

        marginTop: 15,
        marginBottom: 7
    },

    layout: {
        paddingHorizontal: 20,
        flexGrow: 1,
        backgroundColor: colors.white
    },

    loginText: {
        marginTop: 30,
        marginBottom: 40,
        fontWeight: "700",
        fontSize: 18,
        textAlign: "center"
    },

    loginTextLink: {
        textDecorationLine: "underline"
    },

    registerConditionText: {
        fontWeight: "700",
        marginTop: 15,
        fontSize: 13
    },

    textInput: {
        fontFamily: fonts.roboto,
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: "#B6B6B6",
        borderRadius: 5
    }

})



export default RegisterScreen;