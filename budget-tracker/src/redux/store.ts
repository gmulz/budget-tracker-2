import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../slices/userSlice';
import transactionsReducer from '../slices/transactionsSlice';
import dateRangeReducer from '../slices/dateRangeSlice';
import categoriesReducer from '../slices/categorySlice';


const store = configureStore({
    reducer: {
        user: userReducer,
        transactions: transactionsReducer,
        dateRange: dateRangeReducer,
        categories: categoriesReducer
    },
    
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store;