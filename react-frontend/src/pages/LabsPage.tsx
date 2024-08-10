import './LabsPage.css';
import LabsList from "../components/LabsList.tsx";
import FilterLabsLinks from "../components/FilterLabsLinks.tsx";
import {useResearchLabContext} from "../contexts/ResearchLabContext.tsx";
import {useState, useEffect} from "react";

export default function LabsPage() {
    const {currentSelectedCollege, currentSelectedMajor} = useResearchLabContext();
    const [title, setTitle] = useState<string>();

    useEffect(() => {
        if (currentSelectedCollege != "" && currentSelectedMajor != "") {
            setTitle(`: ${currentSelectedCollege} - ${currentSelectedMajor}`);
        } else if (currentSelectedCollege != "") {
            setTitle(`: ${currentSelectedCollege}`);
        } else {
            setTitle("");
        }
    }, [currentSelectedCollege, currentSelectedMajor]);

    return (
        <div className='labs-page center-content'>
            <div className='labs-nav'>
                <h1 className='labs-nav-title'>Filter Options</h1>
                <FilterLabsLinks/>
            </div>
            <div className='labs-content'>
                <h1 className='labs-title'>Research Labs{title}</h1>
                <LabsList/>
            </div>
        </div>
    );
}