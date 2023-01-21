import { configureStore } from "@reduxjs/toolkit";
import brandsSlice from "./slices/brands.slice";
import cartSlice from "./slices/cart.slice";
import categoriesSlice from "./slices/categories.slice";
import isLoadingSlice from "./slices/isLoading.slice";
import productsSlice from "./slices/products.slice";
import purchasesSlice from "./slices/purchases.slice";
import userSlice from "./slices/user.slice";

export default configureStore({
  reducer: {
    isLoading: isLoadingSlice,
    products: productsSlice,
    categories: categoriesSlice,
    brands: brandsSlice,
    purchases: purchasesSlice,
    cart: cartSlice,
    user: userSlice,
  },
});
