import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import User from '../model/User';

interface UserState {
    selectedUser: User
}

const initialState: UserState = {
    selectedUser: { name: '', id: -1}
}


export const user = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.selectedUser = action.payload
        }
    }
});

export const { setUser } =  user.actions;

export default user.reducer;