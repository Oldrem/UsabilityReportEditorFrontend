import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    loading: true,
    reportList: {},
    error: null
}

const importSlice = createSlice({
    name: 'import',
    initialState,
    reducers: {
    },
    extraReducers: {

    }
})

export default importSlice.reducer