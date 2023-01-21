import { createSlice } from "@reduxjs/toolkit";
import { setIsLoading } from "./isLoading.slice";
import api from "../../utils/axios";

export const brandsSlice = createSlice({
  name: "brands",
  initialState: [],

  reducers: {
    setbrandsList: (state, action) => {
      return action.payload;
    },
  },
});

export const getBrandsListThunk = () => (dispatch) => {
  dispatch(setIsLoading(true));
  api
    .get("/products/brands")
    .then((res) => dispatch(setbrandsList(res.data.data.brands)))
    .catch((err) => console.log(err))
    .finally(() => dispatch(setIsLoading(false)));
};

export const { setbrandsList } = brandsSlice.actions;

export default brandsSlice.reducer;
