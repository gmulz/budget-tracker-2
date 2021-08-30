import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import LineItem from '../model/LineItem';

import DateUtils from '../utils/DateUtils'

import { user } from './userSlice';


let [start_date, end_date] = DateUtils.getMonthStartEndFromDate(new Date());

interface TransactionState {
    transactions: LineItem[],
}

const initialState: TransactionState = {
    transactions: []
}

export const transactions = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        addTransaction: (state, action : PayloadAction<LineItem>) => {
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