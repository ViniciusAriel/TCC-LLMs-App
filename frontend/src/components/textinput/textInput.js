import React from "react";

import "./textInput.css";

export default function TextInput({ title, onChange, value }) {
    return (
        <div className="textinput-container" onChange={onChange} value={value}>
            <p>{title}</p>
            <input
                type="text"
                onChange={onChange}
                placeholder="Título"
                value={value}
            />
        </div>
    );
}
