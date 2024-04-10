// createApi slice


// api slice takes a query string as param,
// a function to convert all the user product query into url query and use it to get data



import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "@src/services/URLs";
import { apiURLs } from "@src/services/URLs";


export interface IProductData {
    _id: string
    brand: string
    color: string
    name: string
    full_title: string
    headphone_type: string
    price: number
    description: string[]
    main_image: string
    other_images: string[]
    available: boolean

    review: {
        id: string
        total_customer_reviews: number
        rating: number
    }
}


export const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({ baseUrl: baseURL, credentials: "include" }),

    endpoints: (builder) => ({
        getProducts: builder.query<IProductData[], string>({
            query: (queryString = "") => ({ url: `${apiURLs.getProducts}?${queryString}` }),

            transformResponse(baseQueryReturnValue: { data: IProductData[] }, meta, arg) {
                return baseQueryReturnValue.data
            },
        })
    })
})




export const { useGetProductsQuery } = productsApi;