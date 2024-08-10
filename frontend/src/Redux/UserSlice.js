import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState:{
        user: [],
        isLoggedIn: false,
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            state.isLoggedIn = true;
            
        },
        signup: (state, action) => {
            state.user = action.payload;
            state.isLoggedIn = true;
        },
    },
});

export const { login, signup } = userSlice.actions;

export default userSlice.reducer;