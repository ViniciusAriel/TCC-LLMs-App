import { React } from "react";

import "./textBubble.css";

export default function TextBubble({ message }) {
    return (
        <div className="textbubble-container">
            {!message.sender_is_llm ? (
                <div className="user-message">
                    <p>{message.content}</p>
                </div>
            ) : (
                <div className="chat-message">
                    <p>{message.content}</p>
                </div>
            )}
        </div>
    );
}
