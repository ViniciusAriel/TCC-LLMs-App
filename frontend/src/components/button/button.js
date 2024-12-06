import React from "react";

import "./button.css";

export default function Button({ color, onClick, title }) {
    return (
        <div className={`button-container ${color}`} onClick={onClick}>
            {title}
        </div>
    );
}
