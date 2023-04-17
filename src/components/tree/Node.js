import React from 'react';
import {Link} from "react-router-dom";
import {Button, Col, Row} from "react-bootstrap";
import {forEach} from "react-bootstrap/ElementChildren";
import ReactMarkdown from "react-markdown";

const Node = ({ item, hasChildren, level, onToggle }) => {
    let margin = level === 0 ? 0 : (level-1)*16;
    let padding = level === 0 ? 0 :  (level - (level - 1)) * 16;
    let borderClass = level === 0 ? '' : "document-branch";
    let documentDepthLines;
    for(let i = 0; i < level; i++){
        console.log(documentDepthLines)
        documentDepthLines += <div className={"document-branch"} style = {{width: "16px"}}/>;
    }

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
                    <Row style ={{margin: "0px 0px 0px 0px"}}>
                        <Col sm={8}  style={{padding: "0px"}}>
                            <h4>
                                <input defaultValue={item.title} className={"border-0 w-100 flex-sm-wrap"}/>
                            </h4>
                        </Col>
                    </Row>
                    <Row >
                        <Col sm={11} >
                              <textarea  className={"w-100"} defaultValue={item.content} style={{padding: "0px"}}>
                              </textarea>
                        </Col>
                        <Col sm={1} className={"text-start"}  style={{padding: "0px"}}>
                            {hasChildren && <Button onClick={onToggle}>⬇️</Button>}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default Node;