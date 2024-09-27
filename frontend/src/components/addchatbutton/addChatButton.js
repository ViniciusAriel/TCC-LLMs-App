import { React } from "react";

import { IoIosAddCircleOutline } from "react-icons/io";

import "./addChatButton.css";

export default function AddChatButton({ isClosed, onClick }) {
    return (
        <div
            className={`button-container ${isClosed ? "close" : ""}`}
            onClick={onClick}
        >
            <IoIosAddCircleOutline
                size={40}
                color={isClosed ? "#B5CDD2" : "#2F4D65"}
                strokeWidth={isClosed ? 10 : null}
            />
            <p>Novo Chat</p>
        </div>
    );
}