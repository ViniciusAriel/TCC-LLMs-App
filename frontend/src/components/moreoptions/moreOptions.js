import { React, useState } from "react";
import { CgDetailsMore } from "react-icons/cg";

import "./moreOptions.css";

export default function MoreOptions({ setUploadModal, setMetricInfoModal }) {
    const [open, setOpen] = useState(false);

    const handleMoreOptions = () => {
        setOpen(!open);
    };

    return (
        <div className="moreoptions-container">
            <CgDetailsMore
                size={28}
                color="#B5CDD2"
                cursor={"pointer"}
                onClick={handleMoreOptions}
            />
            {open ? (
                <div className="moreoptions-options">
                    <p
                        onClick={() => {
                            setMetricInfoModal(true);
                            setOpen(!open);
                        }}
                    >
                        Sobre as métricas
                    </p>
                    <p
                        onClick={() => {
                            setUploadModal(true);
                            setOpen(!open);
                        }}
                    >
                        Upload de arquivo HarpIA
                    </p>
                </div>
            ) : null}
        </div>
    );
}
