import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet, TextInput, TouchableWithoutFeedback, View } from 'react-native';

import RobotoText from '@src/Components/Common/Roboto/Text';
import { fonts } from '@src/config/fonts';
import PrimaryButton from '@src/Components/Common/PrimaryButton';
import { LoginStackParamList } from '@src/config/interface';
import { colors } from '@src/config/color';


const LoginScreen: React.FC<NativeStackScreenProps<LoginStackParamList, "login">> = ({ navigation }) => {

    const handleLogin = () => {
        console.log("login ... ")
    }



    return (
        <ScrollView contentContainerStyle={styles.layout}>

            <RobotoText style={styles.heading}>Welcome</RobotoText>

            {/* login form */}
            <View style={styles.container}>

                <View style={styles.header_container}>
                    <RobotoText style={styles.header_text_bold}>Sign in.</RobotoText>

                    <RobotoText style={styles.header_text_normal}>Already a customer?</RobotoText>
                </View>


                {/* email or number */}
                <RobotoText style={styles.label}>
                    Enter your email or mobile number
                </RobotoText>
                <TextInput
                    keyboardType="email-address" textContentType="emailAddress"
                    style={styles.textInput} />


                {/* password */}
                <RobotoText style={styles.label}>
                    Password
                </RobotoText>
                <TextInput onChangeText={value => console.log(value)}
                    keyboardType="default" textContentType="password" secureTextEntry={true}
                    style={styles.textInput} />


                <PrimaryButton text="Continue" handlePress={handleLogin} buttonStyle={styles.button} />

                <RobotoText style={styles.conditions_and_privacy}>
                    By continuing, you agree to Musicart privacy notice and conditions of use.
                </RobotoText>

            </View>




            {/* divider */}
            <View style={styles.dividerContainer}>
                <View style={styles.horizontalRule} />

                <RobotoText>New to Musicart?</RobotoText>

                <View style={styles.horizontalRule} />
            </View>




            {/* register link */}
            <TouchableWithoutFeedback onPress={() => navigation.navigate("register")}>
                <View style={styles.registerButton}>
                    <RobotoText style={styles.registerText}>Create your Musicart account</RobotoText>
                </View>
            </TouchableWithoutFeedback>

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
        columnGap: 10,
        marginBottom: 10
    },


    header_text_bold: {
        fontWeight: "700",
        fontSize: 20
    },


    header_text_normal: {
        fontWeight: "400",
        fontSize: 20
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

    registerButton: {
        borderWidth: 2,
        borderColor: "#BDBDBD",
        borderRadius: 6,
        paddingVertical: 8,

        alignItems: "center"
    },

    registerText: {
        fontSize: 18
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

export default LoginScreen;