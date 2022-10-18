import { configureStore } from '@reduxjs/toolkit'
import { userSliceReducer} from './userSlice'
export const store = configureStore({
    reducer: {
        userReducer: userSliceReducer,
    },
})
export type RootState = ReturnType<typeof store.getState>

