import {useDispatch, useSelector} from 'react-redux'
import '../styles/profile.css'
import axios from "axios";
import Tree from "../components/tree/DocumentTree";
import {useEffect, useState} from "react";
import {getReportBlocksById} from "../features/report/reportActions";
import {Col, Container, Row, Spinner} from "react-bootstrap";
import { useParams } from 'react-router';
import {useForm} from "react-hook-form";
import {setCredentials} from "../features/auth/authSlice";

const ReportEditor = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { loading, reportData, error } = useSelector(
        (state) => state.report
    )

    useEffect(() => {
        dispatch(getReportBlocksById({id: id}));
    }, []);

    useEffect(() => {
    }, [reportData])

    const tree = loading ? <Spinner/> : <Tree data={reportData[0].blocks}/>
    return (
        <Container fluid>
            <Row className={"h-100"}>
                <Col sm={10}>
                    <div>
                        <div>
                            {tree}
                        </div>
                    </div>
                </Col>
                <Col sm={2}>
                    <div className={"h-100"} style={{paddingLeft: "10px", borderLeft: "3px black solid"}}>
                        Side-bar will be there. Report id: {id}
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
export default ReportEditor