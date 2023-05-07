import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link, NavLink, useLocation, matchPath} from 'react-router-dom'
import { useGetUserDetailsQuery } from '../features/auth/authService'
import { logout, setCredentials } from '../features/auth/authSlice'
import '../styles/header.css'
import {Button, Col, Container, Nav, Navbar, NavDropdown, Row} from "react-bootstrap";
import ImportModal from "./ImportModal";
import {switchExportPdf} from "../features/report/reportSlice";

const Header = () => {
    const { userInfo } = useSelector((state) => state.auth)
    const [showHypothesisList, setShowHypothesisList] = useState(false);
    const [showTaskList, setShowTaskList] = useState(false);

    const location = useLocation()
    const dispatch = useDispatch()

    // automatically authenticate user if token is found
    const { data, isFetching } = useGetUserDetailsQuery('userDetails', {
        pollingInterval: 900000, // 15mins
    })

    useEffect(() => {
        if (data) dispatch(setCredentials(data))
    }, [data, dispatch])

    let usernameText;;

    if (isFetching) {
        usernameText = <span>Аутентификация...</span>
    }
    else if (userInfo.username == null){
        usernameText = <span>Вы не авторизированы:</span>
    }
    else {
        usernameText = <span>Пользователь: {userInfo.username}.</span>
    }
    const isViewingReport = matchPath({
        path: "/report/:id"
    }, location.pathname)

    const openHypothesisList = () => {
        setShowHypothesisList(true);
    }

    const closeHypothesisList = () => {
        setShowHypothesisList(false);
    }

    const openTaskList = () => {
        setShowTaskList(true);
    }

    const closeTaskList = () => {
        setShowTaskList(false);
    }

    return (
        <div>
            {!!isViewingReport &&
                <>
                    <ImportModal onHide={closeHypothesisList} show={showHypothesisList} title={"Импорт гипотезы"} itemName={"hypotheses"} reportId={isViewingReport.params.id} createdBlockTitle={"Гипотеза"}/>
                    <ImportModal onHide={closeTaskList} show={showTaskList} title={"Импорт задания"} itemName={"tasks"} reportId={isViewingReport.params.id} createdBlockTitle={"Задание"}/>
                </>
            }
            <Navbar bg="light" sticky={"top"} className={"pe-3"}>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/" className={"home-link px-3"}>Home</Nav.Link>
                    {!!isViewingReport &&
                    <>
                        <NavDropdown title="Импорт" className={"ps-2"}>
                            <NavDropdown.Item onClick={openHypothesisList}>Импорт гипотезы</NavDropdown.Item>
                            <NavDropdown.Item onClick={openTaskList}>Импорт задачи</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Экспорт">
                            <NavDropdown.Item onClick={() => {dispatch(switchExportPdf())}}>Экспорт страницы в PDF</NavDropdown.Item>
                        </NavDropdown>
                    </>
                    }
                </Nav>
                <Nav>
                    <Navbar.Text className={"d-none d-sm-block"}>
                        {usernameText}
                    </Navbar.Text>
                    {userInfo.username == null || !userInfo ?
                        <>
                            <Nav.Link as={Link} className={"text-decoration-underline"} to='/register'>Регистрация</Nav.Link>
                            <Nav.Link as={Link} className={"text-decoration-underline"} to='/login'>Войти</Nav.Link>
                        </>
                        : <Nav.Link as={Link} to="/login" className={"text-decoration-underline"} onClick={() => dispatch(logout())}>Выйти</Nav.Link> }

                </Nav>
            </Navbar>
        </div>

    )
}

export default Header