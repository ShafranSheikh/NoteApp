import {createSlice} from '@reduxjs/toolkit';
const initialState = {
    isAuthenticated: !!localStorage.getItem('token'),
    token: localStorage.getItem('token') || null,
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.token = action.payload.token;
            // Save token in localStorage
            localStorage.setItem('token', action.payload.token); 
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.token = null;
            // Clear token from localStorage
            localStorage.removeItem('token'); 
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;