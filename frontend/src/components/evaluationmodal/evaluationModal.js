import { React, useState, useEffect } from "react";
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
    const [evaluationMade, setEvaluationMade] = useState(false);
    const [chosenMetric, setChosenMetric] = useState();
    const [metricInfo, setMetricInfo] = useState();

    const handleChosenMetric = (event) => {
        setChosenMetric(event.value);
    };

    const handleCloseModal = () => {
        setEvaluationModal(false);
    };

    const changeMetricInfo = (op) => {
        switch (op) {
            case "bertscore_metric":
                setMetricInfo(
                    "Essa métrica tem 3 parâmetros de avaliação. Recall: porcentagem das palavras da sentença esperada que se encontram na sentença avaliada; Precisão: porcentagem das palavras da sentença avaliada que se encontram na sentença esperada; F1: média harmônica entre precisão e recall."
                );
                break;
            case "bleu_metric":
                setMetricInfo(
                    "Essa métrica é avaliada de 0 a 1, com 0 sendo o pior resultado possível e 1 o melhor resultado possível."
                );
                break;
            case "cer_metric":
                setMetricInfo(
                    "Essa métrica avalia a distância, em respeito aos caracteres, entre ambas sentenças. O melhor resultado possível é 0."
                );
                break;
            case "character_metric":
                setMetricInfo(
                    "Essa métrica avalia a distância, em respeito aos caracteres e normalizando pelo tamanho da sentença avaliada, entre ambas sentenças. O melhor resultado possível é 0."
                );
                break;
            case "chrf_metric":
                setMetricInfo(
                    "Essa métrica é avaliada de 0 a 100, com 0 sendo o pior resultado possível e 100 o melhor resultado possível."
                );
                break;
            case "comet_metric":
                setMetricInfo(
                    "Essa métrica é avaliada de 0 a 1, com 0 sendo o pior resultado possível e 1 o melhor resultado possível."
                );
                break;
            case "googlebleu_metric":
                setMetricInfo(
                    "Essa métrica é avaliada de 0 a 1, com 0 sendo o pior resultado possível e 1 o melhor resultado possível."
                );
                break;
            case "meteor_metric":
                setMetricInfo(
                    "Essa métrica é avaliada de 0 a 1, com 0 sendo o pior resultado possível e 1 o melhor resultado possível."
                );
                break;
            case "rouge_metric":
                setMetricInfo(
                    "Essa métrica tem 3 parâmetros de avaliação. Rouge1: análise 1-gram match; Rouge2: análise 2-gram match; RougeL: pontuação de maior subsequência presente em ambas sentenças. Para todas elas, o pior resultado possível é 0 e o melhor resultado possível é 1."
                );
                break;
            case "sacrebleu_metric":
                setMetricInfo(
                    "Essa métrica é avaliada de 0 a 1, com 0 sendo o pior resultado possível e 1 o melhor resultado possível."
                );
                break;
            case "ter_metric":
                setMetricInfo(
                    "Essa métrica avalia a distância entre sentenças, em respeito às edições necessárias para se obter a sentença de referência a partir da sentença avaliada. O melhor resultado possível é 0."
                );
                break;
            case "wer_metric":
                setMetricInfo(
                    "Essa métrica avalia a distância, em respeito às palavras, entre ambas sentenças. O melhor resultado possível é 0."
                );
                break;
            default:
                setMetricInfo("");
        }
    };

    useEffect(() => {
        changeMetricInfo(chosenMetric);
    }, [chosenMetric]);

    const handleMakeEvaluation = () => {
        // DESCOMENTAR PARA SINGLE MESSAGE EVALUATION
        // const metric = chosenMetric.split("_");
        // const obj = {
        //     metric: metric[0],
        // };
        // axios
        //     .post(
        //         `http://127.0.0.1:8000/chat/single_message_metric/${currentChat.id}`,
        //         obj
        //     )
        //     .then((response) => {
        //         setEvaluation(JSON.stringify(response.data, null, 2));
        //         setEvaluationMade(true);
        //     })
        //     .catch((err) => console.log(err));
        // DESCOMENTAR PARA CHAT EVALUATION
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
                            title={"Métrica"}
                            placeholder={"Escolha a métrica desejada"}
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
                    <p>{metricInfo}</p>
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
