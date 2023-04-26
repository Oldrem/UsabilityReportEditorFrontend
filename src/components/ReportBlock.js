import DOMPurify from 'dompurify';
import ReactQuill, {Quill} from "react-quill";
import React, {useState} from "react";
import ImageResize from 'quill-image-resize-module-react';
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import pen from '../images/edit.png'
import trash from '../images/delete.png'
import arrow from '../images/collapse-arrow-2.png'
import {updateReportBlock, createReportBlock, deleteReportBlock, deleteReportBlockWithChildren} from "../features/report/reportActions";
import {useDispatch} from "react-redux";

window.Quill = Quill
Quill.register('modules/imageResize', ImageResize);
const  modules  = {
    imageResize: {
        parchment: Quill.import('parchment'),
        modules: ['Resize', 'DisplaySize']
    },
    toolbar: [
        [{ font: [] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ script:  "sub" }, { script:  "super" }],
        [{ list:  "ordered" }, { list:  "bullet" }],
        [{ indent:  "-1" }, { indent:  "+1" }, { align: [] }],
        ["link", "image", "video"],
        ["clean"],
    ],
};



function sanitizeHtml(html) {
    return {
        __html: DOMPurify.sanitize(html)
    }
}


const ReportBlock = ({ item, hasChildren, onToggle }) => {
    const dispatch = useDispatch();
    const [blockContent, setBlockContent] =  useState(item.content);
    const [blockTitle, setBlockTitle] =  useState(item.title);
    const [isEditing, setIsEditing] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false)
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [deleteWithChildren, setDeleteWithChildren] = useState(false);

    const handleClose = () => setShowConfirmation(false);
    const handleOpen = () => setShowConfirmation(true);

    const updateBlock = () => {
        const requestData = {
            id: item.id,
            parentId: item.parentId,
            reportId: item.reportId,
            importReportId: item.importReportId,
            title: blockTitle,
            content: blockContent
        }
        dispatch(updateReportBlock({id: item.id, reportBlock: requestData}));
    }

    const deleteBlock = () => {
        if (deleteWithChildren){
            dispatch(deleteReportBlockWithChildren({id: item.id}));
        }
        else{
            dispatch(deleteReportBlock({id: item.id}));
        }
    }

    const createBlock = () => {
        const requestData = {
            parentId: item.id,
            reportId: item.reportId,
            importReportId: null,
            title: 'New block',
            content: ''
        }
        dispatch(createReportBlock({reportBlock: requestData}));
    }

    const switchEditingMode = () => {
        setIsEditing(isEditing => !isEditing);
    }

    const switchExpanded = () => {
        setIsExpanded(isExpanded => !isExpanded);
    }

    const switchDeleteWithChildren = () => {
        setDeleteWithChildren(deleteWithChildren => !deleteWithChildren);
    }

    let containerClassname = isEditing ? "report-block-editing" : "report-block";

    if (hasChildren) {
        containerClassname += ' report-block-expandable'
    }

    return (
        <div className={containerClassname + " position-relative"}>
            <Modal show={showConfirmation} size="lg" onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to delete this block?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Check
                            type={"checkbox"}
                            id={`default-checkbox`}
                            label={`Also delete all of it's children blocks. `}
                            checked={deleteWithChildren}
                            onChange={switchDeleteWithChildren}
                        />
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={() => {handleClose(); deleteBlock();}}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
            <Row className={"m-0"}>
                <Col sm={10} className={"p-0"}>
                    <h4>
                        {!isEditing ?
                            blockTitle
                            : <input defaultValue={blockTitle} className={"w-100 flex-sm-wrap"} onChange={(e)=>{setBlockTitle (e.target.value)}}/>}
                    </h4>
                </Col>
                <Col sm={2} className={"text-end p-0"}>
                    <button onClick={createBlock}> + </button>
                    <img src={pen} onClick={switchEditingMode} alt={"edit"} className={"icon"}/>
                    <img src={trash} onClick={handleOpen} alt={"trash"} className={"icon"}/>
                </Col>
            </Row>
            <Row className={"m-0"}>
                <Col sm={12} className={"p-0 pb-2"}>
                    <div>
                        {!isEditing ?
                            <div className={"ql-editor p-0"} dangerouslySetInnerHTML={sanitizeHtml(blockContent)}/>
                            : <ReactQuill  className={"p-0"} modules={modules} theme="bubble" value={blockContent} onChange={setBlockContent} placeholder="..." />}
                        <div className={"text-end"}>
                            {!isEditing ?
                                <></>
                                : <button className={"btn btn-success"} onClick={() => {updateBlock(); switchEditingMode();}}>Save</button>}
                        </div>
                    </div>
                </Col>
            </Row>
            {hasChildren && !isEditing &&
            <div className={"icon position-absolute top-100 start-50 translate-middle"}>
                <img src={arrow} onClick={()=> {onToggle(); switchExpanded();}} alt={"edit"} className={isExpanded ? "icon " : "icon img-flip"}/>
            </div>
            }
        </div>


    )
}

export default ReportBlock