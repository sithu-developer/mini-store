import { InitialCartState } from "@/types/cart";
import { createSlice } from "@reduxjs/toolkit";


const initialState : InitialCartState= {
    items : [],
    isLoading : false,
    error : null
}

const cartSlice = createSlice({
    name : "cartSlice",
    initialState : initialState,
    reducers : {
        addToCart : (state , action ) => { 
            const cartId = action.payload.id;
            const check = state.items.find(element => element.id === cartId);
            if (check) {
                state.items = state.items.map(element => {
                    if(element.id === cartId) return {...element, quantity :element.quantity + 1 }
                    return element;
                })
            } else {
                state.items = [...state.items , action.payload];
            };
        },
        updateQuantity : (state , action) => {
            const quantity = action.payload.quantity;
            if (quantity === 0) {
                state.items = state.items.filter(element => element.id !== action.payload.id )
            } else {
                state.items = state.items.map(element => {
                    return element.id === action.payload.id ? {...element , quantity : action.payload.quantity}: element ;
                });
            }
        },

    }
})
export const {addToCart , updateQuantity} = cartSlice.actions;

export default cartSlice.reducer;