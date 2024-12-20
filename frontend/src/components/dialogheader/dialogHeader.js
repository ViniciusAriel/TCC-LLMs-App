import { React } from "react";

import { BiSolidTrashAlt } from "react-icons/bi";
import { IoSettingsSharp } from "react-icons/io5";
import { MdAnalytics } from "react-icons/md";
import { RiFileDownloadFill } from "react-icons/ri";

import "./dialogHeader.css";

export default function DialogHeader({
    chat,
    setSaveLogModal,
    setPromptModal,
    setDeleteModal,
    setEvaluationModal,
}) {
    return (
        <div className="dialogheader-container">
            <div className="header-content">
                <div className="header-title">
                    <h1>
                        {chat.title
                            ? chat.main_llm +
                              "/" +
                              chat.secondary_llm +
                              " - " +
                              chat.title
                            : "Escolha um Chat"}
                    </h1>
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
                    <div className="icon">
                        <MdAnalytics
                            size={35}
                            color="#2F4D65"
                            onClick={() => setEvaluationModal(true)}
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
