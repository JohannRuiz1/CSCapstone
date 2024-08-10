import './WelcomePage.css'
import {Link} from "react-router-dom";
import {
    discussionPagePath,
    labsPagePath, loginPagePath, NO_TOKEN,
    openingsPagePath
} from "../utils.ts";
import {useUserContext} from "../contexts/UserContext.tsx";

export default function WelcomePage() {
    const {token} = useUserContext();
    return (
        <div className="welcome-page center-content">
            {(token === NO_TOKEN) ? (
                <section className="welcome-students">
                    <h2>Welcome to VT Research Connect</h2>
                    <p>As a student, you can easily explore and filter through all the <Link to={labsPagePath}>Research
                        Labs</Link> at
                        Virginia Tech. Each lab's profile includes essential details such as the lab name, the
                        principal
                        investigator (PI), and a link to their external website. Additionally, you can search
                        for <Link
                            to={openingsPagePath}>Openings</Link> and apply for volunteer or paid positions in
                        various research labs. Join
                        our <Link to={discussionPagePath}>Discussion Forum</Link> to engage with fellow students,
                        share insights about
                        research, and subscribe to feeds based on department, topic, or specific labs.</p>
                    <Link to={loginPagePath}>
                        <button className="call-to-action-button">GET STARTED!</button>
                    </Link>
                </section>
            ) : (
                <h1 className="logged-in-content">START EXPLORING</h1>
            )}
        </div>
    );
}