import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import User from '../model/User';
import BudgetAPIService from '../services/apiService';

interface UserState {
    selectedUser: User,
    users: User[]
}

const initialState: UserState = {
    selectedUser: { name: '', id: -1},
    users: []
}

export const fetchUsers = createAsyncThunk('fetchUsers', async () => {
    const response = await BudgetAPIService.getAllUsers();
    return response;
});

export const postUser = createAsyncThunk('postUser', async (username: string) => {
    const response = await BudgetAPIService.postNewUser(username);
    return response;
})

export const user = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.selectedUser = action.payload
        }
    },
    extraReducers(builder) {
        builder
        .addCase(postUser.fulfilled, (state, action) => {
            state.selectedUser = action.payload;
            state.users.push(action.payload);
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
            state.users = action.payload;
            state.selectedUser = action.payload[0];
        })
    }

});

export const { setUser } =  user.actions;

export default user.reducer;