import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import "./assets/global.css";
import {MajorProvider} from "./contexts/MajorContext.tsx";
import {DiscussionProvider} from "./contexts/DiscussionContext.tsx";
import {CollegeProvider} from "./contexts/CollegeContext.tsx";
import {ResearchLabProvider} from "./contexts/ResearchLabContext.tsx";
import {UserContextProvider} from "./contexts/UserContext.tsx";
import {CommentsProvider} from "./contexts/CommentsContext.tsx";
import {StudentUserProvider} from "./contexts/StudentUserContext.tsx";
import {ProfessorUserProvider} from "./contexts/ProfessorUserContext.tsx";
import {OpeningsProvider} from "./contexts/OpeningsContext.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        < BrowserRouter basename={import.meta.env.BASE_URL}>
            <UserContextProvider>
                <StudentUserProvider>
                    <ProfessorUserProvider>
                        <MajorProvider>
                            <CollegeProvider>
                                <DiscussionProvider>
                                    <CommentsProvider>
                                        <ResearchLabProvider>
                                            <OpeningsProvider>
                                                <App/>
                                            </OpeningsProvider>
                                        </ResearchLabProvider>
                                    </CommentsProvider>
                                </DiscussionProvider>
                            </CollegeProvider>
                        </MajorProvider>
                    </ProfessorUserProvider>
                </StudentUserProvider>
            </UserContextProvider>
        </BrowserRouter>
    </React.StrictMode>,
);
