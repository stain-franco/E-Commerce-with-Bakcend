import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setIsLoading } from "./isLoading.slice";

export const productsSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    setProducts: (state, action) => {
      return action.payload;
    }
  }
});

export const getProductsThunk = () => (dispatch) => {
  
  dispatch(setIsLoading(true));

  axios
    .get("https://e-commerce-backend-uunu.onrender.com/products")
    .then((resp) => dispatch(setProducts(resp.data.data.products)))
    .catch((error) => console.error(error))
    .finally(() => dispatch(setIsLoading(false)));
};

export const filterCategoriesThunk = (id) => (dispatch) => {
  dispatch(setIsLoading(true));

  axios
    .get(`https://e-commerce-backend-uunu.onrender.com/products=${id}`)
    .then((resp) => dispatch(setProducts(resp.data.data.products)))
    .catch((error) => console.error(error))
    .finally(() => dispatch(setIsLoading(false)));
};


export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;
