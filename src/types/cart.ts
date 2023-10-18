import { Product } from "@prisma/client";

export interface CartItem extends Product {
    quantity : number
}

export interface InitialCartState {
    items : CartItem[]
    isLoading : Boolean
    error : Error |  null
}

export interface Baseoption {
    onSuccess ? : (data? : any ) => void
    onError ?: (data? : any ) => void
}

export interface CreateOrderOption extends Baseoption {
    payload : CartItem[]
}

export interface CancelOrderOption extends Baseoption {
    orderId : string
};