import { Provider } from "react-redux";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import App from "./App";
import { store } from "./store";
import NavigationContextProvider from "./contexts/navigationContext";
import AuthCookieContextProvide from "./contexts/authCookie";

function Main(): React.JSX.Element {
    return (
        <Provider store={store}>
            <AuthCookieContextProvide>
                <NavigationContextProvider>
                    <GestureHandlerRootView>

                        <App />

                    </GestureHandlerRootView>
                </NavigationContextProvider>
            </AuthCookieContextProvide>
        </Provider>
    )
}



export default Main;