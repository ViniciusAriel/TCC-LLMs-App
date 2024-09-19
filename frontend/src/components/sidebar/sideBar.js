import { React, useState } from "react";
import { FiSidebar } from "react-icons/fi";

import Logo from "../logo/logo.js";
import AddChatButton from "../addchatbutton/addChatButton.js";
import SideBarChatList from "../sidebarchatlist/sideBarChatList.js";

import "./sideBar.css";

export default function SideBar() {
    const [isClosed, setIsClosed] = useState(false);

    const toggleSideBar = () => {
        setIsClosed(!isClosed);
    };

    return (
        <div className="sidebar-container">
            <Logo />
            <div className="sidebar-items">
                <SideBarChatList />
            </div>
            <div className="sidebar-buttons">
                <FiSidebar
                    size={40}
                    color="#B5CDD2"
                    onClick={toggleSideBar}
                    cursor={"pointer"}
                />
                <AddChatButton />
            </div>
        </div>
    );
}
