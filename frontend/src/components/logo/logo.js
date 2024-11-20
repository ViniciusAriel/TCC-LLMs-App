import { React } from "react";

import MoreOptions from "../moreoptions/moreOptions";

import "./logo.css";

export default function Logo({ isClosed }) {
    return (
        <div className={`logo-container ${isClosed ? "close" : ""}`}>
            <div className="logo-image" />
            <h1>ChatIA</h1>
            <MoreOptions />
        </div>
    );
}
