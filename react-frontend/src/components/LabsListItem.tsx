import {useState} from 'react';
import './LabsListItem.css';
import LabPopup from './LabPopup';
import {ResearchLabItem} from "../types.ts";
import {useStudentUserContext} from "../contexts/StudentUserContext.tsx";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStar} from '@fortawesome/free-solid-svg-icons';


export default function LabsListItem(props: { researchLabItem: ResearchLabItem }) {
    const [showPopup, setShowPopup] = useState(false);

    const {student} = useStudentUserContext();

    const togglePopup = () => {
        console.log(showPopup);
        setShowPopup(!showPopup);
    };

    let isSubscribed = false;

    if (student) {
        isSubscribed = student.subscriptions.includes(props.researchLabItem.name);
    }
    return (
        <>
            <li key={props.researchLabItem.id} className="lab-box">
                <div className="star-icon-container">
                    {isSubscribed && (
                        <FontAwesomeIcon icon={faStar} className="star-icon"/>
                    )}
                </div>
                <h1 className="lab-name" title={props.researchLabItem.name} onClick={togglePopup}>
                    {props.researchLabItem.name}
                </h1>
                <h2 className="lab-major">{props.researchLabItem.major.name}</h2>
                <h3 className="lab-pi">{props.researchLabItem.principleInvestigator}</h3>
            </li>
            {showPopup && (
                <LabPopup lab={props.researchLabItem} onClose={togglePopup}/>
            )}
        </>
    );
}
