import { useEffect, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import z from "zod";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNetInfo } from "@react-native-community/netinfo";


import RobotoText from '@src/Components/Common/Roboto/Text';
import PrimaryButton from '@src/Components/Common/PrimaryButton';
import { colors } from '@src/config/color';
import { fonts } from '@src/config/fonts';
import { LoginStackParamList, MainTabStackParamList } from '@src/config/interface';
import FormError from '@src/Components/Common/FormError';
import { LoginBodyError, loginService } from '@src/services/user/login';
import { ApiError, CancelledError } from '@src/services/errors';
import { useAbortController } from '@src/hooks/useAbortController';
import { route } from '@src/routes';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';


const LoginScreen: React.FC<NativeStackScreenProps<LoginStackParamList, "login">> = ({ navigation: StackNavigation, route: routeProp }) => {

    const { params } = routeProp;

    const nextRoute = params?.path ? params.path : route.home.index

    // validation schema for form values
    const schema = z.object({
        identifier: z.string().trim().min(1, "identifier is required"),
        password: z.string().trim().min(8, "must be atleast 8 letters long")
    }).refine(({ identifier }) => {

        // checks if the identifier value is either a valid email or a valid mobile number
        const emailSchema = z.string().trim().email()
        const mobileNumberSchema = /^[0-9]+$/

        const emailValidationResult = emailSchema.safeParse(identifier)

        return emailValidationResult.success || mobileNumberSchema.test(identifier)
    }, { message: "should be an email or mobile number", path: ["identifier"] })

    type IForm = z.infer<typeof schema>



    const [formValues, setFormValues] = useState<IForm>({
        identifier: "",
        password: ""
    });

    const initialFormErrors: IForm = {
        identifier: "",
        password: ""
    }

    const [formErrors, setFormErrors] = useState<IForm>(initialFormErrors)

    // state variable contain to display form submition error
    const [submitionError, setSubmitionError] = useState("");

    // state variable to indicate if a request is pending
    const [loading, setLoading] = useState(false);


    // updates form input values
    const handleChange = (key: keyof IForm, value: string) => setFormValues(prev => ({ ...prev, [key]: value }))


    const { signalRef } = useAbortController();
    const { isConnected: isOnline } = useNetInfo();

    const mainNavigation = useNavigation<BottomTabNavigationProp<MainTabStackParamList>>();


    useEffect(() => {
        setSubmitionError(isOnline ? "" : "You are offline");
    }, [isOnline])


    const handleLogin = async () => {

        if (isOnline === false) return

        try {
            schema.parse(formValues)

            setLoading(true)
            const { identifier, password } = formValues
            await loginService({ identifier, password }, signalRef.current.signal)

            mainNavigation.goBack();
            setLoading(false)
        }
        catch (ex) {
            setLoading(false);
            switch (true) {
                case (ex instanceof z.ZodError):
                    const { identifier, password } = ex.formErrors.fieldErrors
                    return setFormErrors({
                        identifier: identifier ? identifier[0] : "",
                        password: password ? password[0] : ""
                    })


                case (ex instanceof LoginBodyError):
                    return setFormErrors({
                        identifier: ex.errors.identifier || "",
                        password: ex.errors.password || ""
                    })

                case (ex instanceof CancelledError):
                    break;

                case (ex instanceof ApiError):
                    setSubmitionError(ex.message)
            }
            console.log(ex)
            setFormErrors(initialFormErrors)
        }

    }


    const getInputClass = (error: string) => [styles.textInput, error !== "" ? styles.textInputError : {}]



    return (
        <ScrollView contentContainerStyle={styles.layout}>

            <RobotoText style={styles.heading}>Welcome</RobotoText>

            {/* login form */}
            <View style={styles.container}>

                <FormError errorMessage={submitionError} type='Form' style={styles.submitionErrorMessage} />

                <View style={styles.header_container}>
                    <RobotoText style={styles.header_text_bold}>Sign in.</RobotoText>

                    <RobotoText style={styles.header_text_normal}>Already a customer?</RobotoText>
                </View>


                {/* email or number */}
                <RobotoText style={styles.label}>
                    Enter your email or mobile number
                </RobotoText>
                <TextInput value={formValues.identifier} onChangeText={(value) => handleChange("identifier", value)}
                    keyboardType="email-address" textContentType="emailAddress"
                    style={getInputClass(formErrors.identifier)} />
                <FormError errorMessage={formErrors.identifier} type='Field' />


                {/* password */}
                <RobotoText style={styles.label}>
                    Password
                </RobotoText>
                <TextInput value={formValues.password} onChangeText={(value) => handleChange("password", value)}
                    keyboardType="default" textContentType="password" secureTextEntry={true}
                    style={getInputClass(formErrors.password)} />
                <FormError errorMessage={formErrors.password} type='Field' />


                <PrimaryButton text="Continue" handlePress={handleLogin} buttonStyle={styles.button} disabled={loading} />

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
            <TouchableWithoutFeedback onPress={() => StackNavigation.replace("register")}>
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
    },

    textInputError: {
        borderColor: colors.errorColor
    },

    submitionErrorMessage: {
        fontSize: 20,
        marginBottom: 20
    }

})

export default LoginScreen;