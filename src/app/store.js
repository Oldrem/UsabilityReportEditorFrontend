import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import reportBlockReducer from '../features/block/reportBlockSlice'
import reportReducer from "../features/report/reportSlice";
import { authApi } from '../features/auth/authService'

const store = configureStore({
    reducer: {
        auth: authReducer,
        report: reportReducer,
        reportBlock: reportBlockReducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware),
})
export default store