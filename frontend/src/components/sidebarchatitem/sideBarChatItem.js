import React from "react";
import { BsChatLeft } from "react-icons/bs";

import "./sideBarChatItem.css";

export default function SideBarChatItem({ chatTitle, onClick, llm, isClosed }) {
    return (
        <div
            className={`chatitem-container ${isClosed ? "close" : ""}`}
            onClick={onClick}
        >
            <BsChatLeft size={17} />
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
