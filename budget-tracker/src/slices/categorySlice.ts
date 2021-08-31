import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { HTTPRequestStatus } from '../enums/HTTPRequestStatus';
import Category from '../model/Category';
import BudgetAPIService from '../services/apiService';

interface CategoriesState {
    categories: Category[]; //{ [key: number] : Category }
    status: HTTPRequestStatus,
    error?: string
}

const initialState: CategoriesState = {
    categories: [],
    status: HTTPRequestStatus.IDLE,
    error: undefined
}

export const fetchCategories = createAsyncThunk('fetchCategories', async () => {
    const categories = await BudgetAPIService.getAllCategories();
    //todo map categories from id to self
    return categories as Category[];
})

export const categories = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        addCategory: (state, action: PayloadAction<Category>) => {
            let category = action.payload;
            state.categories[category.id] = category;
        },
        deleteCategory: (state, action: PayloadAction<Category>) => {

        }
    },
    extraReducers(builder) {
        builder
        .addCase(fetchCategories.pending, (state, action) => {
            state.status = HTTPRequestStatus.LOADING
        })
        .addCase(fetchCategories.fulfilled, (state, action) => {
            state.status = HTTPRequestStatus.SUCCEEDED;
            state.categories = action.payload;
        })
        .addCase(fetchCategories.rejected, (state, action) => {
            state.status = HTTPRequestStatus.FAILED;
            state.error = action.error.message;
        })

    }
})

export const { addCategory, deleteCategory } = categories.actions;

export default categories.reducer;