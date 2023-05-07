import {useDispatch, useSelector} from 'react-redux'
import '../styles/profile.css'
import axios from "axios";
import Tree from "../components/tree/DocumentTree";
import React, {useEffect, useRef, useState} from "react";
import {createReportBlock, getReportBlocksById} from "../features/block/reportBlockActions";
import {Button, Col, Container, Row, Spinner} from "react-bootstrap";
import { useParams } from 'react-router';
import add from '../images/add.png'
import { PDFExport } from '@progress/kendo-react-pdf';
import ReportForm from "../components/ReportForm";
import ImportModal from "../components/ImportModal";
import {getAllUserReports} from "../features/report/reportActions";
import {switchExportPdf} from "../features/report/reportSlice";


const ReportEditor = () => {
    const dispatch = useDispatch();
    const pdfRef = useRef();
    const { id } = useParams();
    const { loading, reportData, error } = useSelector(
        (state) => state.reportBlock
    )
    const { exportAsPdf } = useSelector(
        (state) => state.report
    )

    useEffect(() => {
        dispatch(getReportBlocksById({id: id}));
    }, []);

    useEffect(() => {
    }, [reportData])

    const createBlock = () => {
        const requestData = {
            parentId: null,
            reportId: id,
            importReportId: null,
            title: 'New block',
            content: ''
        }
        dispatch(createReportBlock({reportBlock: requestData}));
    }

    const generatePDF = () => {
        pdfRef.current.save();
    }


    const tree = loading ? <Spinner/> : <Tree data={reportData[0].blocks}/>
    if (exportAsPdf){
        generatePDF();
        dispatch(switchExportPdf());
    }
    return (
        <Container fluid className={"ps-0"}>
            <PDFExport
                       margin="2cm"
                       fileName="report.pdf"
                       title="Report"
                       subject=""
                       keywords=""
                       ref={pdfRef}>
            <Row className={"h-100 justify-content-center"} id={"report-body"}>
                <Col sm={10} className={"ps-0 mb-5 pb-5"}>
                    {loading ? <Spinner/>
                    :
                        <div>
                            <div>
                                {tree}
                            </div>
                            <div className={"pt-2 "}>
                                <button className={"add-report-block-button mt-4"} onClick={createBlock}>
                                    <img src={add} alt={"+"} className={"icon icon-medium"}/>
                                </button>
                                <span className={"fw-semibold ms-1"}>Новый блок</span>
                            </div>
                        </div>
                    }
                </Col>
            </Row>
            </PDFExport>
        </Container>
    )
}

export default ReportEditor