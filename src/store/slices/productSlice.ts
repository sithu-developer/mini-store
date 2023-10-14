import { ProductSlice } from "@/types/product";
import { config } from "@/utils/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState : ProductSlice = {
    items : [],
    isLoading : false,
    error : null
}

export const fetchProducts = createAsyncThunk("productSlice", async( _ , thunkApi) => {
    const response = await fetch(`${config.apiBaseUrl}/products`); 
    const products = await response.json();
    thunkApi.dispatch(setProduct(products))
})

const productSlice =  createSlice({
    name : "productSlice",
    initialState : initialState,
    reducers : {
        setProduct : (state , action) => {
            state.items = action.payload
        }
    }
})
export const {setProduct} = productSlice.actions
export default productSlice.reducer