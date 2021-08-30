import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Transaction from '../model/LineItem';


import { user } from './userSlice';



interface TransactionState {
    transactions: Transaction[],
}

const initialState: TransactionState = {
    transactions: []
}

export const transactions = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        addTransaction: (state, action : PayloadAction<Transaction>) => {
            state.transactions.push(action.payload)
        }
        //fetch transactions
    },
    extraReducers: {
        [user.actions.setUser.type]: (state, action) => {
            console.log(action.payload);
        }
    }
})

export const { addTransaction } = transactions.actions;

export default transactions.reducer;