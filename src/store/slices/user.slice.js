import { createSlice } from "@reduxjs/toolkit";
import { setIsLoading } from "./isLoading.slice";
import getConfig from "../../utils/getConfig";
import api from "../../utils/axios";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLogged: false,
    userProfile: {},
    loginAlert: "",
  },
  reducers: {
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },

    setIsLogged: (state, action) => {
      state.isLogged = action.payload;
    },

    setLoginAlert: (state, action) => {
      state.loginAlert = action.payload;
    },
  },
});

export const loginThunk = (navigate, data) => (dispatch) => {
  dispatch(setIsLoading(true));
  api
    .post("/users/login", data)
    .then((res) => {
      localStorage.setItem("token", res.data.data.token);
      dispatch(setIsLogged(true));
      dispatch(setLoginAlert(""));
      navigate("/");
    })
    .catch((err) => {
      if (err.response.status === 401) {
        dispatch(
          setLoginAlert(
            "danger-Credenciales incorrectas. Por favor inténtalo nuevamente."
          )
        );
      } else {
        console.log(err.response.data);
      }
    })
    .finally(() => dispatch(setIsLoading(false)));
};

export const signUpThunk = (navigate, data) => (dispatch) => {
  dispatch(setIsLoading(true));
  api
    .post("/users", data)
    .then(() => navigate("/login"))
    .catch((err) => console.log(err))
    .finally(() => dispatch(setIsLoading(false)));
};

export const getUserProfileThunk = () => (dispatch) => {
  dispatch(setIsLoading(true));
  api
    .get("/users/profile", getConfig())
    .then((res) => dispatch(setUserProfile(res.data.data.user)))
    .catch((err) => console.log(err))
    .finally(() => dispatch(setIsLoading(false)));
};

export const { setUserProfile, setIsLogged, setLoginAlert } = userSlice.actions;

export default userSlice.reducer;
