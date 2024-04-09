import { Provider } from "react-redux";
import App from "./App";
import { store } from "./store";

function Main(): React.JSX.Element {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
}



export default Main;