import {useDispatch, useSelector} from 'react-redux'
import '../styles/profile.css'
import axios from "axios";
import Tree from "../components/tree/DocumentTree";
import {useEffect, useState} from "react";
import {getReportBlocksById} from "../features/report/reportActions";
import {Col, Container, Row, Spinner} from "react-bootstrap";

const ReportEditor = () => {
    const { userInfo } = useSelector((state) => state.auth)
    const { loading, reportData, error } = useSelector(
        (state) => state.report
    )

    useEffect(() => {

    }, []);
    console.log(reportData[0].blocks)
    const tree = loading ? <Spinner/> : <Tree data={reportData[0].blocks}/>
    return (
        <Container fluid>
            <Row className={"h-100"}>
                <Col sm={10} className={'text-start'}>
                    <div>
                        <span>
                            Welcome <strong>{userInfo?.username}!</strong>
                        </span>
                        <div>
                            {tree}
                        </div>
                    </div>
                </Col>
                <Col sm={2}>
                    <div className={"h-100"} style={{paddingLeft: "10px", borderLeft: "3px black solid"}}>
                        Side-bar will be there
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
export default ReportEditor