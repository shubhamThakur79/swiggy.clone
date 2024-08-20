import { createSlice } from "@reduxjs/toolkit";

let initialUserData = null;

try {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
        initialUserData = JSON.parse(storedUserData);
    }
} catch (error) {
    console.error("Failed to parse user data from localStorage:", error);
    localStorage.removeItem("userData"); // Optionally clear the corrupted data
}

const authSlice = createSlice({
    name: "AuthSlice",
    initialState: {
        userData: initialUserData
    },
    reducers: {
        addUserData: (state, action) => {
            state.userData = action.payload;
            localStorage.setItem("userData", JSON.stringify(action.payload || null));
        },
        removeUserData: (state) => {
            state.userData = null;
            localStorage.removeItem("userData");
        },
    }
});

export const { addUserData, removeUserData } = authSlice.actions;
export default authSlice.reducer;
