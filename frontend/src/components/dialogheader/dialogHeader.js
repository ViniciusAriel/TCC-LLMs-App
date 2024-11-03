import { React } from "react";

import { IoSettingsSharp } from "react-icons/io5";
import { RiFileDownloadFill } from "react-icons/ri";
import { BiSolidTrashAlt } from "react-icons/bi";

import "./dialogHeader.css";

export default function DialogHeader({
    chatTitle,
    setSaveLogModal,
    setPromptModal,
    setDeleteModal,
}) {
    return (
        <div className="dialogheader-container">
            <div className="header-content">
                <div className="header-title">
                    <h1> {chatTitle ? chatTitle : "Escolha um Chat"}</h1>
                </div>
                <div className="header-icons">
                    <div className="icon">
                        <BiSolidTrashAlt
                            size={32}
                            color="#2F4D65"
                            onClick={() => setDeleteModal(true)}
                        />
                    </div>
                    <div className="icon">
                        <RiFileDownloadFill
                            size={32}
                            color="#2F4D65"
                            onClick={() => setSaveLogModal(true)}
                        />
                    </div>
                    <div className="icon last">
                        <IoSettingsSharp
                            size={32}
                            color="#2F4D65"
                            onClick={() => setPromptModal(true)}
                        />
                    </div>
                </div>
            </div>
            <hr />
        </div>
    );
}
