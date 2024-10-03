import { React, useState } from "react";

import ChatInput from "../chatinput/chatInput.js";
import SendButton from "../sendbutton/sendButton.js";

import "./dialogFooter.css";

export default function DialogFooter({ sendMessage }) {
    const [chatMessage, setChatMessage] = useState("");

    const handleSubmitMessage = () => {
        sendMessage(chatMessage);
        setChatMessage("");
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSubmitMessage();
        }
    };

    return (
        <div className="dialogfooter-container">
            <ChatInput
                placeholder={"Comece a escrever... :)"}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                value={chatMessage}
            />
            <SendButton onClick={handleSubmitMessage} />
        </div>
    );
}
