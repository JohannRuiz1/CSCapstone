import React, {useState, ChangeEvent, FormEvent} from 'react';
import './PopupForm.css';
import {useResearchLabContext} from "../contexts/ResearchLabContext.tsx";

interface FormPopupProps {
    onClose: () => void;
    onCreate: (formData: FormData) => void;
}

interface FormData {
    title: string;
    content: string;
    lab: string; // Add the lab field to the form data
}

const DiscussionPopupForm: React.FC<FormPopupProps> = ({onClose, onCreate}) => {
    const {labs} = useResearchLabContext();

    const [formData, setFormData] = useState<FormData>({
        title: '',
        content: '',
        lab: '', // Set default value to an empty string
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        onCreate(formData);
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h2>Create Discussion</h2>
                <span className="close" onClick={onClose}>&times;</span>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="lab">Lab:</label>
                        <select
                            id="lab"
                            name="lab"
                            value={formData.lab}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>Select a lab</option>
                            {labs.map((lab) => (
                                <option key={lab.id} value={lab.name}>
                                    {lab.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="content">Content:</label>
                        <textarea
                            name="content"
                            id="content"
                            value={formData.content}
                            onChange={handleChange}
                            rows={10} // Adjust rows as needed
                            required
                        />
                    </div>
                    <button type="submit" className="primary-button">Create</button>
                </form>
            </div>
        </div>
    );
};

export default DiscussionPopupForm;
