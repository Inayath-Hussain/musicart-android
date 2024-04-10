// in android emulator 10.0.2.2 maps to localhost
export const baseURL = "http://10.0.2.2:8080";

export const apiURLs = {
    loginURL: "/api/user/login",
    registerURL: "/api/user/register",
    getUserInfo: "/api/user/info",

    // products
    addProduct: "/api/product",
    getProducts: "/api/product",

    addToCart: "/api/cart",
    getCart: "/api/cart",

    placeOrder: "/api/orders",
    getOrderList: "/api/orders",
    getOrder: (id: string) => "/api/orders/" + id,

    addfeedback: "/api/feedback"
}