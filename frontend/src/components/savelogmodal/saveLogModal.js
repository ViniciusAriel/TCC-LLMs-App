import { React, useState } from "react";

import axios from "axios";

import Button from "../button/button.js";
import TextInput from "../textinput/textInput.js";

import "./saveLogModal.css";

export default function SaveLogModal({ currentChat, setSaveLogModal }) {
    const [logTitle, setLogTitle] = useState("");

    const handleCloseModal = () => {
        setSaveLogModal(false);
    };

    const handleTitleInput = (event) => {
        setLogTitle(event.target.value);
    };

    const handleDownloadFile = () => {
        axios
            .get(`http://127.0.0.1:8000/chat/download_log/${currentChat.id}`)
            .then((response) => {
                download(response.data, logTitle);
            })
            .catch((err) => console.log(err));
        setSaveLogModal(false);
    };

    const download = (content, fileName) => {
        var a = document.createElement("a");
        var file = new Blob([JSON.stringify(content)], {
            type: "application/json",
        });
        a.href = URL.createObjectURL(file);
        if (fileName) a.download = `${fileName}.json`;
        else a.download = `${currentChat.title}.json`;
        a.click();
        URL.revokeObjectURL(a.href);
    };

    return (
        <div className="savelog-modal-container">
            <div className="savelog-modal-content">
                <h2>Baixar Log</h2>
                <p>
                    Você tem certeza de que quer baixar o log da conversa{" "}
                    {currentChat.title}?
                </p>
                <div className="savelog-item">
                    <TextInput
                        title={"Nome do Arquivo"}
                        onChange={handleTitleInput}
                    />
                </div>
                <div className="modal-buttons">
                    <Button
                        color={"white"}
                        title={"Voltar"}
                        onClick={handleCloseModal}
                    />
                    <Button
                        color={"blue"}
                        title={"Baixar"}
                        onClick={handleDownloadFile}
                    />
                </div>
            </div>
        </div>
    );
}
