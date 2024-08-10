import {OpeningsItem} from "../types.ts";
import React from "react";
import {Link} from "react-router-dom";
import "./Popup.css"
import {dateTimeFormatOptions} from "../utils.ts";
// import {dateTimeFormatOptions} from "../utils.ts";

interface OpeningPopupProps {
    opening: OpeningsItem | null;
    onClose: () => void;
}

const OpeningPopup: React.FC<OpeningPopupProps> = ({opening, onClose}) => {
    if (!opening) return null;
    console.log(opening)

    const createdAtDate = new Date(opening.createdAt);
    const createdAtString = createdAtDate.toLocaleString('en-US', dateTimeFormatOptions);
    const professorName = `${opening.professor.firstName} ${opening.professor.lastName}`

    return (
        <div className="popup-info-overlay">
            <div className="popup-info-content">
                <h2>{opening.name}</h2>
                <span className="close" onClick={onClose}>&times;</span>
                <div>
                    <h3>Position Type</h3>
                    <p>{opening.type}</p>
                </div>
                <div>
                    <h3>Position Description</h3>
                    <p>{opening.description}</p>
                </div>
                <div>
                    <h3>Research Lab</h3>
                    <p>{opening.labName}</p>
                </div>
                <div>
                    <h3>Posted By</h3>
                    <p>{professorName}</p>
                    <p>{opening.professor.email}</p>
                </div>
                <div>
                    <h3>Created At</h3>
                    <p>{createdAtString}</p>
                </div>
                <section>
                    <Link to={`${opening.url}`} target="_blank">
                        <button className="primary-button">Go to Application</button>
                    </Link>
                </section>
            </div>
        </div>
    );
}

export default OpeningPopup;