import { NavigatorScreenParams } from "@react-navigation/native"
import { route } from "../routes"

export type LoginStackParamList = {
    [route.users.login]: { path: string } | undefined
    [route.users.register]: { path: string } | undefined
}


export type ProductStackParamList = {
    [route.home.productDetail]: { id: string }
    [route.home.productList]: undefined
}


export type ShopStackParamList = {
    [route.shop.cart]: undefined
    [route.shop.checkout]: undefined
}


export type InvoiceStackParamList = {
    [route.invoices.list]: undefined
    [route.invoices.detail]: { id: string }
}



export type MainTabStackParamList = {
    // specifying screen params is required to be able to navigate to nested screen
    [route.home.index]: NavigatorScreenParams<ProductStackParamList>
    [route.shop.index]: NavigatorScreenParams<ShopStackParamList>
    [route.invoices.index]: undefined
    [route.users.index]: NavigatorScreenParams<LoginStackParamList>
}