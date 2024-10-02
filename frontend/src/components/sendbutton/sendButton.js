import React from "react";
import { LuSendHorizonal } from "react-icons/lu";

import "./sendButton.css";

export default function SendButton({ onClick }) {
    return (
        <div className="sendbutton-container" onClick={onClick}>
            <LuSendHorizonal size={23} color="#FEFFFC" />
        </div>
    );
}
