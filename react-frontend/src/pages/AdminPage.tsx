import { useProfessorUserContext } from "../contexts/ProfessorUserContext.tsx";
import { useStudentUserContext } from "../contexts/StudentUserContext.tsx";
import "./AdminPage.css";
import { profilePagePath } from "../utils.ts";
import { Link } from "react-router-dom";
import { deleteUser } from "../services.ts";
import { useUserContext } from "../contexts/UserContext.tsx";
import {useEffect} from "react";

export default function AdminPage() {
    const { professors, removeProfessor, refreshProfessors } = useProfessorUserContext();
    const { students, removeStudent, refreshStudents } = useStudentUserContext();
    const { token } = useUserContext();

    useEffect(() => {
        refreshProfessors();
        refreshStudents();
    }, []);


    const professorsList = professors.map((professor) => (
        <li key={professor.id}>
            <Link
                to={`${profilePagePath}/PROFESSOR/${professor.firstName} ${professor.lastName}`}>
                {professor.firstName} {professor.lastName}
            </Link>
            <button
                className="tertiary-button"
                onClick={() => handleDelete(professor.userId, 'PROFESSOR')}>
                delete
            </button>
        </li>
    ));

    const studentList = students.map((student) => (
        <li key={student.id}>
            <Link
                to={`${profilePagePath}/STUDENT/${student.firstName} ${student.lastName}`}>
                {student.firstName} {student.lastName}
            </Link>
            <button
                className="tertiary-button"
                onClick={() => handleDelete(student.userId, 'STUDENT')}>
                delete
            </button>
        </li>
    ));

    async function handleDelete(userId: number, userType: 'PROFESSOR' | 'STUDENT') {
        try {
            const response = await deleteUser(userId, token);
            if (response.status === 200) {
                console.log("User deleted successfully");
                if (userType === 'PROFESSOR') {
                    removeProfessor(userId);
                } else if (userType === 'STUDENT') {
                    removeStudent(userId);
                }
                refreshProfessors();
                refreshStudents();
            } else {
                console.error("Error deleting user:", response.status);
            }
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    }

    return (
        <div className='admin-page center-content'>
            <div>
                <h1>Professor Accounts</h1>
                {professors.length > 0 ? (
                    <ul>
                        {professorsList}
                    </ul>
                ) : (
                    <p>There are no professor accounts!</p>
                )}
            </div>
            <div>
                <h1>Student Accounts</h1>
                {students.length > 0 ? (
                    <ul>
                        {studentList}
                    </ul>
                ) : (
                    <p>There are no student accounts!</p>
                )}
            </div>
        </div>
    );
}
