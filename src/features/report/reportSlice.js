import { createSlice } from '@reduxjs/toolkit'
import {getAllUserReports, createReport, updateReport, deleteReport} from "./reportActions";
import produce from 'immer';

const initialState = {
    loading: true,
    reportList: {},
    error: null
}

const reportSlice = createSlice({
    name: 'report',
    initialState,
    reducers: {
    },
    extraReducers: {
        [getAllUserReports.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [getAllUserReports.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.reportList = payload
        },
        [getAllUserReports.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },

        [createReport.pending]: (state) => {
            state.error = null
        },
        [createReport.fulfilled]: (state, { payload }) => {
            console.log(state.reportList);
            state.reportList[0].push(payload[0])
        },
        [createReport.rejected]: (state, { payload }) => {
            state.error = payload
        },

        [updateReport.pending]: (state) => {
            state.error = null
        },
        [updateReport.fulfilled]: (state, { payload }) => {
            state.reportList[0] = state.reportList[0].map((report) => report.id === payload[0].id ? payload[0] : report);
        },
        [updateReport.rejected]: (state, { payload }) => {
            state.error = payload
        },

        [deleteReport.pending]: (state) => {
            state.error = null
        },
        [deleteReport.fulfilled]: (state, { payload }) => {
            console.log(payload);
            state.reportList[0] = state.reportList[0].filter(report => report.id !== payload)
        },
        [deleteReport.rejected]: (state, { payload }) => {
            state.error = payload
        },
    }
})

export default reportSlice.reducer