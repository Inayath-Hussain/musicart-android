import Reactotron, { networking } from "reactotron-react-native";
import { reactotronRedux } from "reactotron-redux"


export const reactotron = Reactotron
    .configure()    // controls connection and communication settings
    // .useReactNative({
    //     asyncStorage: false
    // }) // adds all built in react native plugins
    .use(reactotronRedux())
    .use(networking())
    .connect()