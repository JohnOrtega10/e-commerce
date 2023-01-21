import { createSlice } from "@reduxjs/toolkit";
import { setIsLoading } from "./isLoading.slice";
import api from "../../utils/axios";

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    productsList: [],
    product: {},
    categoryFilters: [],
    brandFilters: [],
    orderFilters: "",
    searchFilters: "",
    stringFilters: "",
  },

  reducers: {
    setProductsList: (state, action) => {
      state.productsList = action.payload;
    },

    setProduct: (state, action) => {
      state.product = action.payload;
    },

    setCategoryFilters: (state, action) => {
      const index = state.categoryFilters.indexOf(action.payload);
      if (index >= 0) {
        state.categoryFilters.splice(index, 1);
        return;
      }
      state.categoryFilters.push(action.payload);
    },

    setBrandFilters: (state, action) => {
      const index = state.brandFilters.indexOf(action.payload);
      if (index >= 0) {
        state.brandFilters.splice(index, 1);
        return;
      }
      state.brandFilters.push(action.payload);
    },

    setOrderFilters: (state, action) => {
      if (state.orderFilters === action.payload) {
        state.orderFilters = "";
        return;
      }
      state.orderFilters = action.payload;
    },

    setSearchFilter: (state, action) => {
      state.searchFilters = action.payload;
    },

    setAllFilters: (state, action) => {
      const categoryFilters = state.categoryFilters.join("&category=");
      const brandFilters = state.brandFilters.join("&brand=");
      const orderFilters = state.orderFilters;
      const searchFilters = state.searchFilters;

      state.stringFilters = `/?category=${categoryFilters}&brand=${brandFilters}&order=${orderFilters}&query=${searchFilters}`;
    },
  },
});

export const getProductsListThunk = (filters) => (dispatch) => {
  dispatch(setIsLoading(true));

  api
    .get(`/products${filters}`)
    .then((res) => dispatch(setProductsList(res.data.data.products)))
    .catch((err) => console.log(err))
    .finally(() => dispatch(setIsLoading(false)));
};

export const getProductThunk = (id) => (dispatch) => {
  dispatch(setIsLoading(true));
  api
    .get(`/products/${id}`)
    .then((res) => dispatch(setProduct(res.data.data.product)))
    .catch((err) => console.log(err))
    .finally(() => dispatch(setIsLoading(false)));
};

export const getRelatedProducts = (id) => (dispatch) => {
  dispatch(setIsLoading(true));
  api
    .get(`/products/related/${id}`)
    .then((res) => dispatch(setProductsList(res.data.data.products)))
    .catch((err) => console.log(err))
    .finally(() => dispatch(setIsLoading(false)));
};

export const {
  setProductsList,
  setProduct,
  setCategoryFilters,
  setBrandFilters,
  setOrderFilters,
  setSearchFilter,
  setAllFilters,
} = productsSlice.actions;

export default productsSlice.reducer;
