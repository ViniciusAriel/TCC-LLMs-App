import { React, useState, useEffect, useRef } from "react";
import { TiDelete } from "react-icons/ti";

import Dropdown from "../dropdown/dropdown";
import TextInput from "../textinput/textInput";
import Button from "../button/button";

import "./alterPromptModal.css";

export default function AlterPromptModal({ setPromptModal, currentChat }) {
    const promptOptions = [
        { value: "system", label: "System" },
        { value: "human", label: "Human" },
        { value: "ai", label: "AI" },
    ];

    const promptDummy = [
        { role: "system", text: "A" },
        { role: "human", text: "B" },
        { role: "ai", text: "C" },
        { role: "system", text: "D" },
        { role: "human", text: "E" },
    ];

    const promptEndRef = useRef(null);
    const [promptConfig, setPromptConfig] = useState(promptDummy);

    useEffect(() => {
        if (promptEndRef.current) {
            promptEndRef.current.scrollTop = promptEndRef.current.scrollHeight;
        }
    }, [promptConfig]);

    const addPromtpConfig = () => {
        setPromptConfig([
            ...promptConfig,
            { role: "system", value: "" }, // Novo input com id único e valor inicial vazio
        ]);
    };

    const handlePromptConfig = (index, value) => {
        const updatedPrompts = promptConfig.map((prompt, i) =>
            i === index ? { ...prompt, role: value } : prompt
        );
        setPromptConfig(updatedPrompts);
    };

    const handlePromptText = (index, value) => {
        const updatedPrompts = promptConfig.map((prompt, i) =>
            i === index ? { ...prompt, text: value } : prompt
        );
        setPromptConfig(updatedPrompts);
    };

    const handleCloseModal = () => {
        setPromptModal(false);
    };

    const handleUpdatePrompt = () => {
        const transformedTemplates = promptConfig.map((message) => [
            message.role,
            message.text,
        ]);
        const finishedTemplate = {
            prompt: transformedTemplates,
        };

        console.log(finishedTemplate);
        handleCloseModal();
    };

    return (
        <div className="prompt-modal-container">
            <div className="prompt-modal-content">
                <h2>Alterar Prompt {currentChat.title}</h2>
                <div className="prompt-itens" ref={promptEndRef}>
                    {promptConfig.map((prompt, index) => {
                        return (
                            <div className="prompt-item" key={index}>
                                <Dropdown
                                    title={index}
                                    handleSelectedOptions={(e) =>
                                        handlePromptConfig(index, e.value)
                                    }
                                    options={promptOptions}
                                    placeholder={
                                        prompt.role
                                            ? prompt.role
                                            : "Escolha o role"
                                    }
                                    value={prompt.role}
                                />
                                <TextInput
                                    onChange={(e) =>
                                        handlePromptText(index, e.target.value)
                                    }
                                    value={prompt.text}
                                />
                                <TiDelete size={50} color="#2F4D65" />
                            </div>
                        );
                    })}
                    <div ref={promptEndRef}></div>
                </div>
                <div className="modal-buttons">
                    <Button
                        color={"white"}
                        title={"Voltar"}
                        onClick={handleCloseModal}
                    />
                    <Button
                        color={"white"}
                        title={"Adicionar"}
                        onClick={addPromtpConfig}
                    />
                    <Button
                        color={"blue"}
                        title={"Salvar"}
                        onClick={handleUpdatePrompt}
                    />
                </div>
            </div>
        </div>
    );
}
