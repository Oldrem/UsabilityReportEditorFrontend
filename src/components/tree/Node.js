import React from 'react';
import {Link} from "react-router-dom";
import {Button, Col, OverlayTrigger, Popover, Row} from "react-bootstrap";
import {forEach} from "react-bootstrap/ElementChildren";
import ReportBlock from "../ReportBlock";


const Node = ({ item, hasChildren, level, onToggle }) => {
    //console.log(item.title + ", level: " + level + ", margin = " + margin + ", padding = " + padding)
    return (
        <div>
            <ReportBlock item={item} hasChildren={hasChildren} onToggle={onToggle} level={level}/>
        </div>
    );
};

export default Node;