import { React } from "react";
import { IoSettingsSharp } from "react-icons/io5";

import "./dialogHeader.css";

export default function DialogHeader({ chatTitle }) {
    return (
        <div className="dialogheader-container">
            <div className="header-content">
                <div className="header-title">
                    <h1> {chatTitle ? chatTitle : "Escolha um Chat"}</h1>
                </div>
                <div className="chat-settings">
                    <IoSettingsSharp size={40} color="#2F4D65" />
                </div>
            </div>
            <hr />
        </div>
    );
}
