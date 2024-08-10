import './DiscussionPage.css'
import DiscussionList from "../components/DiscussionList.tsx";
import {discussionsAPI, STUDENT_ROLE} from "../utils.ts";
import {useEffect, useState} from "react";
import DiscussionPopupForm from '../components/DiscussionPopupForm.tsx';
import {useDiscussionContext} from '../contexts/DiscussionContext.tsx';
import axios from 'axios';
import {useUserContext} from "../contexts/UserContext.tsx";
import {useStudentUserContext} from "../contexts/StudentUserContext.tsx";
import {useResearchLabContext} from "../contexts/ResearchLabContext.tsx";


export default function DiscussionPage() {
    const [showPopup, setShowPopup] = useState(false);
    const {token, role} = useUserContext();
    const {student} = useStudentUserContext();
    const {labs} = useResearchLabContext();
    const {
        discussions,
        filteredDiscussions,
        refreshDiscussions,
        sortDiscussions,
        filterDiscussions
    } = useDiscussionContext();

    const [currentDiscussions, setCurrentDiscussions] = useState(discussions);
    const [currentLab, setCurrentLab] = useState("");

    useEffect(() => {
        setCurrentLab("");
        filterDiscussions("");
    }, []);

    useEffect(() => {
        setCurrentDiscussions(filteredDiscussions);
    }, [filteredDiscussions]);


    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const handleCreate = async (formData: { title: string; content: string; lab: string }) => {
    const discussionItem = {
        title: formData.title,
        content: formData.content,
        labName: formData.lab,
        student: student,
    };

    try {
        await axios.post(`${discussionsAPI}/add`, discussionItem, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        console.log('Discussion created successfully');
        refreshDiscussions(currentLab); // Pass the current lab filter to refreshDiscussions
    } catch (error) {
        console.error('Error creating discussion:', error);
    }
    togglePopup();
};

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        sortDiscussions(event.target.value); // Sort discussions based on selected criteria
    };

    const handleLabChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const labName = event.target.value;
        setCurrentLab(labName);
        filterDiscussions(labName);
    };

    return (
        <div className='discussion-page center-content'>
            <section className='discussion-header'>
                <h1>Discussion Forum</h1>
                <div className='discussion-header-buttons'>
                    <div className='sort-dropdown'>
                        <label htmlFor="filter" className='secondary-button'>Sort by:</label>
                        <select className='secondary-button' name="filter" id="filter" onChange={handleSortChange}>
                            <option value="oldest">Date (Oldest to Newest)</option>
                            <option value="newest">Date (Newest to Oldest)</option>
                            <option value="highest">Comments (Most to Fewest)</option>
                            <option value="lowest">Comments (Fewest to Most)</option>
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
                    {(role === STUDENT_ROLE) && (
                        <>
                            <button className='primary-button' onClick={togglePopup}>Create Discussion</button>
                            {showPopup && <DiscussionPopupForm onClose={togglePopup} onCreate={handleCreate}/>}
                        </>
                    )}

                </div>
            </section>
            <DiscussionList discussions={currentDiscussions}/>
        </div>
    );
}