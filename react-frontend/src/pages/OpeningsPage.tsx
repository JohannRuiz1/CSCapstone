import './OpeningsPage.css'
import {openingsAPI, PROFESSOR_ROLE} from "../utils.ts";
import {useEffect, useState} from "react";
import {useUserContext} from "../contexts/UserContext.tsx";
import axios from "axios";
import OpeningsPopupForm from "../components/OpeningsPopupForm.tsx";
import OpeningsList from "../components/OpeningsList.tsx";
import {useOpeningsContext} from "../contexts/OpeningsContext.tsx";
import {ProfessorUser} from "../types.ts";
import { useResearchLabContext } from '../contexts/ResearchLabContext.tsx';

export default function OpeningsPage() {

    const {
        openings,
        filterOpenings,
        refreshOpenings,
        sortOpenings,
        filteredOpenings
    } = useOpeningsContext();

    const [showPopup, setShowPopup] = useState(false);
    const {token, role} = useUserContext();
    const {labs} = useResearchLabContext();

    const [currentOpenings, setCurrentOpenings] = useState(openings);
    const [currentLab, setCurrentLab] = useState("");

    useEffect(() => {
        setCurrentLab("");
        filterOpenings("");
    }, []);

    useEffect(() => {
        setCurrentOpenings(filteredOpenings);
    }, [filteredOpenings]);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const handleCreate = async (formData: {
        name: string;
        description: string;
        type: string;
        url: string;
        labName: string;
        professor: ProfessorUser;
    }) => {
        console.log(formData);
        axios.post(`${openingsAPI}`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log('Opening created successfully:', response.data);
                refreshOpenings(currentLab);
            })
            .catch(error => {
                console.error('Error creating opening:', error);
            });
        togglePopup();
    };

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        sortOpenings(event.target.value); // Sort openings based on selected criteria
    };

    const handleLabChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const labName = event.target.value;
        setCurrentLab(labName);
        filterOpenings(labName);
    };

    return (
        <div className='openings-page center-content'>
            <section className='openings-header'>
                <h1>Current Openings</h1>
                <div className='openings-header-buttons'>
                    <div className='sort-dropdown'>
                        <label htmlFor="filter" className='secondary-button'>Sort by:</label>
                        <select className='secondary-button' name="filter" id="filter" onChange={handleSortChange}>
                            <option value="newest">Date (Newest to Oldest)</option>
                            <option value="oldest">Date (Oldest to Newest)</option>
                        </select>
                    </div>
                    <div className='sort-dropdown'>
                        <label htmlFor="lab" className='secondary-button'>Lab Filter:</label>
                        <select className='secondary-button' id="lab" name="lab" onChange={handleLabChange}>
                            <option value="">All labs</option>
                            {labs.map((lab) => (
                                <option key={lab.id} value={lab.name}>{lab.name} </option>
                            ))}
                        </select>
                    </div>
                    {(role === PROFESSOR_ROLE) && (
                        <>
                            <button className='primary-button' onClick={togglePopup}>Add Opening</button>
                            {showPopup && <OpeningsPopupForm onClose={togglePopup} onCreate={handleCreate}/>}
                        </>
                    )}

                </div>
            </section>
            <OpeningsList openings={currentOpenings}/>
        </div>
    );
}