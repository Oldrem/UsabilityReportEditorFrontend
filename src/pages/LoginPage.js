import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../features/auth/authActions'
import {getReportBlocksById} from "../features/report/reportActions";
import Error from '../components/Error'
import {Spinner} from "react-bootstrap";

const LoginScreen = () => {
    const { loading, userInfo, error } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    const { register, handleSubmit } = useForm()

    const navigate = useNavigate()

    // redirect authenticated user to profile screen
    useEffect(() => {
        if (userInfo.username) {
            navigate('/user-profile')
        }
    }, [navigate, userInfo])

    const submitForm = (data) => {
        dispatch(userLogin(data))
        dispatch(getReportBlocksById({id: 1}))
    }

    return (
        <form onSubmit={handleSubmit(submitForm)}>
            {error && <Error>{error}</Error>}
            <div className='form-group'>
                <label htmlFor='email'>User name</label>
                <input
                    type='text'
                    className='form-input'
                    {...register('username')}
                    required
                />
            </div>
            <div className='form-group'>
                <label htmlFor='password'>Password</label>
                <input
                    type='password'
                    className='form-input'
                    {...register('password')}
                    required
                />
            </div>
            <button type='submit' className='button' disabled={loading}>
                {loading ? <Spinner /> : 'Login'}
            </button>
        </form>
    )
}

export default LoginScreen