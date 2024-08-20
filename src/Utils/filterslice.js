import { configureStore, createSlice } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; // Make sure authSlice exports the default reducer
import authSlice from "./authSlice";

const filterSlice = createSlice({
  name: "filterSlice",
  initialState: {
    filterValue: null,
  },
  reducers: {
    setFilterValue: (state, action) => {
      state.filterValue = action.payload;
    },
  },
});

const toggleSlice = createSlice({
  name: "toggleSlice",
  initialState: {
    signUpToggle: false,
  },
  reducers: {
    toggleSignUp: (state) => {
      state.signUpToggle = !state.signUpToggle;
console.log(state.signUpToggle)

    },
  },
});

export const { setFilterValue } = filterSlice.actions;
export const { toggleSignUp } = toggleSlice.actions;

const store = configureStore({
  reducer: {
    filterSlice: filterSlice.reducer,
    toggleSlice: toggleSlice.reducer,
    authSlice:authSlice,
    auth: authReducer, // Ensure authReducer is correctly exported from authSlice
  },
});

export default store;
