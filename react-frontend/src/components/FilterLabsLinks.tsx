import './FilterLabsLink.css';
import {NavLink} from "react-router-dom";
import {labsPagePath} from "../utils.ts";
import {useCollegeContext} from "../contexts/CollegeContext.tsx";
import {CollegeItem} from "../types.ts";
import {useState} from "react";

export default function FilterLabsLinks() {
    const {colleges} = useCollegeContext();
    const [openCollegeId, setOpenCollegeId] = useState<number | null>(null);

    const handleCollegeClick = (collegeId: number) => {
        if (openCollegeId === collegeId) {
            setOpenCollegeId(null);
        } else {
            setOpenCollegeId(collegeId);
        }
    };

    function majorLinks(college: CollegeItem) {
        return college.majors.map((major) => (
            <li key={major.id}>
                <NavLink to={`${labsPagePath}/${college.name}/${major.name}`} className="major-link">
                    {major.name}
                </NavLink>
            </li>
        ));
    }

    const collegeLinks = colleges.map((college) => {
        const isOpen = openCollegeId === college.id;
        return (
            <li className='college-filter-item' key={college.id}>
                <NavLink
                    to={isOpen ? labsPagePath : `${labsPagePath}/${college.name}`}
                    onClick={() => handleCollegeClick(college.id)}
                    className="college-link"
                >
                    {college.name}
                </NavLink>
                {isOpen && (
                    <ul className='major-filter'>
                        {majorLinks(college)}
                    </ul>
                )}
            </li>
        );
    });

    return <ul className='college-filter'>{collegeLinks}</ul>;
}