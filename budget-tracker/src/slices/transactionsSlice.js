import { createSlice } from '@reduxjs/toolkit'

import DateUtils from '../utils/DateUtils'

let [start_date, end_date] = DateUtils.getMonthStartEndFromDate(new Date());

export const transactions = createSlice({
    name: 'transactions',
    initialState: [],
    reducers: {
        addTransaction: (state, action) => {
            state.push(action.payload)
        }
        //fetch transactions
    }
})