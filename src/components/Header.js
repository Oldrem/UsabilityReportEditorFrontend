import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { useGetUserDetailsQuery } from '../features/auth/authService'
import { logout, setCredentials } from '../features/auth/authSlice'
import '../styles/header.css'
import {Col, Container, Row} from "react-bootstrap";

const Header = () => {
    const { userInfo } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    // automatically authenticate user if token is found
    const { data, isFetching } = useGetUserDetailsQuery('userDetails', {
        pollingInterval: 900000, // 15mins
    })

    useEffect(() => {
        if (data) dispatch(setCredentials(data))
    }, [data, dispatch])

    let usernameText;
    if (isFetching) {
        usernameText = <span>Fetching your profile...</span>
    }
    else if (userInfo.username == null || false){
        usernameText = <span>You're not logged in</span>
    }
    else {
        usernameText = <span>"Logged in as {userInfo.username}"</span>
    }
    return (
        <Container fluid>
        <header>
                <Row className={'navigation align-items-center'}>
                    <Col sm={2} className={'text-end '}>
                        <NavLink to='/'>Home</NavLink>
                        <NavLink to='/login'>Login</NavLink>
                        <NavLink to='/register'>Register</NavLink>
                        <NavLink to='/user-profile'>Profile</NavLink>
                    </Col>
                    <Col sm={9} className={'text-end '}>
                        {usernameText}
                    </Col>
                    <Col sm={1} className={'text-center'}>
                        <div>
                            {userInfo ? (
                                <button className='button' onClick={() => dispatch(logout())}>
                                    Logout
                                </button>
                            ) : (
                                <NavLink className='button' to='/login'>
                                    Login
                                </NavLink>
                            )}
                        </div>
                    </Col>
                </Row>
        </header>
        </Container>
    )
}

export default Header