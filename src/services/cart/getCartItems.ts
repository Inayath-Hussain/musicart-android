import { AxiosError, HttpStatusCode } from "axios"
import { apiURLs } from "../URLs"
import { axiosInstance } from "../instance"
import { CancelledError, UnauthorizedError } from "../errors"

interface ICartItem {
    id: string
    product_id: string
    name: string
    available: boolean
    color: string
    quantity: number
    price: number
    total_price: number
    image: string
}

export interface ICartData {
    data: ICartItem[]
    username: string
    convenienceFee: number
    totalAmount: number
    total_items_price: number
    total_items: number
}



export const getCartService = () =>
    new Promise<ICartData | EmptyCart>(async (resolve, reject) => {

        try {
            const result = await axiosInstance.get(apiURLs.getCart, { withCredentials: true })

            if (result.data.message) return resolve(new EmptyCart(result.data.message))

            resolve(result.data)
        }
        catch (ex: any) {

            if (ex instanceof AxiosError) {
                switch (true) {
                    case (ex.response?.status === HttpStatusCode.Unauthorized):
                        return reject(new UnauthorizedError());

                    case (ex.code === AxiosError.ERR_CANCELED):
                        return reject(new CancelledError("get cart api was cancelled"))
                }
            }

            console.log(ex)
            reject(ex || { message: "Please try again later" })
        }
    })






export class EmptyCart {
    message: string;

    constructor(message: string) {
        this.message = message
    }
}