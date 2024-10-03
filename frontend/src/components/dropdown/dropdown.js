import React from "react";
import Select from "react-select";

import "./dropdown.css";

export default function Dropdown({
    title,
    placeholder,
    options,
    handleSelectedOptions,
    selectedOption,
}) {
    return (
        <div className="dropdown-container">
            <p>{title}</p>
            <Select
                className="react-select input"
                classNamePrefix="react-select"
                placeholder={placeholder}
                options={options}
                onChange={handleSelectedOptions}
                value={selectedOption}
                defaultValue={selectedOption}
                isSearchable={true}
            />
        </div>
    );
}
