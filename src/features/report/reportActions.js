import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const backendURL = 'http://localhost:8080/api'


export const getAllUserReports = createAsyncThunk(
    'reports',
    async ({id}, { rejectWithValue }) => {
        try {
            // configure header's Content-Type as JSON
            const token = localStorage.getItem('userToken');
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${token}`
                },
            }

            const { data } = await axios.get(
                `${backendURL}/reports`,
                config
            )

            return data
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)

export const createReport = createAsyncThunk(
    'reports/create',
    async ({report}, { rejectWithValue }) => {
        try {
            // configure header's Content-Type as JSON
            const token = localStorage.getItem('userToken');
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${token}`
                },
            }

            const { data } = await axios.post(
                `${backendURL}/reports`, {
                    report
                },
                config
            )

            return data
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)

export const updateReport = createAsyncThunk(
    'reports/update',
    async ({id, report}, { rejectWithValue }) => {
        try {
            // configure header's Content-Type as JSON
            const token = localStorage.getItem('userToken');
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${token}`
                },
            }

            const { data } = await axios.put(
                `${backendURL}/reports/${id}`, {
                    report
                },
                config
            )

            return data
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)

export const deleteReport = createAsyncThunk(
    'reports/delete',
    async ({id}, { rejectWithValue }) => {
        try {
            // configure header's Content-Type as JSON
            const token = localStorage.getItem('userToken');
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${token}`
                },
            }

            const { data } = await axios.delete(
                `${backendURL}/reports/${id}`,
                config
            )

            return id
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)

