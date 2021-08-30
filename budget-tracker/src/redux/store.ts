import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../slices/userSlice';
import transactionsReducer from '../slices/transactionsSlice';


const store = configureStore({
    reducer: {
        user: userReducer,
        transactions: transactionsReducer
    },
    
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store;