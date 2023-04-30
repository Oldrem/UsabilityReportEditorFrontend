import {Button, Form, Modal} from "react-bootstrap";
import {createReport} from "../features/report/reportActions";
import {useDispatch} from "react-redux";
import React, {useState} from "react";

const ReportForm = (props) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = () => {
        const requestData = {
            title: title,
            text: description
        }
        dispatch(createReport({report: requestData}));
    }

    return (
        <Modal
            {...props}
            size={"lg"}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Создать новый отчёт
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="createReport.title">
                        <Form.Label>Заголовок отчёта</Form.Label>
                        <Form.Control type="text" placeholder="..." maxLength={128} onChange={(e)=>{setTitle (e.target.value)}}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="createReport.description">
                        <Form.Label>Краткое описание</Form.Label>
                        <Form.Control as="textarea" placeholder="..." rows={3} maxLength={256} onChange={(e)=>{setDescription (e.target.value)}}/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Закрыть</Button>
                <Button variant={"success"} onClick={()=> {handleSubmit(); props.onHide();}}>Отправить</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ReportForm