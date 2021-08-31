import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { stat } from 'fs';
import { HTTPRequestStatus } from '../enums/HTTPRequestStatus';
import Transaction from '../model/LineItem';
import User from '../model/User';
import BudgetAPIService from '../services/apiService';

import { LATE_DATE } from '../utils/DateUtils'


interface TransactionState {
    transactions: Transaction[],
    status: HTTPRequestStatus,
    error?: string
}

const initialState: TransactionState = {
    transactions: [],
    status: HTTPRequestStatus.IDLE,
    error: undefined
}

export const fetchTransactions = createAsyncThunk('fetchTransactions', async (info: {user: User, start_date: Date, end_date?: Date}) => {
    const transactions = await BudgetAPIService.getTransactionsForUserAndDateRange(info.user, info.start_date, info.end_date);
    return transactions as Transaction[];
})

export const transactions = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        addTransaction: (state, action : PayloadAction<Transaction>) => {
            state.transactions.push(action.payload)
        }
        //fetch transactions
    },
    extraReducers(builder) {
        builder
        .addCase(fetchTransactions.pending, (state, action) => {
            state.status = HTTPRequestStatus.LOADING
        })
        .addCase(fetchTransactions.fulfilled, (state, action) => {
            state.status = HTTPRequestStatus.SUCCEEDED;
            state.transactions = action.payload;
        })
        .addCase(fetchTransactions.rejected, (state, action) => {
            state.status = HTTPRequestStatus.FAILED;
            state.error = action.error.message;
        })
    }
})

export const { addTransaction } = transactions.actions;

export default transactions.reducer;