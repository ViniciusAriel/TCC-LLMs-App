import { React, useState, useRef } from "react";

import { MdOutlineFileUpload } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

import axios from "axios";

import Button from "../button/button.js";
import Dropdown from "../dropdown/dropdown.js";
import ModalContainer from "../modalcontainer/modalContainer.js";

import "./uploadLogModal.css";

export default function UploadLogModal({ setUploadModal }) {
    const inputRef = useRef();

    const [selectedLlms, setSelectedLlms] = useState([]);
    const [file, setFile] = useState();
    const [progress, setProgress] = useState({ started: false, pc: 0 });

    const logModel = {
        instances: [
            {
                id: 1,
                input: "Preencha com a pergunta",
                expected_output: ["Preencha o output esperado"],
                actual_output: "",
            },
            {
                id: 2,
                input: "Preencha com a pergunta",
                expected_output: ["Preencha o output esperado"],
                actual_output: "",
            },
        ],
    };

    const llmOptions = [
        { value: "MistralAI", label: "Mistral" },
        { value: "Groq", label: "Groq" },
        { value: "OpenAI", label: "OpenAI"},
    ];

    const handleSelectedLlms = (item) => {
        setSelectedLlms(item);
    };

    const onChooseFile = () => {
        inputRef.current.click();
    };

    const handleClearFile = () => {
        inputRef.current.value = "";
        setFile(null);
        setProgress(0);
    };

    const download = () => {
        var a = document.createElement("a");
        var file = new Blob([JSON.stringify(logModel, null, 2)], {
            type: "application/json",
        });
        a.href = URL.createObjectURL(file);
        a.download = `modeloLogHarpIA.json`;
        a.click();
        URL.revokeObjectURL(a.href);
    };

    const handleExecute = () => {
        if (!file) {
            console.log("Nenhum arquivo selecionado");
            return;
        }

        const chosenLlms = selectedLlms.map((llm) => {
            return llm.value;
        });

        const fd = new FormData();
        fd.append("log_file", file);
        fd.append("llms_to_use", JSON.stringify(chosenLlms));

        axios
            .post(`http://127.0.0.1:8000/harpia/log_input`, fd, {
                onUploadProgress: (ProgressEvent) => {
                    const percentCompleted = Math.round(
                        (ProgressEvent.loaded * 100) / ProgressEvent.total
                    );
                    setProgress(percentCompleted);
                },
                responseType: "blob",
            })
            .then((response) => {
                var a = document.createElement("a");
                var file = new Blob([response.data], {
                    type: "application/zip",
                });
                a.href = URL.createObjectURL(file);
                a.download = `json_files.zip`;
                a.click();
                URL.revokeObjectURL(a.href);
            })
            .catch((err) => console.log(err));
    };

    return (
        <ModalContainer>
            <div className="uploadlog-modal-content">
                <h2>Upload de Arquivo do HarpIA</h2>
                <p>
                    Essa funcionalidade tem como objetivo automatizar o processo
                    de preenchimento do log de entrada do HarpIA. Faça o
                    download do modelo, preencha os campos "input" e
                    "expected_output", escolha as LLMs desejadas e faça o upload
                    do arquivo.
                </p>
                <div className="uploadlog-modal-itens">
                    <div className="input-container">
                        <input
                            type="file"
                            ref={inputRef}
                            onChange={(e) => {
                                setFile(e.target.files[0]);
                            }}
                            style={{ display: "none" }}
                        />
                        {!file && (
                            <div
                                className="input-button choose"
                                onClick={onChooseFile}
                            >
                                <MdOutlineFileUpload color="252525" size={20} />
                                Escolher Arquivo
                            </div>
                        )}
                        {file && (
                            <div className="input-button selected">
                                <div className="file-info">
                                    <div className="info">
                                        <h6>{file.name}</h6>
                                        <RxCross2
                                            color="252525"
                                            style={{ cursor: "pointer" }}
                                            onClick={handleClearFile}
                                        />
                                    </div>
                                    <div className="progress-bar">
                                        <div
                                            className="progress"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <Dropdown
                        title={"LLMs"}
                        handleSelectedOptions={(item) =>
                            handleSelectedLlms(item)
                        }
                        isMulti={true}
                        placeholder={"Selecione as LLMs desejadas..."}
                        options={llmOptions}
                    />
                </div>
                <div className="modal-buttons">
                    <Button
                        color={"white"}
                        title={"Voltar"}
                        onClick={() => setUploadModal(false)}
                    />
                    <Button
                        color={"white"}
                        title={"Baixar Log"}
                        onClick={download}
                    />
                    <Button
                        color={"blue"}
                        title={"Executar"}
                        onClick={handleExecute}
                    />
                </div>
            </div>
        </ModalContainer>
    );
}
