import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import WelcomePage from "./pages/WelcomePage";
import SignUpStudentPage from "./pages/SignUpStudentPage";
import SignUpProfessorPage from "./pages/SignUpProfessorPage";
import LoginPage from "./pages/LoginPage";
import LabsPage from "./pages/LabsPage";
import OpeningsPage from "./pages/OpeningsPage";
import DiscussionPage from "./pages/DiscussionPage";
import ProfilePage from "./pages/ProfilePage";
import './App.css';
import { Route, Routes } from "react-router-dom";
import {
    ADMIN_ROLE,
    adminPagePath,
    discussionPagePath,
    labsPagePath,
    loginPagePath,
    openingsPagePath,
    PROFESSOR_ROLE,
    profilePagePath,
    signupConfirmationPagePath,
    signUpProfessorPagePath,
    signUpStudentPagePath,
    STUDENT_ROLE,
    welcomePagePath
} from "./utils";
import DiscussionItemPage from "./pages/DiscussionItemPage";
import AdminPage from "./pages/AdminPage";
import SignUpConfirmationPage from "./pages/SignUpConfirmationPage";
import ProtectedRoute from "./components/ProtectedRoute.tsx";


export default function App() {
    return (
        <div className="app">
            <AppHeader />
            <Routes>
                <Route path={welcomePagePath} element={<WelcomePage />} />
                <Route path={signUpStudentPagePath} element={<SignUpStudentPage />} />
                <Route path={signUpProfessorPagePath} element={<SignUpProfessorPage />} />
                <Route path={loginPagePath} element={<LoginPage />} />
                <Route path={signupConfirmationPagePath} element={<SignUpConfirmationPage />} />
                <Route
                    path={adminPagePath}
                    element={<ProtectedRoute component={AdminPage} roles={[ADMIN_ROLE]} />}
                />
                <Route
                    path={labsPagePath}
                    element={<ProtectedRoute component={LabsPage} roles={[STUDENT_ROLE, PROFESSOR_ROLE, ADMIN_ROLE]} />}
                />
                <Route
                    path={`${labsPagePath}/:collegeName`}
                    element={<ProtectedRoute component={LabsPage} roles={[STUDENT_ROLE, PROFESSOR_ROLE, ADMIN_ROLE]} />}
                />
                <Route
                    path={`${labsPagePath}/:collegeName/:majorName`}
                    element={<ProtectedRoute component={LabsPage} roles={[STUDENT_ROLE, PROFESSOR_ROLE, ADMIN_ROLE]} />}
                />
                <Route
                    path={openingsPagePath}
                    element={<ProtectedRoute component={OpeningsPage} roles={[STUDENT_ROLE, PROFESSOR_ROLE, ADMIN_ROLE]} />}
                />
                <Route
                    path={discussionPagePath}
                    element={<ProtectedRoute component={DiscussionPage} roles={[STUDENT_ROLE, PROFESSOR_ROLE, ADMIN_ROLE]} />}
                />
                <Route
                    path={`${discussionPagePath}/:id`}
                    element={<ProtectedRoute component={DiscussionItemPage} roles={[STUDENT_ROLE, PROFESSOR_ROLE, ADMIN_ROLE]} />}
                />
                <Route
                    path={`${profilePagePath}/:role/:fullName`}
                    element={<ProtectedRoute component={ProfilePage} roles={[STUDENT_ROLE, PROFESSOR_ROLE, ADMIN_ROLE]} />}
                />
            </Routes>
            <AppFooter />
        </div>
    );
}
