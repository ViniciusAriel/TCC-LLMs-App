import React from "react";
import axios from "axios";

import Button from "../button/button";

import "./deleteChatModal.css";

export default function DeleteChatModal({
    setChatList,
    setDeletePrompt,
    currentChat,
}) {
    const handleCloseModal = () => {
        setDeletePrompt(false);
    };

    const handleDeleteChat = () => {
        axios
            .delete(`http://127.0.0.1:8000/chat/${currentChat.id}`)
            .then((response) => {
                setChatList(response.data);
            })
            .catch((err) => console.log(err));
        setDeletePrompt(false);
    };

    return (
        <div className="delete-modal-container">
            <div className="delete-modal-content">
                <h2>Deletar {currentChat.title}?</h2>
                <p>
                    Ao deletar esse chat, todas as mensagens e avaliações aqui
                    feitas não poderão ser recuperadas. Tem certeza de que
                    deseja deletar o chat?
                </p>
                <div className="modal-buttons">
                    <Button
                        color={"white"}
                        title={"Cancelar"}
                        onClick={handleCloseModal}
                    />
                    <Button
                        color={"blue"}
                        title={"Deletar"}
                        onClick={handleDeleteChat}
                    />
                </div>
            </div>
        </div>
    );
}
