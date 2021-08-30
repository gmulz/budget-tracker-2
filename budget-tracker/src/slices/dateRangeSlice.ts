import { createSlice, PayloadAction  } from "@reduxjs/toolkit";
import { getMonthStartEndFromDate } from '../utils/DateUtils';


interface DateRangeState {
    start_date: number,
    end_date: number | null;
}

let [start_date, end_date] = getMonthStartEndFromDate(new Date());


const initialState: DateRangeState = {
    start_date: start_date.getTime(),
    end_date: end_date.getTime()
}

export const dateRange = createSlice({
    name: 'dateRange',
    initialState,
    reducers: {
        setDateRange: (state, action: PayloadAction<[Date, Date]>) => {
            let [start, end] = action.payload;
            state.start_date = start.getTime();
            if (end) {
                state.end_date = action.payload[1].getTime()
            } else {
                state.end_date = null;
            }

        }
    }
})

export const { setDateRange } = dateRange.actions;

export default dateRange.reducer;