import { Product } from "@prisma/client";

interface CartItem extends Product {
    quantity : number
}

export interface InitialCartState {
    items : CartItem[]
    isLoading : Boolean
    error : Error |  null
}