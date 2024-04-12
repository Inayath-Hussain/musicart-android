import Reactotron, { networking } from "reactotron-react-native";
import { reactotronRedux } from "reactotron-redux";
import mmkvPlugin from "reactotron-react-native-mmkv";
import { storage } from "@src/utilities/storage/storageInstance";


export const reactotron = Reactotron
    .configure()    // controls connection and communication settings
    // .useReactNative({
    //     asyncStorage: false
    // }) // adds all built in react native plugins
    .use(mmkvPlugin({ storage }))
    .use(reactotronRedux())
    .use(networking())
    .connect()