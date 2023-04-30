import React from 'react';
import {Link} from "react-router-dom";
import {Button, Col, OverlayTrigger, Popover, Row} from "react-bootstrap";
import {forEach} from "react-bootstrap/ElementChildren";
import ReportBlock from "../ReportBlock";


const Node = ({ item, hasChildren, level, onToggle }) => {
    //console.log(item.title + ", level: " + level + ", margin = " + margin + ", padding = " + padding)
    return (
        <div>

            <Row className={"m-0"}>
                {[...Array(level)].map((x, i) =>
                    <Col key={i} style = {{maxWidth: "30px", padding: "0px"}}>
                         <div className={"document-branch h-100"} style = {{padding: "0px"}} />
                    </Col>
                )}
                <Col  style={{padding: "0px"}}>
                    <ReportBlock item={item} hasChildren={hasChildren} onToggle={onToggle}/>
                </Col>
            </Row>
        </div>
    );
};

export default Node;