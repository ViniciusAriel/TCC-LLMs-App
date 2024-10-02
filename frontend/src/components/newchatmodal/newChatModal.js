import React from "react";

import Dropdown from "../dropdown/dropdown.js";
import TextInput from "../textinput/textInput.js";
import Button from "../button/button.js";

import "./newChatModal.css";

export default function NewChatModal({ setNewChatModal }) {
    const handleCloseModal = () => {
        setNewChatModal(false);
    };

    return (
        <div className="newchat-modal-container">
            <div className="newchat-modal-content">
                <h2>Novo Chat</h2>
                <div className="newchat-item">
                    <TextInput title={"Título"} />
                    <Dropdown title={"LLM"} placeholder={"Escolha a LLM"} />
                    <Dropdown
                        title={"Opções"}
                        placeholder={"Escolha uma opção"}
                    />
                </div>
                <div className="modal-buttons">
                    <Button
                        color={"white"}
                        title={"Voltar"}
                        onClick={handleCloseModal}
                    />
                    <Button color={"blue"} title={"Confirmar"} />
                </div>
            </div>
        </div>
    );
}
