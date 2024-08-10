import './LabsList.css';
import LabsListItem from "./LabsListItem.tsx";
import {useResearchLabContext} from "../contexts/ResearchLabContext.tsx";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {ResearchLabItem} from "../types.ts";
import {fetchResearchLabsByCollegeName, fetchResearchLabsByMajorName} from "../services.ts";
import {useUserContext} from "../contexts/UserContext.tsx";
import {NO_TOKEN} from "../utils.ts";

export default function LabsList() {

    const {labs, setCurrentSelectedCollege, setCurrentSelectedMajor} = useResearchLabContext();
    const {collegeName, majorName} = useParams();
    const [labsFiltered, setLabsFiltered] = useState<ResearchLabItem[]>([]);
    const {token} = useUserContext();

    useEffect(() => {
        if (token !== NO_TOKEN) {
            if (collegeName && majorName) {
                setCurrentSelectedMajor(majorName);
                fetchResearchLabsByMajorName(majorName, token)
                    .then((data) => setLabsFiltered(data))
                    .catch((error) => console.error(error));
            } else if (collegeName) {
                setCurrentSelectedCollege(collegeName);
                setCurrentSelectedMajor("");
                fetchResearchLabsByCollegeName(collegeName, token)
                    .then((data) => setLabsFiltered(data))
                    .catch((error) => console.error(error));
            } else {
                setCurrentSelectedMajor("");
                setCurrentSelectedCollege("");
                setLabsFiltered(labs);
            }
        }
    }, [collegeName, majorName, token, labs, setCurrentSelectedMajor, setCurrentSelectedCollege]);

    const labsList = labsFiltered.map((researchLab: ResearchLabItem) => (
        <LabsListItem key={researchLab.id} researchLabItem={researchLab}/>
    ));

    return <section className="labs-list">
        <ul id="lab-boxes">{labsList}</ul>
    </section>;
}
