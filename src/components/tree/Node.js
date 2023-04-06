import React from 'react';
import {Link} from "react-router-dom";

const Node = ({ item, hasChildren, level, onToggle }) => {
    return (
        <div style={{ paddingLeft: `${level * 16}px`}}>
            <h4>{item.title}</h4>
            <span>{item.content}</span>
            {hasChildren && <Link onClick={onToggle}>⬇️</Link>}
        </div>
    );
};

export default Node;