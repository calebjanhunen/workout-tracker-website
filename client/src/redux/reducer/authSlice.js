import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    userId: null,
    accessToken: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials(state, action) {
            const { user, userId, accessToken } = action.payload;
            state.user = user;
            state.userId = userId;
            state.accessToken = accessToken;
        },
        clearState(state, action) {
            state.user = null;
            state.userId = null;
            state.accessToken = null;
        },
    },
});

export const { setCredentials, clearState } = authSlice.actions;
export default authSlice.reducer;
