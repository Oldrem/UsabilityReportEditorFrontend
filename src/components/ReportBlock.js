import DOMPurify from 'dompurify';
import ReactQuill, {Quill} from "react-quill";
import React, {useRef, useState} from "react";
import ImageResize from 'quill-image-resize-module-react';
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import pen from '../images/edit.png'
import trash from '../images/delete.png'
import add from '../images/add-2.png'
import arrow from '../images/collapse-arrow-2.png'
import dragAndDrop from '../images/drag.png'
import {updateReportBlock, createReportBlock, deleteReportBlock, deleteReportBlockWithChildren} from "../features/block/reportBlockActions";
import {moveReportBlock} from "../features/block/reportBlockSlice";
import {useDispatch} from "react-redux";
import {useDrag, useDrop} from "react-dnd";

window.Quill = Quill
Quill.register('modules/imageResize', ImageResize);

const  modules  = {
    imageResize: {
        parchment: Quill.import('parchment'),
        modules: ['Resize', 'DisplaySize']
    },
    toolbar: [
        [{ font: [] }],
        [{ size : ['small', false, 'large']}],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ script:  "sub" }, { script:  "super" }],
        [{ list:  "ordered" }, { list:  "bullet" }],
        [{ indent:  "-1" }, { indent:  "+1" }, { align: [] }],
        ["link", "image"],
        ["clean"],
    ],
};



function sanitizeHtml(html) {
    return {
        __html: DOMPurify.sanitize(html)
    }
}


const ReportBlock = ({ item, hasChildren, onToggle, level }) => {
    const ref = useRef(null);
    const dispatch = useDispatch();
    const [blockContent, setBlockContent] =  useState(item.content);
    const [blockTitle, setBlockTitle] =  useState(item.title);
    const [isEditing, setIsEditing] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false)
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [deleteWithChildren, setDeleteWithChildren] = useState(false);
    const [isAbove, setIsAbove] = useState(true);
    const [showTooltip, setShowTooltip] = useState(false);

    const [{ isDragging }, drag] = useDrag({
        type: 'REPORT_BLOCK',
        item: {block: item },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [{ canDrop, isOver }, drop] = useDrop({
        accept: 'REPORT_BLOCK',
        drop: (droppedBlock, monitor) => {
            const isAbove = isDropPositionAbove(monitor, ref);
            onDrop(droppedBlock.block, item, isAbove)
        },
        canDrop: (droppedBlock) => droppedBlock.block.id !== item.id,
        hover: (droppedBlock, monitor) => {
            setIsAbove(isDropPositionAbove(monitor, ref));
        },
        collect: (monitor) => ({
            canDrop: monitor.canDrop(),
            isOver: monitor.isOver(),
        }),
    });

    const isDropPositionAbove = (monitor, drop) => {
        const clientOffset = monitor.getClientOffset();
        const targetRect = drop.current.getBoundingClientRect();
        const targetMiddleY = (targetRect.bottom - targetRect.top) / 2;
        const mousePosition = clientOffset.y - targetRect.top;
        return mousePosition < targetMiddleY; //true - above, false - below
    };

    const draggedBlockStyle = {
        opacity: isDragging ? 0.5 : 1
    };

    let hoveredBlockClass = "";
    if (isOver && canDrop){
        if (isAbove){
            hoveredBlockClass = " hovered-above"
        }
        else{
            hoveredBlockClass = " hovered-below"
        }
    }
    const handleClose = () => setShowConfirmation(false);
    const handleOpen = () => setShowConfirmation(true);

    const onDrop = (dragBlock, targetBlock, isAbove) => {
        console.log(dragBlock.id + " " + targetBlock.id + " " + isAbove)

        if (canDrop){
            const requestData = {
                id: item.id,
                parentId: targetBlock.parentId,
                reportId: item.reportId,
                importReportId: item.importReportId,
                title: blockTitle,
                content: blockContent
            }
            dispatch(updateReportBlock({id: item.id, reportBlock: requestData}));
            dispatch(moveReportBlock({ movedBlock: dragBlock, targetBlock: targetBlock, isBefore: isAbove }));
        }
    }

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
            title: 'Новый блок',
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

    let containerClassname = isEditing ? "report-block-editing" : "";

    if (hasChildren) {
        containerClassname += ' report-block-expandable'
    }

    drop(ref);
    return (

        <Row ref={ref} className={"m-0 position-relative report-block-tooltip-hitbox"}>


            {[...Array(level)].map((x, i) =>
                <Col key={i} style = {{maxWidth: "30px", padding: "0px"}}>
                    <div className={"document-branch h-100"} style = {{padding: "0px"}} />
                </Col>
            )}

            <Col style={draggedBlockStyle} className={"p-0 mt-4"}>
                {!isEditing &&
                <div className={"position-absolute report-tooltip px-1 mt-4 text-end"}>
                    <div ref={drag} className={"d-inline drag-and-drop"}>
                        <img src={dragAndDrop} alt={"drag"} className={"icon icon-medium me-0"}/>
                    </div>
                    {level < 5 ? <img src={add} onClick={createBlock} alt={"add"} className={"icon icon-small"}/>
                        : <></>}
                    <img src={pen} onClick={switchEditingMode} alt={"edit"} className={"icon icon-small"}/>
                    <img src={trash} onClick={handleOpen} alt={"trash"} className={"icon icon-small"}/>
                </div>}
                <div className={containerClassname + " report-block position-relative report-tooltip-container " + hoveredBlockClass}>
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
                        <Col sm={12} className={"p-0"}>
                            <h4>
                                {!isEditing ?
                                    blockTitle
                                    : <input defaultValue={blockTitle} className={"w-100 flex-sm-wrap"} onChange={(e)=>{setBlockTitle (e.target.value)}}/>}
                            </h4>
                        </Col>
                    </Row>
                    <Row className={"m-0"}>
                        <Col sm={12} className={"p-0 pb-2"}>
                            <div>
                                {!isEditing ?
                                    <div onClick={switchEditingMode} className={"ql-editor p-0"} dangerouslySetInnerHTML={sanitizeHtml(blockContent)}/>
                                    : <ReactQuill  className={"p-0"} modules={modules} theme="snow" value={blockContent} onChange={setBlockContent} placeholder="..." />}
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
                        <img src={arrow} onClick={()=> {onToggle(); switchExpanded();}} alt={"edit"} className={isExpanded ? "icon icon-medium" : "icon icon-medium img-flip"}/>
                    </div>
                    }
                </div>
            </Col>
        </Row>
    )
}

export default ReportBlock