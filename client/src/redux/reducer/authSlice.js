import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    accessToken: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials(state, action) {
            const { user, accessToken } = action.payload;
            state.user = user;
            state.accessToken = accessToken;
        },
        clearState(state, action) {
            state.user = null;
            state.accessToken = null;
        },
    },
});

export const { setCredentials, clearState } = authSlice.actions;
export default authSlice.reducer;
