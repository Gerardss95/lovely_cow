import axios from 'axios'
import { initialApiState, ApiCallBase } from './apiConfiguration'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ApiItemsResponse } from '../../types/itemModel'

interface GetItemCall extends ApiCallBase {
    response: ApiItemsResponse
}

interface State {
    getItem: GetItemCall
}

const initialState: State = {
    getItem: initialApiState
}

export const getItem = createAsyncThunk(
    'items/getItem',
    async () => { 
        const response = await axios.get('https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/items.json')
        return response.data
})

export const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
      resetItemsApiCall: (state) => {
        state.getItem ={ ...initialApiState, response: state.getItem.response }
      }
    },
    extraReducers: (builder) => {
        builder.addCase(getItem.pending, (state) => {
            state.getItem.loading = 'pending'
        })
        builder.addCase(getItem.fulfilled, (state, action) => {
            state.getItem.loading = 'succeeded'
            state.getItem.response = action.payload
        })
        builder.addCase(getItem.rejected, (state, action) => {
            state.getItem.loading = 'failed'
            state.getItem.error = action.error.message
        })
    }
})

export const { resetItemsApiCall } = itemsSlice.actions
export default itemsSlice.reducer 