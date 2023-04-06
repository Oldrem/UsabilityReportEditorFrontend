import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import {useNavigate} from "react-router-dom";

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
