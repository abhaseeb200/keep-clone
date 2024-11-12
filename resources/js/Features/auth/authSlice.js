import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: { user: {}, isLoggedIn: false },
    reducers: {
        loginReducer: (state, action) => {
            return {
                ...state,
                user: {
                    ...action.payload,
                },
                isLoggedIn: true,
            };
        },
        logoutReducer: (state) => {
            return {
                ...state,
            };
        },
    },
});

export const { loginReducer, logoutReducer } = authSlice.actions;

export default authSlice.reducer;
