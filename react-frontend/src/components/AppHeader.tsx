import {Link, NavLink} from "react-router-dom";
import "./AppHeader.css";
import {
    ADMIN_ROLE, adminPagePath,
    discussionPagePath,
    labsPagePath, LOGGED_OUT_ROLE,
    loginPagePath, NO_EMAIL, NO_TOKEN,
    openingsPagePath, PROFESSOR_ROLE,
    profilePagePath, STUDENT_ROLE,
    welcomePagePath
} from "../utils.ts";
import {useUserContext} from "../contexts/UserContext.tsx";
import {useStudentUserContext} from "../contexts/StudentUserContext.tsx";
import {useProfessorUserContext} from "../contexts/ProfessorUserContext.tsx";
import {useOpeningsContext} from "../contexts/OpeningsContext.tsx";
import {useDiscussionContext} from "../contexts/DiscussionContext.tsx";
import {useResearchLabContext} from "../contexts/ResearchLabContext.tsx";

export default function AppHeader() {
    const {token, setToken, role, setRole, setEmail} = useUserContext();
    const {student} = useStudentUserContext();
    const {professor} = useProfessorUserContext();

    let fullName = '';
    if (role === STUDENT_ROLE) {
        fullName = `${student?.firstName} ${student?.lastName}`;
    } else if (role === PROFESSOR_ROLE) {
        fullName = `${professor?.firstName} ${professor?.lastName}`;
    }

    const handleLogout = () => {
        setToken(NO_TOKEN);
        setRole(LOGGED_OUT_ROLE);
        setEmail(NO_EMAIL);
    };

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
        <header className="header container">

            <section className="logo-and-title">
                <Link className="logo-and-text" to={welcomePagePath}>
                    <img
                        className="logo"
                        src="/site-images/logo.png"
                        alt="VT Reseach Connect Logo"
                    />
                </Link>
                <Link className="logo-and-text" to={welcomePagePath}>
                    <h1 className="logo-text">VT Research Connect</h1>
                </Link>
            </section>


            <section className="labs-openings-discussion-profile-login">
                {(token !== NO_TOKEN) && (role === STUDENT_ROLE || role === PROFESSOR_ROLE || role === ADMIN_ROLE) &&
                    <>
                        <NavLink to={labsPagePath} onClick={handleLabsClick}><i
                            className="fa-solid fa-flask"></i> LABS</NavLink>
                        <NavLink to={openingsPagePath} onClick={handleOpeningsClick}><i
                            className="fa-solid fa-door-open"></i> OPENINGS</NavLink>
                        <NavLink to={discussionPagePath} onClick={handleDiscussionsClick}><i
                            className="fa-solid fa-comments"></i> DISCUSSION</NavLink>
                    </>
                }
                {/*Professors and Students see a PROFILE page*/}
                {(token !== NO_TOKEN) && (role === STUDENT_ROLE || role === PROFESSOR_ROLE) &&
                    <NavLink to={`${profilePagePath}/${role}/${fullName}`}><i className="fa-solid fa-user"></i> PROFILE</NavLink>
                }
                {/*Admins see a ADMIN page*/}
                {(token !== NO_TOKEN) && (role === ADMIN_ROLE) &&
                    <NavLink to={adminPagePath}><i className="fa-solid fa-lock"></i> ADMIN</NavLink>
                }
                {/*If there is no token, see login page*/}
                {(token === NO_TOKEN) ? (
                    <NavLink to={loginPagePath}><i className="fa-solid fa-sign-in"></i> LOGIN</NavLink>
                ) : (
                    // otherwise, see logout page
                    <NavLink to={loginPagePath} onClick={handleLogout}><i
                        className="fa-solid fa-sign-out"></i> LOGOUT</NavLink>
                )}

            </section>

        </header>
    );
}