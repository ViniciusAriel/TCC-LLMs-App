import { React, useState } from "react";
import { FiSidebar } from "react-icons/fi";

import Logo from "../logo/logo.js";
import AddChatButton from "../addchatbutton/addChatButton.js";
import SideBarChatList from "../sidebarchatlist/sideBarChatList.js";

import "./sideBar.css";

export default function SideBar({
    selectedCurrentChat,
    chatList,
    setNewChatModal,
}) {
    const [isClosed, setIsClosed] = useState(false);

    const toggleSideBar = () => {
        setIsClosed(!isClosed);
        console.log(isClosed);
    };

    const handleOpenModal = () => {
        setNewChatModal(true);
    };

    return (
        <div className={`sidebar-container ${isClosed ? "close" : ""}`}>
            <Logo isClosed={isClosed} />
            <div className="sidebar-items">
                <SideBarChatList
                    chatList={chatList}
                    selectedCurrentChat={selectedCurrentChat}
                />
            </div>
            <div className="sidebar-buttons">
                <FiSidebar
                    size={40}
                    color="#B5CDD2"
                    onClick={toggleSideBar}
                    cursor={"pointer"}
                />
                <AddChatButton isClosed={isClosed} onClick={handleOpenModal} />
            </div>
        </div>
    );
}
