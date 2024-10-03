import React from "react";

import "./chatInput.css";

export default function ChatInput({ onChange, placeholder, onKeyDown, value }) {
    return (
        <div className="chatinput-container">
            <input
                type="text"
                onChange={onChange}
                placeholder={placeholder}
                onKeyDown={onKeyDown}
                value={value}
            />
        </div>
    );
}
