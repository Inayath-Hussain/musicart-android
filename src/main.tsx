import { Provider } from "react-redux";

import App from "./App";
import { store } from "./store";
import NavigationContextProvider from "./contexts/navigationContext";
import AuthCookieContextProvide from "./contexts/authCookie";

function Main(): React.JSX.Element {
    return (
        <AuthCookieContextProvide>
            <NavigationContextProvider>
                <Provider store={store}>

                    <App />

                </Provider>
            </NavigationContextProvider>
        </AuthCookieContextProvide>
    )
}



export default Main;