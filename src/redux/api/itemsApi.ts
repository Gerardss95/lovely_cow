import axios from 'axios'
import { initialApiState, ApiCallBase } from './apiConfiguration'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ApiItemsResponse } from '../../types/types'

interface GetItemsCall extends ApiCallBase {
    response: ApiItemsResponse
}

interface State {
    getItems: GetItemsCall
}

const initialState: State = {
    getItems: initialApiState
}

export const getItems = createAsyncThunk(
    'items/getItems',
    async () => { 
        const response = await axios.get('https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/items.json')
        return response.data
})

export const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        resetItemsApiCall: (state) => {
        state.getItems ={ ...initialApiState, response: state.getItems.response }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getItems.pending, (state) => {
            state.getItems.loading = 'pending'
        })
        builder.addCase(getItems.fulfilled, (state, action) => {
            state.getItems.loading = 'succeeded'
            state.getItems.response = action.payload
        })
        builder.addCase(getItems.rejected, (state, action) => {
            state.getItems.loading = 'failed'
            state.getItems.error = action.error.message
        })
    }
})

export const { resetItemsApiCall } = itemsSlice.actions
export default itemsSlice.reducer 