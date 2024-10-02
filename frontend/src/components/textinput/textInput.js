import React from "react";

import "./textInput.css";

export default function TextInput({ title, onChange }) {
    return (
        <div className="textinput-container">
            <p>{title}</p>
            <input type="text" onChange={onChange} placeholder="Título" />
        </div>
    );
}
