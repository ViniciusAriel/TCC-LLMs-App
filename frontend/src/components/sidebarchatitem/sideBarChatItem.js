import React from "react";
import { BsFillChatSquareFill } from "react-icons/bs";

import "./sideBarChatItem.css";

export default function SideBarChatItem({ chatTitle, onClick, llm, isClosed }) {
    return (
        <div
            className={`chatitem-container ${isClosed ? "close" : ""}`}
            onClick={onClick}
        >
            <div className="chatitem-icon">
                <BsFillChatSquareFill size={17} />
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
