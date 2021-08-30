import { createSlice } from '@reduxjs/toolkit'


export const user = createSlice({
    name: 'user',
    initialState: {
        name: '',
        id: -1
    },
    reducers: {
        setUser: (state, action) => {
            state = action.payload
        }
    }
});

