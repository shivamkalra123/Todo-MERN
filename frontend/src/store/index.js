import { createSlice, configureStore } from "@reduxjs/toolkit";
import { logout } from "react-icons/gr";

const authSlice = createSlice({
    name: "auth",
    initialState: { user: "", isLoggedIn: false },
    reducers: {
        login(state){
            state.isLoggedIn = true; // Removed the extra 'z'
        },
        logout(state){
            state.isLoggedIn = false;
        },
    },
});

export const authActions = authSlice.actions;
export const store = configureStore({
    reducer: authSlice.reducer,
});
