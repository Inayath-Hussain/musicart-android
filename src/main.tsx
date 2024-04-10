import { Provider } from "react-redux";

import App from "./App";
import { store } from "./store";
import NavigationContextProvider from "./contexts/navigationContext";

function Main(): React.JSX.Element {
    return (
        <NavigationContextProvider>
            <Provider store={store}>

                <App />

            </Provider>
        </NavigationContextProvider>
    )
}



export default Main;