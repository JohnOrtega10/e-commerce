import { createSlice } from "@reduxjs/toolkit";
import { setIsLoading } from "./isLoading.slice";
import api from "../../utils/axios";

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: [],
  reducers: {
    setCategoriesList: (state, action) => {
      return action.payload;
    },
  },
});

export const getCategoriesListThunk = () => (dispatch) => {
  dispatch(setIsLoading(true));
  api
    .get("/products/categories")
    .then((res) => dispatch(setCategoriesList(res.data.data.categories)))
    .catch((err) => console.log(err))
    .finally(() => dispatch(setIsLoading(false)));
};

export const { setCategoriesList } = categoriesSlice.actions;

export default categoriesSlice.reducer;
