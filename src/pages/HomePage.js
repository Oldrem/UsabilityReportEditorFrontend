import {Button, Card, Col, Container, Row, Spinner} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {getAllUserReports, updateReport, deleteReport} from "../features/report/reportActions";
import ReportForm from "../components/ReportForm";
import {useNavigate} from "react-router-dom";
import pen from '../images/edit.png'
import trash from '../images/delete.png'

const HomePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.auth)
    const { loading, reportList, error } = useSelector(
        (state) => state.report
    )

    const [showCreateForm, setShowCreateForm] = useState(false);

    useEffect(() => {
        dispatch(getAllUserReports({id: userInfo.id}));
    }, []);

    const openCreateForm = () => {
        setShowCreateForm(true);
    }

    const closeCreateForm = () => {
        setShowCreateForm(false);
    }

    const handleCardClick = (reportId) => {
        navigate(`report/${reportId}`)
    }

    const deleteReportById = (reportId) => {
        dispatch(deleteReport({id: reportId}));
    }



    console.log(reportList)
    return (
        <Container fluid >
            <ReportForm onHide={closeCreateForm} show={showCreateForm}/>
            <Row className={"mb-1"}>
                <h2>Начало работы</h2>
            </Row>
            <Row className={"mb-4"}>
                <Col sm={3}>
                    <Button className={"w-100"} variant={"primary"} onClick={openCreateForm}>Создать новый документ</Button>
                </Col>
            </Row>
            <Row>
                <h2>Последние: </h2>
            </Row>
            {reportList && Array.isArray(reportList[0]) && reportList[0].length > 0 ?
                <Row xs={1} md={2} lg={2} className="g-3 ">
                    {loading ? <Spinner/>
                        :
                        reportList[0].map((report) => (
                            <Col key={report.id}>
                                <Card className={"h-100 "}>
                                    <Card.Body className={"report-card"} onClick={() => {handleCardClick(report.id)}}>
                                        <Card.Title>{report.title}</Card.Title>
                                        <Card.Text>
                                            {report.text}
                                        </Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                        <Row>
                                            <Col xs={"12"} className={"text-end"}>
                                                <img src={pen} alt={"edit"} className={"icon icon-medium"}/>
                                                <img src={trash} alt={"trash"} className={"icon icon-medium"} onClick={() => {deleteReportById(report.id)}}/>
                                            </Col>
                                        </Row>
                                    </Card.Footer>
                                </Card>
                            </Col>
                        ))
                    }
                </Row>
               : <></>
            }

        </Container>
    )

}

export default HomePage