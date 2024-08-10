import { OpeningsItem } from "../types.ts";
import OpeningListItem from "./OpeningListItem.tsx";
import "./OpeningsList.css"

interface OpeningsListProps {
    openings: OpeningsItem[];
}

export default function OpeningsList( {openings}: OpeningsListProps) {
    const openingsList = openings.map((opening) => (
        <OpeningListItem key={opening.id} opening={opening}/>
    ));

    return <ul id="openings-list">{openingsList}</ul>
}