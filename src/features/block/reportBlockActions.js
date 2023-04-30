import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const backendURL = 'http://localhost:8080/api'


export const getReportBlocksById = createAsyncThunk(
    'reports/blocks',
    async ({id}, { rejectWithValue }) => {
        try {
            // configure header's Content-Type as JSON
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }

            const { data } = await axios.get(
                `${backendURL}/blocks/reports/${id}`,
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

export const updateReportBlock = createAsyncThunk(
    'reports/blocks/update',
    async ({id, reportBlock}, { rejectWithValue }) => {
        try {
            // configure header's Content-Type as JSON
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }

            const { data } = await axios.put(
                `${backendURL}/blocks/${id}`, {
                    reportBlock
                },
                config
            )
            // store user's token in local storage

            return data
        } catch (error) {
            // return custom error message from API if any
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)

export const createReportBlock = createAsyncThunk(
    'reports/blocks/create',
    async ({reportBlock}, { rejectWithValue }) => {
        try {
            // configure header's Content-Type as JSON
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }

            const { data } = await axios.post(
                `${backendURL}/blocks`, {
                    reportBlock
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

export const deleteReportBlock = createAsyncThunk(
    'reports/blocks/delete',
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
                `${backendURL}/blocks/${id}`,
                config
            )
            // store user's token in local storage

            return id
        } catch (error) {
            // return custom error message from API if any
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)

export const deleteReportBlockWithChildren = createAsyncThunk(
    'reports/blocks/delete/children',
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
                `${backendURL}/blocks/${id}/children`,
                config
            )
            // store user's token in local storage

            return id
        } catch (error) {
            // return custom error message from API if any
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)

