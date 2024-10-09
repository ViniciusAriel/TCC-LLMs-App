import { React } from "react";

import { IoSettingsSharp } from "react-icons/io5";
import { RiFileDownloadFill } from "react-icons/ri";

import "./dialogHeader.css";

export default function DialogHeader({ chatTitle, setSaveLogModal }) {
    const handleSaveLogModal = () => {
        setSaveLogModal(true);
    };

    return (
        <div className="dialogheader-container">
            <div className="header-content">
                <div className="header-title">
                    <h1> {chatTitle ? chatTitle : "Escolha um Chat"}</h1>
                </div>
                <div className="header-icons">
                    <div className="chat-log">
                        <RiFileDownloadFill
                            size={32}
                            color="#2F4D65"
                            onClick={handleSaveLogModal}
                        />
                    </div>
                    <div className="chat-settings">
                        <IoSettingsSharp size={32} color="#2F4D65" />
                    </div>
                </div>
            </div>
            <hr />
        </div>
    );
}
