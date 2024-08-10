import { configureStore } from '@reduxjs/toolkit';
import UserSlice from './UserSlice';


const store = configureStore({
    reducer: {
        user:UserSlice ,

    },
    // Add any middleware or enhancers here
});

export default store;