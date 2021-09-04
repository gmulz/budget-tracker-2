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
});

export const postTransaction = createAsyncThunk('postTransaction', async (transaction: Transaction) => {
    const response = await BudgetAPIService.postTransaction(transaction);
    return response;
});

export const editTransaction = createAsyncThunk('editTransaction', async (transaction: Transaction) => {
    const response = await BudgetAPIService.putTransaction(transaction);
    return response;
})

export const transactions = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
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
        .addCase(postTransaction.fulfilled, (state, action) => {
            state.status = HTTPRequestStatus.SUCCEEDED;
            //add transaction to state
            let transaction = action.payload;
            state.transactions.push(transaction)
        })
        .addCase(editTransaction.fulfilled, (state, action) => {
            state.status = HTTPRequestStatus.SUCCEEDED;
            //insert transaction to state
            let transaction = action.payload;
            let txnIndex = state.transactions.findIndex(txn => txn.id = transaction.id);
            state.transactions[txnIndex] = transaction;
        })
    }
})


export default transactions.reducer;