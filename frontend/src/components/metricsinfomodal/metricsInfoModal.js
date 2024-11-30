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
        { value: "rouge_metric", label: "Rouge" },
        { value: "sacrebleu_metric", label: "SacreBLEU" },
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
                setMetricInfo(
                    "A métrica BERTScore é uma métrica de comparação de similaridade entre duas sentenças, utilizando modelos que levam em consideração as similaridades-cossenoentre cada token da frase. Essa métrica obteve resultados que se correlacionam mais fortemente com o julgamento de humanoEssa métrica obtém valores para 3 diferentes atributos de similaridade: precisão (porcentagem das palavras da sentença avaliada que se encontram na sentença esperada), recall (porcentagem das palavras da sentença esperada que se encontram na sentença avaliada) e f1 score (média harmônica entre a precisão e o recall). No entanto, os modelos treinados não dependem de um match exato entre as palavras, mas sim de uma análise contextual."
                );
                break;
            case "bleu_metric":
                setMetricInfo(
                    "A métrica BLEU foi proposta como um método de avaliação de traduções feitas por máquinas de maneira rápida e independente da linguagem, além de ser uma das primeiras métricas a se afirmar como tendo uma forte correlação com julgamento de humanos. Ela se baseia no princípio básico de que o mais similar que uma tradução de máquina é de uma tradução profissional feita por um humano, melhor ela é. A partir disso, a métrica BLEU mede a similaridade entre uma tradução candidata e uma séries de traduções de referência utilizando a word error rate (taxa de erros em palavras), uma medida utilizada frequentemente em pesquisas de reconhecimento de fala."
                );
                break;
            case "cer_metric":
                setMetricInfo(
                    "Character Error Rate, ou CER, é uma métrica comum para se medir a performance de sistemas de reconhecimento de fala. Essa métrica se baseia na metodologia descrita na abordagem do Word Error Rate (WER) que mede a performance de uma sentença analisada levando em consideração o custo de transformá-la na sentença de referência. Ou seja, mede a distância entre a sentença avaliada e a sentença de referência. Dessa forma, quanto menor for o resultado dessa métrica, mais próxima a sentença avaliada está de sua referência."
                );
                break;
            case "character_metric":
                setMetricInfo(
                    "Essa métrica, tal como o CER, também se baseia na distância entre a sentença avaliada e a sentença de referência a nível de caracteres utilizados. No entanto, o custo é normalizada pelo tamanho da sentença avaliada. Novamente, quanto menor o resultado da métrica CharacTer, mais próxima a sentença avaliada está de sua referência."
                );
                break;
            case "chrf_metric":
                setMetricInfo(
                    "A métrica chrf, que também foca em avaliação de traduções realizadas por máquinas, utiliza uma combinação de valores f1 sobre uma avaliação em n-gram match. Os valores f1, ou pontuação f1, são uma forma de medir a precisão de um determinado resultado face a um resultado esperado. Uma pontuação f1 pode ser calculada com a fórmula abaixo, na qual precision é a proporção dos verdadeiros positivos dentre todas hipóteses de positivos e recall é a proporção de verdadeiros positivos dentre todos positivos. Ou seja, a pontuação f1 é uma média harmônica entre a precision e o recall. Nesse sentido, a métrica chrf utiliza uma comparação de n-gram matches para verificar as sub-sentenças presentes na sentença avaliada e na sentença de referência e calcula uma pontuação f1."
                );
                break;
            case "comet_metric":
                setMetricInfo("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB");
                break;
            case "googlebleu_metric":
                setMetricInfo(
                    "Uma adaptação da métrica BLEU feita pela Google visando aumentar a usabilidade desse tipo de métrica para avaliar um conjunto de apenas uma sentença candidata à tradução e um conjunto de referências. Isso pois o BLEU original não funciona tão bem quando não está avaliando um corpo de sentenças de tradução de máquina. Para tanto, o Google BLEU limita as sub-sentenças a serem utilizadas nas técnicas de n-gram matching a terem, no máximo, 4 tokens (ou palavras)."
                );
                break;
            case "meteor_metric":
                setMetricInfo(
                    "METEOR é uma métrica de avaliação de traduções de máquina baseada na pontuação f1 das sentenças analisadas utilizando um n-gram matching de apenas um elemento. O valor dessa métrica representa o quão bem-ordenada estão as palavras da sentença avaliada que também correspondem (exatamente ou semanticamente) à palavras na sentença de referência"
                );
                break;
            case "rouge_metric":
                setMetricInfo(
                    "Rouge, ou Recall-Oriented Understudy for Gisting Evaluation é um conjunto de métricas para avaliação de traduções e resumos feitos de maneira automatizada. O conjunto de métricas utiliza n-gram matches de 1 a 2 elementos, produzindo valores diferentes para cada uma das abordagens. Além disso, também calcula uma pontuação com base na maior sub-sentença presente em ambas as sentenças avaliada e de referência. Quanto mais a pontuação se aproximar de 1, mais próximas as sentenças avaliadas são de suas referências"
                );
                break;
            case "sacrebleu_metric":
                setMetricInfo("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB");
                break;
            case "ter_metric":
                setMetricInfo(
                    "A métrica Translation Edit Rate, ou TER mede a proximidade da sentença avaliada da sentença de referência através do número de edições necessárias para tornar a sentença avaliada igual à sentença de referência"
                );
                break;
            case "wer_metric":
                setMetricInfo(
                    "Word Error Rate, ou WER, é também uma métrica que mensura a proximidade da sentença avaliada à sua sentença de referência, porém, diferentemente do CER, se baseia em mudanças de palavras ao invés de caracteres."
                );
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
