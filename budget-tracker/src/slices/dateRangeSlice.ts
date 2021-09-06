import { createSlice, PayloadAction  } from "@reduxjs/toolkit";
import { getMonthStartEndFromDate } from '../utils/DateUtils';


interface DateRangeState {
    start_date: Date,
    end_date: Date | null;
}

let [start_date, end_date] = getMonthStartEndFromDate(new Date());


const initialState: DateRangeState = {
    start_date: start_date,
    end_date: end_date
}

export const dateRange = createSlice({
    name: 'dateRange',
    initialState,
    reducers: {
        setDateRange: (state, action: PayloadAction<[Date, Date]>) => {
            let [start, end] = action.payload;
            state.start_date = start;
            if (end) {
                state.end_date = action.payload[1]
            } else {
                state.end_date = null;
            }

        }
    }
})

export const { setDateRange } = dateRange.actions;

export default dateRange.reducer;