import { createSlice } from "@reduxjs/toolkit";
import { setIsLoading } from "./isLoading.slice";
import getConfig from "../../utils/getConfig";
import api from "../../utils/axios";

export const purchasesSlice = createSlice({
  name: "purchases",
  initialState: [],
  reducers: {
    setPurchases: (state, action) => {
      return action.payload;
    },
  },
});

export const getPurchasesThunk = () => (dispatch) => {
  dispatch(setIsLoading(true));
  api
    .get("/purchases", getConfig())
    .then((res) => {
      dispatch(setPurchases(res.data.data.purchases));
    })
    .catch((err) => console.log(err))
    .finally(() => dispatch(setIsLoading(false)));
};

export const { setPurchases } = purchasesSlice.actions;

export default purchasesSlice.reducer;
