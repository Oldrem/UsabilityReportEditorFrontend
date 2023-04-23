import React from 'react';
import {Link} from "react-router-dom";
import {Button, Col, Row} from "react-bootstrap";
import {forEach} from "react-bootstrap/ElementChildren";
import ReportBlock from "../ReportBlock";


const Node = ({ item, hasChildren, level, onToggle }) => {
    //console.log(item.title + ", level: " + level + ", margin = " + margin + ", padding = " + padding)
    return (
        <div>
            <Row>
                {[...Array(level)].map((x, i) =>
                    <Col style = {{maxWidth: "30px", padding: "0px"}}>
                         <div key={i} className={"document-branch h-100"} style = {{padding: "0px"}} />
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