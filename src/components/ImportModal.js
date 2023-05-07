import {Button, Card, Form, Modal, Spinner} from "react-bootstrap";
import {createReport} from "../features/report/reportActions";
import {useDispatch} from "react-redux";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {createReportBlock} from "../features/block/reportBlockActions";

const ImportModal = (props) => {
    const dispatch = useDispatch();
    const backendURL = 'http://localhost:8080/api'
    const [items, setItems] = useState([]);
    let isLoading = false;
    const getItemList = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const {data} = await axios.get(
            `${backendURL}/${props.itemName}`,
            config
        )


        return data;
    }

    useEffect(() => {
        isLoading = true;
        async function onMount() {
            const data = await getItemList();
            setItems(data);
            isLoading = false;
        }
        onMount();
    }, []);

    const importItem = (content) => {
        const requestData = {
            parentId: null,
            reportId: props.reportId,
            importReportId: null,
            title: props.createdBlockTitle,
            content: content
        }
        dispatch(createReportBlock({reportBlock: requestData}));
        props.onHide();
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
                    {props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {isLoading ? <Spinner/> :
                    items.map((item) => {
                        return (
                        <Card className={"w-100 mb-3"} key={item.id}>
                            <Card.Body className={"report-card"} onClick={() => {importItem(item.text)}}>

                                <Card.Title>
                                    {item.title ? item.title : ''}
                                </Card.Title>
                                <Card.Text>
                                    {item.text}
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer className={"text-end"}>
                                <Button variant={"primary"} onClick={() => {importItem(item.text)}}>Импорт</Button>
                            </Card.Footer>
                        </Card>
                        )
                    })

                }
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ImportModal