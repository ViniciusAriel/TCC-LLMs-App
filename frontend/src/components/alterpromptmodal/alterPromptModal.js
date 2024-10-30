import { React, useState, useEffect, useRef } from "react";

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
        { model: "system", text: "A" },
        { model: "human", text: "B" },
        { model: "ai", text: "C" },
        { model: "system", text: "D" },
        { model: "human", text: "E" },
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
            { model: "system", value: "" }, // Novo input com id único e valor inicial vazio
        ]);
    };

    const handlePromptConfig = (index, value) => {
        const updatedPrompts = promptConfig.map((prompt, i) =>
            i === index ? { ...prompt, model: value } : prompt
        );
        setPromptConfig(updatedPrompts);
    };

    const handlePromptText = (index, value) => {
        const updatedPrompts = promptConfig.map((prompt, i) =>
            i === index ? { ...prompt, text: value } : prompt
        );
        setPromptConfig(updatedPrompts);
    };

    const handleCloseModel = () => {
        setPromptModal(false);
    };

    const handleUpdatePrompt = () => {
        console.log(promptConfig);
        handleCloseModel();
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
                                        prompt.model
                                            ? prompt.model
                                            : "Escolha o modelo"
                                    }
                                    value={prompt.model}
                                />
                                <TextInput
                                    onChange={(e) =>
                                        handlePromptText(index, e.target.value)
                                    }
                                    value={prompt.text}
                                />
                            </div>
                        );
                    })}
                    <div ref={promptEndRef}></div>
                </div>
                <div className="modal-buttons">
                    <Button
                        color={"white"}
                        title={"Voltar"}
                        onClick={handleCloseModel}
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
