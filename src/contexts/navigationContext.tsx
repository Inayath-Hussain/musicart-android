import { NavigationContainerRef } from "@react-navigation/native";
import { MainTabStackParamList } from "@src/config/interface";
import { PropsWithChildren, createContext, useEffect, useState } from "react";


interface Context {
    currentRoute: string
    navigationRef: NavigationContainerRef<MainTabStackParamList> | null
    setNavigationRef: React.Dispatch<React.SetStateAction<NavigationContainerRef<MainTabStackParamList> | null>>
}

export const navigationContext = createContext<Context>({ currentRoute: "", navigationRef: null, setNavigationRef: () => { } });





const NavigationContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [currentRoute, setCurrentRoute] = useState("");

    const [navigationRef, setNavigationRef] = useState<NavigationContainerRef<MainTabStackParamList> | null>(null);

    useEffect(() => {
        const getCurrentRoute = () => {
            setCurrentRoute(navigationRef?.getCurrentRoute()?.name || "")
        }


        // when navigation ref is ready set current route
        navigationRef?.isReady() && getCurrentRoute()

        // listener to update current route
        navigationRef && navigationRef.addListener("state", getCurrentRoute)

        return () => {
            navigationRef && navigationRef.removeListener("state", getCurrentRoute)
        }

    }, [navigationRef])


    return (
        <navigationContext.Provider value={{ currentRoute, navigationRef, setNavigationRef }}>
            {children}
        </navigationContext.Provider>
    )
}



export default NavigationContextProvider;