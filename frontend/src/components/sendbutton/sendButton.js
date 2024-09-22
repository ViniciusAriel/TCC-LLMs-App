import React from "react";
import { LuSendHorizonal } from "react-icons/lu";

import "./sendButton.css";

export default function SendButton() {
    return (
        <div className="sendbutton-container">
            <LuSendHorizonal size={27} color="#FEFFFC" />
        </div>
    );
}
