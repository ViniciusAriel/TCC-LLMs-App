import { React, useState } from "react";

import axios from "axios";

import Button from "../button/button.js";
import Dropdown from "../dropdown/dropdown.js";
import ModalContainer from "../modalcontainer/modalContainer.js";
import TextInput from "../textinput/textInput.js";

import "./newChatModal.css";

export default function NewChatModal({ setNewChatModal, setNewChat }) {
    const llmOptions = [
        { value: "Databricks DBRX", label: "Databricks DBRX" },
        { value: "Gemma", label: "Gemma" },
        { value: "Gemma 2", label: "Gemma 2" },
        { value: "GPT 3.5 Turbo", label: "GPT 3.5 Turbo" },
        { value: "GPT 4", label: "GPT 4" },
        { value: "GPT 4 Turbo", label: "GPT 4 Turbo" },
        { value: "GPT 4o", label: "GPT 4o" },
        { value: "GPT 4o Mini", label: "GPT 4o Mini" },
        { value: "Llama 3 8b", label: "Llama 3 8b" },
        { value: "Llama 3 70b", label: "Llama 3 70b" },
        { value: "Llama 3.1 8b", label: "Llama 3.1 8b" },
        { value: "Llama 3.1 70b", label: "Llama 3.1 70b" },
        { value: "Llama 3.2 1b", label: "Llama 3.2 1b" },
        { value: "Llama 3.2 3b", label: "Llama 3.2 3b" },
        { value: "Mistral Nemo", label: "Mistral Nemo" },
        { value: "Mistral Small", label: "Mistral Small" },
        { value: "Mixtral 8x7b", label: "Mixtral 8x7b" },
        { value: "Pixtral 12b", label: "Pixtral 12b" },
        { value: "Upstage SOLAR 10.7b", label: "Upstage SOLAR 10.7b" },
        { value: "Qwen 2.5 7B Turbo", label: "Qwen 2.5 7B Turbo" },
    ];

    // const otherOptions = [
    //     { value: "save", label: "Salvar contexto de outros chats" },
    //     { value: "not save", label: "Não salvar contexto de outros chats" },
    // ];

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

    // const handleOtherOptions = (event) => {
    //     setChatOptions(event.value);
    // };

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
