import { React, useState } from "react";
import { FiSidebar } from "react-icons/fi";

import Logo from "../logo/logo.js";
import AddChatButton from "../addchatbutton/addChatButton.js";
import SideBarChatList from "../sidebarchatlist/sideBarChatList.js";

import "./sideBar.css";

export default function SideBar() {
    const [isClosed, setIsClosed] = useState(false);

    const chatList = [
        { chatId: 1, chatTitle: "Chat 1", date: "20/09/2023" },
        { chatId: 2, chatTitle: "Chat 2", date: "20/09/2023" },
        { chatId: 3, chatTitle: "Chat 3", date: "21/09/2023" },
        { chatId: 4, chatTitle: "Chat 4", date: "21/09/2023" },
        { chatId: 5, chatTitle: "Chat 5", date: "22/09/2023" },
        { chatId: 6, chatTitle: "Chat 6", date: "22/09/2023" },
        { chatId: 7, chatTitle: "Chat 7", date: "23/09/2023" },
        { chatId: 8, chatTitle: "Chat 8", date: "23/09/2023" },
        { chatId: 9, chatTitle: "Chat 9", date: "24/09/2023" },
        { chatId: 10, chatTitle: "Chat 10", date: "24/09/2023" },
    ];

    const toggleSideBar = () => {
        setIsClosed(!isClosed);
        console.log(isClosed);
    };

    return (
        <div className={`sidebar-container ${isClosed ? "close" : ""}`}>
            <Logo isClosed={isClosed}/>
            <div className="sidebar-items">
                <SideBarChatList chatList={chatList} />
            </div>
            <div className="sidebar-buttons">
                <FiSidebar
                    size={40}
                    color="#B5CDD2"
                    onClick={toggleSideBar}
                    cursor={"pointer"}
                />
                <AddChatButton isClosed={isClosed} />
            </div>
        </div>
    );
}
