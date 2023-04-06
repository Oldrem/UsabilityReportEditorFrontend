import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import {useNavigate} from "react-router-dom";

const backendURL = 'http://localhost:8080/api'


export const userLogin = createAsyncThunk(
    'user/login',
    async ({ username, password }, { rejectWithValue }) => {
        try {
            // configure header's Content-Type as JSON
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }

            const { data } = await axios.post(
                `${backendURL}/auth/login`,
                {
                    username: username,
                    password: password },
                config
            )

            // store user's token in local storage
            localStorage.setItem('userToken', data.accessToken)

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

export const registerUser = createAsyncThunk(
    'user/register',
    async ({ username, password }, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            await axios.post(
                `${backendURL}/auth/register`,
                {
                    username: username,
                    password: password },
                config
            )
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)