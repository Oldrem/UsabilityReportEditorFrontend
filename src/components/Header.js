import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link, NavLink} from 'react-router-dom'
import { useGetUserDetailsQuery } from '../features/auth/authService'
import { logout, setCredentials } from '../features/auth/authSlice'
import '../styles/header.css'
import {Button, Col, Container, Row} from "react-bootstrap";

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
    else if (userInfo.username == null){
        usernameText = <span>You're not logged in</span>
    }
    else {
        usernameText = <span>Logged in as {userInfo.username}</span>
    }
    return (
        <Container fluid>
        <header>
                <Row className={'navigation align-items-center'}>
                    <Col sm={2} className={'text-start '}>
                        <NavLink className={'header-link'} to='/'>Home</NavLink>
                        <NavLink className={'header-link'} to='/report/1'>Report</NavLink>
                    </Col>
                    <Col sm={7} className={'text-end'}>
                    </Col>
                    <Col sm={3} className={"text-end"} >
                        <div className={"d-inline me-2"}>{usernameText}</div>
                         {userInfo.username == null || !userInfo ? (
                             <div className={"d-inline"}>
                                 <Link to='/login' >
                                     <button className={'px-1 ms-0 me-1 button'}>Sign In</button>
                                 </Link>
                                 <Link to='/register'>
                                     <button className={'px-1 mx-0 button mw-100'}>Sign Up</button>
                                 </Link>
                             </div>
                         ) : (
                             <button className='button' onClick={() => dispatch(logout())}>Logout</button>
                         )}
                    </Col>
                </Row>
        </header>
        </Container>
    )
}

export default Header