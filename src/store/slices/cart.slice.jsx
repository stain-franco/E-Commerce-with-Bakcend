import { createSlice } from "@reduxjs/toolkit"
import { setIsLoading } from "./isLoading.slice"
import axios from "axios"
import getConfig from "../../helpers/getConfig"


export const cartSlice = createSlice ({
    name: "cart",
    initialState: [],
    reducers: {
        setCart: (state, action) => {
            return action.payload
        }
    }
})

export const getCartThunk = () => dispatch => {
    dispatch(setIsLoading(true));
        axios
        .get(`https://e-commerce-backend-uunu.onrender.com/carts`, getConfig())
        .then((resp) => {
            console.log(resp)
            dispatch(setCart(resp.data.data.cart.products))})
        .catch( error => console.error(error) )
        .finally(() => dispatch(setIsLoading(false)));
}

export const createCartThunk = (cart) => (dispatch) => {
    dispatch(setIsLoading(true));
        axios
        .post(`https://e-commerce-backend-uunu.onrender.com/carts`, cart, getConfig())
        .then((resp) => dispatch(getCartThunk()))
        .catch(error => console.error(error))
        .finally(() => dispatch(setIsLoading(false)));
}

export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;