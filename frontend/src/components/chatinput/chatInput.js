import React from "react";

import "./chatInput.css";

export default function ChatInput({ onChange }) {
    return (
        <div className="chatinput-container">
            <input
                type="text"
                onChange={onChange}
                placeholder="Comece a escrever... :)"
            />
        </div>
    );
}
