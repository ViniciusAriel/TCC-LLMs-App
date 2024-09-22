import React from "react";
import { BsChatLeft } from "react-icons/bs";

import "./sideBarChatItem.css";

export default function SideBarChatItem({ chatTitle, onClick }) {
    return (
        <div className="chatitem-container" onClick={onClick}>
            <BsChatLeft size={17} />
            <p>{chatTitle}</p>
        </div>
    );
}
