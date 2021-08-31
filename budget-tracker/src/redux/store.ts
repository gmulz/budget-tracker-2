import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
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
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: false
        })
    }
    
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store;