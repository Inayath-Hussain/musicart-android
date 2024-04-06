export const route = {

    users: {
        index: "user",

        login: "login",

        register: "register",
    },

    home: {
        index: "home",

        productList: "product-list",

        productDetail: "product-detail"
    },

    shop: {
        index: "shop",

        cart: "cart",

        checkout: "checkout",
    },

    invoices: {
        index: "invoices",

        list: "invoice_list",

        detail: "invoice_detail"
    },

    addNewProduct: "add-new"
} as const