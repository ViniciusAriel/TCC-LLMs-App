import React from "react";
import { BsChatLeft } from "react-icons/bs";

import "./sideBarChatItem.css";

export default function SideBarChatItem({ chatTitle, onClick, llm, isClosed }) {
    return (
        <div className="chatitem-container" onClick={onClick}>
            <BsChatLeft size={17} />
            <p>
                {llm} - {chatTitle}
            </p>
        </div>
    );
}
