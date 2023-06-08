import { createSlice } from "@reduxjs/toolkit";

const calculateSubtotal = (cart) => {
    var result = 0
    cart.map((item) => {return result += item.qty * item.price})
    return Number(result).toFixed(2)
}

const updateLocalStorage = (cart) => {
    localStorage.setItem('cartItems', JSON.stringify(cart))
    localStorage.setItem('subtotal', JSON.stringify(calculateSubtotal(cart)))
}

export const initialState = {
    loading: false,
    error: null,
    cart : JSON.parse(localStorage.getItem('cartItems')) ?? [],
    expressShipping: JSON.parse(localStorage.getItem('expressShipping')) ?? false,
    subtotal: localStorage.getItem('cartItems') ? calculateSubtotal(JSON.parse(localStorage.getItem('cartItems'))) : 0
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

            state.cart = existingItem ? state.cart.map((item) => {
                return (item.id === existingItem.id ? payload : item)
            }) : [...state.cart, payload]

            state.error = null;
            state.loading = false;
            state.subtotal = calculateSubtotal(state.cart)

            updateLocalStorage(state.cart)
        },
        setError: (state, { payload }) => {
            state.error = payload;
            state.loading = false;
        },
        cartItemRemoval: (state, { payload }) => {
            state.cart = [...state.cart].filter((item) => item.id !== payload )
            updateLocalStorage(state.cart)
            state.subtotal = calculateSubtotal(state.cart)
            state.error = null;
            state.loading = false;
        },
        setExpressShipping: (state, { payload }) => {
            state.expressShipping = payload
            localStorage.setItem('expressShipping', payload)
        },
        clearCart: (state) => {
            state.cart = []
            localStorage.removeItem('cartItems')
        }
    }
})

export const { setLoading, cartItemAdd, setError, cartItemRemoval, setExpressShipping, clearCart } = cartSlice.actions
export default cartSlice.reducer

export const cartSelector = (state) => state.cart

