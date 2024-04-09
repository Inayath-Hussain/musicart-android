import { configureStore } from "@reduxjs/toolkit";

import { productQuerySlice } from "./slices/productQuery";
import { productsApi } from "./slices/productApi";
import { productView } from "./slices/productView";
import { cartSlice } from "./slices/cartItems";
import { userSlice } from "./slices/userSlice";


export const store = configureStore({
    reducer: {
        [productQuerySlice.name]: productQuerySlice.reducer,
        [productsApi.reducerPath]: productsApi.reducer,
        [cartSlice.name]: cartSlice.reducer,
        [userSlice.name]: userSlice.reducer,

        [productView.name]: productView.reducer
    },

    middleware(getDefaultMiddleware) {
        return getDefaultMiddleware().concat(productsApi.middleware)
    },

    enhancers: (defaultEnhancers) => __DEV__ ?
        defaultEnhancers().prepend(require("../../ReactotronConfig").reactotron.createEnhancer())
        : defaultEnhancers()
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch