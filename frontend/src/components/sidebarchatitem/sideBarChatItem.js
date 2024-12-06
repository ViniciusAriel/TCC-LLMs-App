import React from "react";

import { FiMessageSquare } from "react-icons/fi";

import "./sideBarChatItem.css";

export default function SideBarChatItem({
    comparedLlm,
    isClosed,
    mainLLm,
    onClick,
}) {
    return (
        <div
            className={`chatitem-container ${isClosed ? "close" : ""}`}
            onClick={onClick}
        >
            <div className="chatitem-icon">
                <FiMessageSquare size={18} />
            </div>
            {isClosed ? (
                <p>{comparedLlm}</p>
            ) : (
                <p>
                    {mainLLm} - {comparedLlm}
                </p>
            )}
        </div>
    );
}
