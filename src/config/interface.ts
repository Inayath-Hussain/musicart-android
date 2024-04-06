import { route } from "../routes"

export type LoginStackParamList = {
    [route.users.login]: undefined
    [route.users.register]: undefined
}


export type ProductStackParamList = {
    [route.home.productList]: undefined
    [route.home.productDetail]: { id: string }
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
    [route.home.index]: undefined
    [route.shop.index]: undefined
    [route.invoices.index]: undefined
    [route.users.index]: undefined
}