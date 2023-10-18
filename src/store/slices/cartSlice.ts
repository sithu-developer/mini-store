import { CancelOrderOption, CreateOrderOption, InitialCartState } from "@/types/cart";
import { config } from "@/utils/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState : InitialCartState= {
    items : [],
    isLoading : false,
    error : null
}

export const cancelOrder = createAsyncThunk("cartSlice/createOrder", async(option : CancelOrderOption , thunkApi) => {
    const {orderId, onSuccess , onError} = option;
    try {
        await fetch(`${config.apiBaseUrl}/order/${orderId}`, {
            method : "DELETE"
        });
        onSuccess && onSuccess();
    } catch (err) {
        onError && onError()
    }
})

export const createOrder = createAsyncThunk("cartSlice/createOrder", async(option : CreateOrderOption , thunkApi) => {
    const {payload , onSuccess , onError} = option;
    try {
        const response = await fetch(`${config.apiBaseUrl}/order`, {
            method : "POST",
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify(payload)
        });
        const dataFromServer = await response.json();
        onSuccess && onSuccess(dataFromServer);
    } catch (err) {
        onError && onError()
    }
})

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
            if (!quantity) {   //quantity === 0
                state.items = state.items.filter(element => element.id !== action.payload.id )
            } 
             {
                state.items = state.items.map(element => {
                    return element.id === action.payload.id ? {...element , quantity : action.payload.quantity}: element ;
                });
            }
        },


    }
})
export const {addToCart , updateQuantity} = cartSlice.actions;

export default cartSlice.reducer;