import {Link} from "react-router-dom";
import "./AppFooter.css";
import {
    discussionPagePath,
    labsPagePath, loginPagePath,
    NO_TOKEN,
    openingsPagePath, PROFESSOR_ROLE,
    profilePagePath, STUDENT_ROLE
} from "../utils.ts";
import {useUserContext} from "../contexts/UserContext.tsx";
import {useStudentUserContext} from "../contexts/StudentUserContext.tsx";
import {useProfessorUserContext} from "../contexts/ProfessorUserContext.tsx";
import {useOpeningsContext} from "../contexts/OpeningsContext.tsx";
import {useDiscussionContext} from "../contexts/DiscussionContext.tsx";
import {useResearchLabContext} from "../contexts/ResearchLabContext.tsx";

export default function AppFooter() {
    const {token, role} = useUserContext();
    const {student} = useStudentUserContext();
    const {professor} = useProfessorUserContext();

    let fullName = '';
    if (role === STUDENT_ROLE) {
        fullName = `${student?.firstName} ${student?.lastName}`;
    } else if (role === PROFESSOR_ROLE) {
        fullName = `${professor?.firstName} ${professor?.lastName}`;
    }

    const {refreshLabs} = useResearchLabContext();

    function handleLabsClick() {
        refreshLabs();
    }

    const {refreshOpenings} = useOpeningsContext();

    function handleOpeningsClick() {
        refreshOpenings("");
    }

    const {refreshDiscussions} = useDiscussionContext();

    function handleDiscussionsClick() {
        refreshDiscussions("");
    }

    return (
        <footer className="container">
            <section className="links">
                {(token === NO_TOKEN) ? (
                    <Link to={loginPagePath}>LOGIN</Link>
                ) : (
                    <>
                        <Link to={labsPagePath} onClick={handleLabsClick}>LABS</Link> | <Link
                        to={openingsPagePath} onClick={handleOpeningsClick}>OPENINGS</Link> | <Link
                        to={discussionPagePath} onClick={handleDiscussionsClick}>DISCUSSION</Link> | <Link
                        to={`${profilePagePath}/${role}/${fullName}`}>PROFILE</Link>
                    </>
                )}


            </section>
            <p>&copy; 2024 VT Research Connect. All Rights Reserved.</p>
            <p>Capstone Project</p>
        </footer>
    );
}