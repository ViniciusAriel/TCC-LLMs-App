import { React, useEffect, useRef } from "react";

import TextBubble from "../textbubble/textBubble.js";

import "./dialog.css";

export default function Dialog({ messages }) {
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollTop =
                messagesEndRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="dialog-container" ref={messagesEndRef}>
            {messages.map((message, index) => {
                return <TextBubble message={message} key={index} />;
            })}
            <div ref={messagesEndRef}></div>
        </div>
    );
}
