import React from 'react';
import './Popup.css';
import {ResearchLabItem} from '../types';
import {Link} from 'react-router-dom';
import {useStudentUserContext} from "../contexts/StudentUserContext.tsx";
import {
    subscribe,
    unsubscribe
} from "../services.ts";
import {useUserContext} from '../contexts/UserContext.tsx';

interface LabPopupProps {
    lab: ResearchLabItem | null;
    onClose: () => void;
}

const LabPopup: React.FC<LabPopupProps> = ({lab, onClose}) => {
    const {student, updateStudentSubscriptions} = useStudentUserContext();
    const {token} = useUserContext();

    if (!lab) return null;

    const isSubscribed = student ? student.subscriptions.includes(lab.name) : false;

    const handleSubscribe = async () => {
        if (!student) return;

        try {
            const response = isSubscribed ? await unsubscribe(student.id, lab.name, token) : await subscribe(student.id, lab.name, token);
            console.log(`${isSubscribed ? 'Unsubscribed' : 'Subscribed'} successfully:`, response.data);
            // Update the local subscriptions list
            if (response.status === 200) {
                if (isSubscribed) {
                    updateStudentSubscriptions(student.subscriptions.filter(name => name !== lab.name));
                } else {
                    updateStudentSubscriptions([...student.subscriptions, lab.name]);
                }
            }
        } catch (error) {
            console.error(`Error ${isSubscribed ? 'unsubscribing' : 'subscribing'}:`, error);
        }
    };

    return (
        <div className="popup-info-overlay">
            <div className="popup-info-content">
                <h2>{lab.name}</h2>
                <span className="close" onClick={onClose}>&times;</span>
                <div>
                    <h3>Principal Investigator:</h3>
                    <p>{lab.principleInvestigator}</p>
                </div>
                <div>
                    <h3>College:</h3>
                    <p>{lab.major.college}</p>
                </div>
                <div>
                    <h3>Major:</h3>
                    <p>{lab.major.name}</p>
                </div>
                <div>
                    <h3>Description:</h3>
                    <p>{lab.description}</p>
                </div>

                <div className="lab-buttons">
                    <Link to={`${lab.url}`} target="_blank">
                        <button className="primary-button">
                            Go to Website
                        </button>
                    </Link>
                    {student && (
                        <button className="primary-button" onClick={handleSubscribe}>
                            {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LabPopup;