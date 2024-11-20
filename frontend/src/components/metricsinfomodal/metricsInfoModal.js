import { React, useState, useEffect } from "react";

import ModalContainer from "../modalcontainer/modalContainer";
import Dropdown from "../dropdown/dropdown";
import Button from "../button/button";

import "./metricsInfoModal.css";

export default function MetricsInfoModal({ setMetricInfoModal }) {
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

    const [chosenMetric, setChosenMetric] = useState();
    const [metricInfo, setMetricInfo] = useState();

    const handleChosenMetric = (event) => {
        setChosenMetric(event.value);
    };

    const changeMetricInfo = (op) => {
        switch (op) {
            case "bertscore_metric":
                setMetricInfo("AAAAAAAAAAAAAAAAAAAAAAA");
                break;
            case "bleu_metric":
                setMetricInfo("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB");
                break;
            case "cer_metric":
                setMetricInfo("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB");
                break;
            case "character_metric":
                setMetricInfo("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB");
                break;
            case "chrf_metric":
                setMetricInfo("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB");
                break;
            case "comet_metric":
                setMetricInfo("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB");
                break;
            case "googlebleu_metric":
                setMetricInfo("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB");
                break;
            case "meteor_metric":
                setMetricInfo("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB");
                break;
            case "sacrebleu_metric":
                setMetricInfo("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB");
                break;
            case "rouge_metric":
                setMetricInfo("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB");
                break;
            case "ter_metric":
                setMetricInfo("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB");
                break;
            case "wer_metric":
                setMetricInfo("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB");
                break;
            default:
                setMetricInfo(
                    "Escolha uma métrica para entender mais sobre ela"
                );
        }
    };

    useEffect(() => {
        changeMetricInfo(chosenMetric);
    }, [chosenMetric]);

    return (
        <ModalContainer>
            <div className="metricsinfo-modal-content">
                <h2>Sobre as Métricas</h2>
                <p>
                    Escolha uma métrica para saber mais informações sobre ela:
                </p>
                <div className="metricsinfo-itens">
                    <div className="metricsinfo-dropdown">
                        <Dropdown
                            title={"Métrica"}
                            placeholder={"Escolha a Métrica"}
                            options={metricsOptions}
                            handleSelectedOptions={handleChosenMetric}
                        />
                    </div>

                    <div className="metric-info">{metricInfo}</div>
                </div>
                <div className="modal-buttons">
                    <Button
                        color={"blue"}
                        title={"Voltar"}
                        onClick={() => setMetricInfoModal(false)}
                    />
                </div>
            </div>
        </ModalContainer>
    );
}
