import { React, useState } from "react";
import axios from "axios";

import Dropdown from "../dropdown/dropdown.js";
import TextInput from "../textinput/textInput.js";
import Button from "../button/button.js";
import ModalContainer from "../modalcontainer/modalContainer.js";

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
    const [chatMainLlm, setChatMainLlm] = useState();
    const [chatSecondLlm, setChatSecondLlm] = useState();
    // eslint-disable-next-line no-unused-vars
    const [chatOptions, setChatOptions] = useState();

    const handleCloseModal = () => {
        setNewChatModal(false);
    };

    const handleTextTitle = (event) => {
        setChatTitle(event.target.value);
    };

    const handleMainLlmOption = (event) => {
        setChatMainLlm(event.value);
    };

    const handleSecondLlmOption = (event) => {
        setChatSecondLlm(event.value);
    };

    const handleOtherOptions = (event) => {
        setChatOptions(event.value);
    };

    const handleCreateChat = () => {
        axios
            .post(`http://127.0.0.1:8000/chat/create`, {
                user: 1,
                title: chatTitle,
                main_llm: chatMainLlm,
                secondary_llm: chatSecondLlm,
                date: new Date().toISOString(),
            })
            .then((response) => {
                setNewChat(response.data);
            })
            .catch((err) => console.log(err));
        handleCloseModal();
    };

    return (
        <ModalContainer>
            <div className="newchat-modal-content">
                <h2>Novo Chat</h2>
                <div className="newchat-item">
                    <TextInput
                        title={"Título"}
                        onChange={handleTextTitle}
                        value={chatTitle}
                    />
                    <Dropdown
                        title={"LLM Base"}
                        placeholder={"Escolha o LLM"}
                        options={llmOptions}
                        handleSelectedOptions={handleMainLlmOption}
                    />
                    <Dropdown
                        title={"LLM Comparado"}
                        placeholder={"Escolha o LLM"}
                        options={llmOptions}
                        handleSelectedOptions={handleSecondLlmOption}
                    />
                    {/* <Dropdown
                        title={"Opções"}
                        placeholder={"Escolha uma opção"}
                        options={otherOptions}
                        handleSelectedOptions={handleOtherOptions}
                    /> */}
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
        </ModalContainer>
    );
}
