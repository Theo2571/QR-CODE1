import { configureStore } from '@reduxjs/toolkit';
import { userSliceReducer} from './slices/userSlice';

const store = configureStore({
    reducer: {
        userReducer: userSliceReducer,
    },
});

export default store;

