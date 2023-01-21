import { createSlice } from "@reduxjs/toolkit";
import { setIsLoading } from "./isLoading.slice";
import getConfig from "../../utils/getConfig";
import api from "../../utils/axios";

export const cartSlice = createSlice({
  name: "cart",

  initialState: {
    cart: [],
    showCart: false,
    totalPrice: 0,
    totalProducts: 0,
  },
  reducers: {
    setProductsCart: (state, action) => {
      state.cart = action.payload;
    },
    handleShowCart: (state, action) => {
      state.showCart = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    setTotalPrice: (state, action) => {
      state.totalPrice = action.payload;
    },
    setTotalProducts: (state, action) => {
      state.totalProducts = action.payload;
    },
  },
});

export const getProductsCartThunk = () => (dispatch) => {
  dispatch(setIsLoading(true));
  api
    .get("/cart", getConfig())
    .then((res) => dispatch(setProductsCart(res.data.data.cart.products)))
    .catch((err) => console.log(err))
    .finally(() => dispatch(setIsLoading(false)));
};

export const addProductToCartThunk = (data) => (dispatch) => {
  dispatch(setIsLoading(true));
  api
    .post("/cart", data, getConfig())
    .then(() => {
      dispatch(getProductsCartThunk());
      dispatch(handleShowCart(true));
    })
    .catch((err) => console.log(err))
    .finally(() => dispatch(setIsLoading(false)));
};

export const updateQuantityProductCartThunk = (data) => (dispatch) => {
  dispatch(setIsLoading(true));
  api
    .patch("/cart", data, getConfig())
    .then(() => dispatch(getProductsCartThunk()))
    .catch((err) => console.log(err))
    .finally(() => dispatch(setIsLoading(false)));
};

export const removeProductCartThunk = (id) => (dispatch) => {
  dispatch(setIsLoading(true));
  api
    .delete(`/cart/${id}`, getConfig())
    .then(() => dispatch(getProductsCartThunk()))
    .catch((err) => console.log(err))
    .finally(() => dispatch(setIsLoading(false)));
};

export const purchaseCartThunk = (navigate) => (dispatch) => {
  dispatch(setIsLoading(true));
  api
    .post("/purchases", {}, getConfig())
    .then(() => {
      dispatch(setProductsCart([]));
      dispatch(handleShowCart(false));
      navigate("/purchases");
    })
    .catch((err) => console.log(err))
    .finally(() => dispatch(setIsLoading(false)));
};

export const {
  setProductsCart,
  handleShowCart,
  setTotalPrice,
  setTotalProducts,
} = cartSlice.actions;

export default cartSlice.reducer;
