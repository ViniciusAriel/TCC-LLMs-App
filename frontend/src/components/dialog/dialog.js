import { React, useEffect, useRef } from "react";

import { FaSpinner } from "react-icons/fa6";

import TextBubble from "../textbubble/textBubble.js";

import "./dialog.css";

export default function Dialog({ messages, loading }) {
    const dialogContainerRef = useRef(null); // Ref principal para o contêiner

    useEffect(() => {
        if (dialogContainerRef.current) {
            dialogContainerRef.current.scrollTop =
                dialogContainerRef.current.scrollHeight;
        }
    }, [messages, loading]); // Observa alterações em mensagens e loading

    return (
        <div className="dialog-container" ref={dialogContainerRef}>
            {messages.map((message, index) => {
                return <TextBubble message={message} key={index} />;
            })}
            {loading && (
                <div className="loading-spinner">
                    <FaSpinner color="#2F4D65" />
                </div>
            )}
        </div>
    );
}
