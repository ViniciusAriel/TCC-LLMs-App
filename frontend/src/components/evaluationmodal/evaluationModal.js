import { React, useState } from "react";
import axios from "axios";

import ModalContainer from "../modalcontainer/modalContainer";
import Dropdown from "../dropdown/dropdown";
import Button from "../button/button";

import "./evaluationModal.css";

export default function EvaluationModal({ currentChat, setEvaluationModal }) {
    const metricsOptions = [
        { value: "bertscore_metric", label: "Bert Score" },
        { value: "bleu_metric", label: "Bleu" },
        { value: "cer_metric", label: "CER" },
        { value: "character_metric", label: "CharacTER" },
        { value: "chrf_metric", label: "chrf" },
        // { value: "codeeval_metric", label: "Code HumanEval" },
        { value: "comet_metric", label: "Comet" },
        { value: "googlebleu_metric", label: "Google-Bleu" },
        { value: "meteor_metric", label: "Meteor" },
        { value: "sacrebleu_metric", label: "SacreBLEU" },
        { value: "rouge_metric", label: "Rouge" },
        { value: "ter_metric", label: "TER" },
        { value: "wer_metric", label: "WER" },
    ];

    const [evaluation, setEvaluation] = useState();
    const [chosenMetric, setChosenMetric] = useState();
    const [evaluationMade, setEvaluationMade] = useState(false);

    const handleChosenMetric = (event) => {
        setChosenMetric(event.value);
    };

    const handleCloseModal = () => {
        setEvaluationModal(false);
    };

    const handleMakeEvaluation = () => {
        axios
            .get(`http://127.0.0.1:8000/chat/${chosenMetric}/${currentChat.id}`)
            .then((response) => {
                setEvaluation(JSON.stringify(response.data, null, 2));
                setEvaluationMade(true);
            })
            .catch((err) => console.log(err));
    };

    return (
        <ModalContainer>
            {!evaluationMade ? (
                <div className="evaluation-modal-content">
                    <h2>Avaliar Conversa {currentChat.title}</h2>
                    <p>
                        Escolha a métrica desejada para avaliar o chat e clique
                        em confirmar. Aguarde o retorno da avaliação.
                    </p>
                    <div className="evaluation-itens">
                        <Dropdown
                            title={"LLM Base"}
                            placeholder={"Escolha a LLM"}
                            options={metricsOptions}
                            handleSelectedOptions={handleChosenMetric}
                        />
                    </div>
                    <div className="modal-buttons">
                        <Button
                            color={"white"}
                            title={"Cancelar"}
                            onClick={handleCloseModal}
                        />
                        <Button
                            color={"blue"}
                            title={"Avaliar"}
                            onClick={handleMakeEvaluation}
                        />
                    </div>
                </div>
            ) : (
                <div className="evaluation-modal-content">
                    <h2>Avaliação Feita</h2>
                    <div className="evaluation-itens show">
                        <pre>{evaluation}</pre>
                    </div>
                    <div className="modal-buttons">
                        <Button
                            color={"blue"}
                            title={"Confirmar"}
                            onClick={handleCloseModal}
                        />
                    </div>
                </div>
            )}
        </ModalContainer>
    );
}
