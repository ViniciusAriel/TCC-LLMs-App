import { React } from "react";
import Select from "react-select";

import "./dropdown.css";

export default function Dropdown({
    handleSelectedOptions,
    isMulti,
    options,
    placeholder,
    title,
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
                isSearchable={true}
                isMulti={isMulti ? true : false}
            />
        </div>
    );
}
