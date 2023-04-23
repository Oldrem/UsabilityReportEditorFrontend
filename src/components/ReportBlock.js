import DOMPurify from 'dompurify';
import ReactQuill, {Quill} from "react-quill";
import React, {useState} from "react";
import ImageResize from 'quill-image-resize-module-react';
import {Button, Col, Row} from "react-bootstrap";
import pen from '../images/edit.png'
import trash from '../images/delete.png'
import arrow from '../images/collapse-arrow-2.png'

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
    const [value, setValue] =  useState("");
    const [isEditing, setIsEditing] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false)

    const switchEditingMode = () => {
        setIsEditing(isEditing => !isEditing);
    }

    const switchExpanded = () => {
        setIsExpanded(isExpanded => !isExpanded);
        console.log(isExpanded);
    }

    let containerClassname = isEditing ? "report-block-editing" : "report-block";

    if (hasChildren) {
        containerClassname += ' report-block-expandable'
    }

    return (
        <div className={containerClassname + " position-relative"}>
            <Row className={"m-0"}>
                <Col sm={10} className={"p-0"}>
                    <h4>
                        {!isEditing ?
                        item.title
                        : <input defaultValue={item.title} className={"w-100 flex-sm-wrap"}/>}
                    </h4>
                </Col>
                <Col sm={2} className={"text-end p-0"}>
                    <img src={pen} onClick={switchEditingMode} alt={"edit"} className={"icon"}/>
                    <img src={trash} alt={"trash"} className={"icon"}/>
                </Col>
            </Row>
            <Row className={"m-0"}>
                <Col sm={12} className={"p-0 pb-2"}>
                    <div>
                        {!isEditing ?
                            <div className={"ql-editor p-0"} dangerouslySetInnerHTML={sanitizeHtml(value)}/>
                            : <ReactQuill  className={"p-0"} modules={modules} theme="snow" value={value} onChange={setValue} placeholder="..." />}
                        <div className={"text-end"}>
                            {!isEditing ?
                                <></>
                                : <button className={"btn btn-success"} onClick={switchEditingMode}>Save</button>}
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