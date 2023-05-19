import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    loading: false,
    error: null,
    cart : [],
    expressShipping: false,
    subtotal: 0
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setLoading: (state) => {
            state.loading = true;
        },
        cartItemAdd: (state, { payload }) => {
            const existingItem = state.cart.find((item) => item.id === payload.id)

            existingItem ? state.cart.map((item) => {
                return (item.id === existingItem.id ? payload : item)
            }) : state.cart = [...state.cart, payload]

            state.error = null;
            state.loading = false;
        },
        setError: (state, { payload }) => {
            state.error = payload;
            state.loading = false;
        }
    }
})

export const { setLoading, cartItemAdd, setError } = cartSlice.actions
export default cartSlice.reducer

export const cartSelector = (state) => state.cart

