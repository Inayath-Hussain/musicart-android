import { Fragment, useEffect, useState } from "react";
import {
    KeyboardType,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableWithoutFeedback,
    View
} from "react-native";
import z from "zod";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useNetInfo } from "@react-native-community/netinfo";


import PrimaryButton from "@src/Components/Common/PrimaryButton";
import RobotoText from "@src/Components/Common/Roboto/Text";
import { colors } from "@src/config/color";
import { fonts } from "@src/config/fonts";
import { LoginStackParamList, MainTabStackParamList } from "@src/config/interface";
import { RegisterBodyError, registerService } from "@src/services/user/register";
import { useAbortController } from "@src/hooks/useAbortController";
import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { ApiError, CancelledError } from "@src/services/errors";
import FormError from "@src/Components/Common/FormError";

const RegisterScreen: React.FC<NativeStackScreenProps<LoginStackParamList, "register">> = ({ navigation }) => {

    const baseRequirement = (fieldName: string) => z.string().trim().min(1, { message: `${fieldName} is required` })
    // validation schema for form values
    const schema = z.object({
        name: baseRequirement("name"),
        mobileNumber: baseRequirement("mobile number"),
        email: baseRequirement("email").email("email is invalid"),
        password: baseRequirement("password").min(8, "must be atleast 8 letters long")
    })

    type IForm = z.infer<typeof schema>

    const [formValues, setFormValues] = useState<IForm>({
        name: "",
        mobileNumber: "",
        email: "",
        password: ""
    })

    const initalErrors: IForm = {
        name: "",
        mobileNumber: "",
        email: "",
        password: ""
    }

    // state variable to store all form field errors
    const [formErrors, setFormErrors] = useState<IForm>(initalErrors)

    // state variable contain to display form submition error
    const [submitionError, setSubmitionError] = useState("");

    // state variable to indicate if a request is pending
    const [loading, setLoading] = useState(false);


    const { signalRef } = useAbortController();
    const { isConnected: isOnline } = useNetInfo();
    const mainNavigation = useNavigation<BottomTabNavigationProp<MainTabStackParamList>>();


    useEffect(() => {
        setSubmitionError(isOnline ? "" : "You are offline");
    }, [isOnline])



    // updates form input values
    const handleChange = (key: keyof IForm, value: string) => setFormValues(prev => ({ ...prev, [key]: value }))

    const handleRegister = async () => {
        console.log("register ... ")

        try {
            // validate form values
            schema.parse(formValues)

            setLoading(true)
            const { name, mobileNumber, email, password } = formValues;
            await registerService({ name, mobileNumber, email, password }, signalRef.current.signal)

            mainNavigation.goBack();
            setLoading(false)
        }
        catch (ex) {
            setLoading(false)
            switch (true) {
                case (ex instanceof z.ZodError):
                    const { name, mobileNumber, email, password } = ex.formErrors.fieldErrors

                    return setFormErrors({
                        name: name ? name[0] : "",
                        mobileNumber: mobileNumber ? mobileNumber[0] : "",
                        email: email ? email[0] : "",
                        password: password ? password[0] : ""
                    })

                case (ex instanceof RegisterBodyError):
                    return setFormErrors({
                        name: ex.errors.name || "",
                        mobileNumber: ex.errors.mobileNumber || "",
                        email: ex.errors.email || "",
                        password: ex.errors.password || ""
                    })

                case (ex instanceof CancelledError):
                    break;

                case (ex instanceof ApiError):
                    setSubmitionError(ex.message)
            }

            setFormErrors(initalErrors)
        }

    }

    interface Input {
        label: string
        key: keyof IForm

        keyboardType: KeyboardType
        textContentType: TextInput["props"]["textContentType"]

        secureTextEntry?: boolean
    }

    const InputArr: Input[] = [
        { label: "Your name", key: "name", keyboardType: "default", textContentType: "name" },
        { label: "Mobile number", key: "mobileNumber", keyboardType: "numeric", textContentType: "telephoneNumber" },
        { label: "Email Id", key: "email", keyboardType: "email-address", textContentType: "emailAddress" },
        { label: "Password", key: "password", keyboardType: "default", textContentType: "password", secureTextEntry: true }
    ]


    const getInputClass = (error: string) => [styles.textInput, error !== "" ? styles.textInputError : {}]


    return (
        <ScrollView contentContainerStyle={styles.layout}>

            <RobotoText style={styles.heading}>Welcome</RobotoText>

            {/* register form */}
            <View style={styles.container}>

                {/* main error message */}
                <FormError errorMessage={submitionError} type='Form' style={styles.submitionErrorMessage} />

                <View style={styles.header_container}>
                    <RobotoText style={styles.header_text_bold}>Create account.</RobotoText>

                    <RobotoText style={styles.header_text_normal}>Don’t have an account?</RobotoText>
                </View>



                {InputArr.map(i => (
                    <Fragment key={i.key}>
                        <RobotoText style={styles.label}>
                            {i.label}
                        </RobotoText>

                        <TextInput value={formValues[i.key]} onChangeText={(value) => handleChange(i.key, value)}
                            keyboardType={i.keyboardType} textContentType={i.textContentType}
                            style={getInputClass(formErrors[i.key])} secureTextEntry={i.secureTextEntry || false} />
                        <FormError errorMessage={formErrors[i.key]} type='Field' />

                    </Fragment>
                ))}




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
                <TouchableWithoutFeedback onPress={() => navigation.replace("login")}>
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
    },

    textInputError: {
        borderColor: colors.errorColor
    },

    submitionErrorMessage: {
        fontSize: 20,
        marginBottom: 20
    }

})



export default RegisterScreen;