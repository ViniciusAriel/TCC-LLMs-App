import React from "react";

import TextInput from "../textinput/textInput.js";
import Button from "../button/button.js";

import "./saveLogModal.css";

export default function saveLogModal({ title, setSaveLogModal }) {
    const randomJSON = {
        id: 4321,
        usuario: {
            nome: "Pedro",
            sobrenome: "Silva",
            email: "pedro@exemplo.com",
            idade: 35,
            endereco: {
                rua: "Rua das Acácias",
                numero: 234,
                cidade: "Florianópolis",
                cep: "56789-123",
            },
        },
        compras: [
            {
                produto: "Notebook",
                preco: 2499.99,
                quantidade: 1,
            },
            {
                produto: "Cadeira Gamer",
                preco: 799.9,
                quantidade: 2,
            },
        ],
        assinatura_ativa: true,
    };

    const handleCloseModal = () => {
        setSaveLogModal(false);
    };

    const handleDownloadFile = () => {
        download(randomJSON, "arquivo.txt");
    };

    const download = (content, fileName) => {
        var a = document.createElement("a");
        var file = new Blob([JSON.stringify(content)], {
            type: "application/json",
        });
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(a.href);
    };

    return (
        <div className="savelog-modal-container">
            <div className="savelog-modal-content">
                <h2>Baixar Log</h2>
                <p>
                    Você tem certeza de que quer baixar o log da conversa{" "}
                    {title}?
                </p>
                <div className="savelog-item">
                    <TextInput title={"Nome"} />
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
