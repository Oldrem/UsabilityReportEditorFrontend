import { createSlice } from '@reduxjs/toolkit'
import {getReportBlocksById} from "./reportActions";

const initialState = {
    loading: false,
    reportData: {},
    error: null
}

const reportSlice = createSlice({
    name: 'report',
    initialState,
    reducers: {
    },
    extraReducers: {
        [getReportBlocksById.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [getReportBlocksById.fulfilled]: (state, { payload }) => {
            console.log(payload)
            state.loading = false
            state.reportData = payload
        },
        [getReportBlocksById.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        }
    }
})

export default reportSlice.reducer