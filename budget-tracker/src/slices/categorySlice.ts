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

export const postCategory = createAsyncThunk('postCategory', async (category: Category) => {
    const response = await BudgetAPIService.postCategory(category);
    return response;
})

export const fetchCategories = createAsyncThunk('fetchCategories', async () => {
    const categories = await BudgetAPIService.getAllCategories();
    //todo map categories from id to self
    return categories as Category[];
});

export const putCategory = createAsyncThunk('putCategory', async (category: Category) => {
    const response = await BudgetAPIService.putCategory(category);
    return response;
})

export const deleteCategory = createAsyncThunk('deleteCategory', async (category: Category) =>  {
    const response = await BudgetAPIService.deleteCategory(category);
    return category;
})

export const categories = createSlice({
    name: 'categories',
    initialState,
    reducers: {
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
        .addCase(postCategory.fulfilled, (state, action) => {
            state.status = HTTPRequestStatus.SUCCEEDED;
            state.categories.push(action.payload);
            state.categories = state.categories.sort((a, b) => a.description.localeCompare(b.description));
        })
        .addCase(putCategory.fulfilled, (state, action) => {
            state.status = HTTPRequestStatus.SUCCEEDED;
            let category = action.payload;
            let index = state.categories.findIndex(cat => cat.id == category.id);
            state.categories[index] = category;
        })
        .addCase(deleteCategory.fulfilled, (state, action) => {
            state.status = HTTPRequestStatus.SUCCEEDED;
            let category = action.payload;
            let index = state.categories.findIndex(cat => cat.id == category.id);
            state.categories.splice(index, 1);
        })

    }
})


export default categories.reducer;