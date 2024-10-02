import React from "react";

import "./button.css";

export default function Button({ title, onClick, color }) {
    return (
        <div className={`button-container ${color}`} onClick={onClick}>
            {title}
        </div>
    );
}
