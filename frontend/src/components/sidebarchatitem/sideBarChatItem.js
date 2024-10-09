import React from "react";

import { FiMessageSquare } from "react-icons/fi";

import "./sideBarChatItem.css";

export default function SideBarChatItem({ chatTitle, onClick, llm, isClosed }) {
    return (
        <div
            className={`chatitem-container ${isClosed ? "close" : ""}`}
            onClick={onClick}
        >
            <div className="chatitem-icon">
                <FiMessageSquare size={18} />
            </div>
            {isClosed ? (
                <p>{llm}</p>
            ) : (
                <p>
                    {llm} - {chatTitle}
                </p>
            )}
        </div>
    );
}
