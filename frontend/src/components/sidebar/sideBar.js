import { React, useState, useEffect } from "react";
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
    const [width, setWidth] = useState(window.innerWidth);
    const [hasSpace, setHasSpace] = useState(true);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        if (width < 1256) {
            setIsClosed(true);
            setHasSpace(false);
        } else {
            setIsClosed(false);
            setHasSpace(true);
        }
        return () => window.removeEventListener("resize", handleResize);
    }, [width]);

    const toggleSideBar = () => {
        setIsClosed(!isClosed);
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
                    isClosed={isClosed}
                />
            </div>
            <div className="sidebar-buttons">
                {hasSpace ? (
                    <FiSidebar
                        size={40}
                        color="#B5CDD2"
                        onClick={toggleSideBar}
                        cursor={"pointer"}
                    />
                ) : null}
                <AddChatButton isClosed={isClosed} onClick={handleOpenModal} />
            </div>
        </div>
    );
}
