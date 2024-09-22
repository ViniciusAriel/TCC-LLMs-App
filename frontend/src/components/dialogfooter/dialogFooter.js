import React from "react";

import ChatInput from "../chatinput/chatInput.js";
import SendButton from "../sendbutton/sendButton.js";

import "./dialogFooter.css";

export default function DialogFooter() {
    return (
        <div className="dialogfooter-container">
            <ChatInput />
            <SendButton />
        </div>
    );
}
