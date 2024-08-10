import {OpeningsItem} from "../types.ts";
import "./OpeningListItem.css"
import { useState} from "react";
import OpeningPopup from "./OpeningPopup.tsx";
import {Link} from "react-router-dom";
import {ADMIN_ROLE, dateTimeFormatOptions, NO_TOKEN, profilePagePath} from "../utils.ts";
import {useUserContext} from "../contexts/UserContext.tsx";
import {useProfessorUserContext} from "../contexts/ProfessorUserContext.tsx";
import {deleteOpening} from "../services.ts";
import {useOpeningsContext} from "../contexts/OpeningsContext.tsx";

export default function OpeningListItem(props: { opening: OpeningsItem }) {
    const id = props.opening.id;
    const name = props.opening.name;
    const type = props.opening.type;
    const labName = props.opening.labName;

    const createdAtDate = new Date(props.opening.createdAt);
    const createdAtString = createdAtDate.toLocaleString('en-US', dateTimeFormatOptions);
    const professorName = `${props.opening.professor.firstName} ${props.opening.professor.lastName}`
    const {token, role} = useUserContext();
    const {professor} = useProfessorUserContext();
    const {refreshOpenings} = useOpeningsContext();

    const [showPopup, setShowPopup] = useState(false);
    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    function handleDeleteOpeningsClick() {
        if (token !== NO_TOKEN) {
            deleteOpening(id, token)
                .then(() => {
                    refreshOpenings(""); // refresh discussions after deletion
                    console.log('Opening deleted successfully');
                })
                .catch((error) => {
                    // Handle error
                    console.error('Failed to delete discussion:', error);
                });
        }
    }

    return (
        <>
            <li key={id} className="opening-item">
                <h1 className="opening-title" onClick={togglePopup}>{name}</h1>
                <p className="opening-lab">{labName}</p>
                <p className="opening-details"><Link
                    to={`${profilePagePath}/PROFESSOR/${professorName}`}>{professorName}</Link> posted a <strong>{type}</strong> opportunity on {createdAtString}
                </p>
                {(role === ADMIN_ROLE || professorName === `${professor?.firstName} ${professor?.lastName}`) && (
                    <button className={'delete-comment-button tertiary-button'}
                            onClick={handleDeleteOpeningsClick}>Delete</button>
                )}
            </li>
            {showPopup && (
                <OpeningPopup opening={props.opening} onClose={togglePopup}/>
            )}
        </>
    );
}