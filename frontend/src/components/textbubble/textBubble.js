import React from "react";

import "./textBubble.css";

export default function TextBubble({ message }) {
    return (
        <div className="textbubble-container">
            {!(message.fromChat) ? (
                <div className="user-message">
                    <p>USER: {message.content}</p>
                </div>
            ) : (
                <div className="chat-message">
                    <p>CHAT:{message.content}</p>
                </div>
            )}
        </div>
    );
}
