import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../index";




const slice = createSlice({
    name: "cart",
    initialState: 0,
    reducers: {
        updateCart: (state, action: PayloadAction<number>) => {

            state = action.payload
            return state

        },


        updateCartItem: (state, action: PayloadAction<number>) => {

            state = state + action.payload
            return state

        }
    }
})




export const { updateCart, updateCartItem } = slice.actions;

export const cartSlice = {
    name: slice.name,
    reducer: slice.reducer
}


export const cartSelector = (state: RootState) => state.cart