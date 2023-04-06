import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Error from '../components/Error'
import { registerUser } from '../features/auth/authActions'
import {finishRegistration} from "../features/auth/authSlice";
import {Spinner} from "react-bootstrap";

const RegistrationPage = () => {
    const [customError, setCustomError] = useState(null)

    const { loading, userInfo, error, success } = useSelector(
        (state) => state.auth
    )
    const dispatch = useDispatch()

    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()

    useEffect(() => {
        // redirect authenticated user to profile screen
        if (userInfo.username) navigate('/user-profile')
        // redirect user to login page if registration was successful
        if (success) {
            dispatch(finishRegistration());
            navigate('/login');
        }
    }, [navigate, userInfo, success])

    const submitForm = (data) => {
        // check if passwords match
        if (data.password !== data.confirmPassword) {
            setCustomError('Password mismatch')
            return
        }
        // transform email string to lowercase to avoid case sensitivity issues in login
        dispatch(registerUser(data))
    }

    return (
        <form onSubmit={handleSubmit(submitForm)}>
            {error && <Error>{error}</Error>}
            {customError && <Error>{customError}</Error>}
            <div className='form-group'>
                <label htmlFor='username'>First Name</label>
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
            <div className='form-group'>
                <label htmlFor='password'>Confirm Password</label>
                <input
                    type='password'
                    className='form-input'
                    {...register('confirmPassword')}
                    required
                />
            </div>
            <button type='submit' className='button' disabled={loading}>
                {loading ? <Spinner /> : 'Register'}
            </button>
        </form>
    )
}
export default RegistrationPage