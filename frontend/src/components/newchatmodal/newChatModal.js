import { React, useState } from "react";
import axios from "axios";

import Dropdown from "../dropdown/dropdown.js";
import TextInput from "../textinput/textInput.js";
import Button from "../button/button.js";

import "./newChatModal.css";

export default function NewChatModal({ setNewChatModal, setNewChat }) {
    const llmOptions = [
        { value: "MistralAI", label: "Mistral" },
        { value: "Groq", label: "Groq" },
    ];

    const otherOptions = [
        { value: "save", label: "Salvar contexto de outros chats" },
        { value: "not save", label: "Não salvar contexto de outros chats" },
    ];

    const [chatTitle, setChatTitle] = useState("Novo Chat");
    const [chatLlm, setChatLlm] = useState();
    const [chatOptions, setChatOptions] = useState();

    const handleCloseModal = () => {
        setNewChatModal(false);
    };

    const handleTextTitle = (event) => {
        setChatTitle(event.target.value);
    };

    const handleLlmOption = (event) => {
        setChatLlm(event.value);
    };

    const handleOtherOptions = (event) => {
        setChatOptions(event.value);
    };

    const handleCreateChat = () => {
        axios
            .post(`http://127.0.0.1:8000/chat/create`, {
                title: chatTitle,
                llm: chatLlm,
                date: new Date().toISOString(),
            })
            .then((response) => {
                setNewChat(response.data);
            })
            .catch((err) => console.log(err));
        handleCloseModal();
    };

    return (
        <div className="newchat-modal-container">
            <div className="newchat-modal-content">
                <h2>Novo Chat</h2>
                <div className="newchat-item">
                    <TextInput
                        title={"Título"}
                        onChange={handleTextTitle}
                        value={chatTitle}
                    />
                    <Dropdown
                        title={"LLM"}
                        placeholder={"Escolha a LLM"}
                        options={llmOptions}
                        handleSelectedOptions={handleLlmOption}
                    />
                    <Dropdown
                        title={"Opções"}
                        placeholder={"Escolha uma opção"}
                        options={otherOptions}
                        handleSelectedOptions={handleOtherOptions}
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
                        title={"Confirmar"}
                        onClick={handleCreateChat}
                    />
                </div>
            </div>
        </div>
    );
}
