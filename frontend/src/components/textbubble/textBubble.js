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
                <div
                    className={`chat-message ${
                        message.sender_is_main_llm ? "main" : ""
                    }`}
                >
                    <p>{message.content}</p>
                </div>
            )}
        </div>
    );
}
