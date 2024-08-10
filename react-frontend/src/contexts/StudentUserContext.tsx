import { StudentUser } from "../types.ts";
import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchStudents, fetchStudentUserByEmail } from "../services.ts";
import { useUserContext } from "./UserContext.tsx";
import { ADMIN_ROLE, NO_EMAIL, NO_TOKEN } from "../utils.ts";

interface StudentUserContextType {
    students: StudentUser[];
    student: StudentUser;
    updateStudentSubscriptions: (subscriptions: string[]) => void;
    fetchStudentDetails: () => void;
    removeStudent: (studentId: number) => void;
    refreshStudents: () => void;
}

const StudentUserContext = createContext<StudentUserContextType>({
    students: [],
    student: {} as StudentUser,
    updateStudentSubscriptions: () => {},
    fetchStudentDetails: () => {},
    removeStudent: () => {},
    refreshStudents: () => {}
});

export const StudentUserProvider = ({ children }: React.PropsWithChildren) => {
    const { token, email, role } = useUserContext();
    const [student, setStudent] = useState<StudentUser>({} as StudentUser);
    const [students, setStudents] = useState<StudentUser[]>([]);

    const fetchStudentDetails = async () => {
        const fetchStudentDetails = async () => {
            try {
                const studentUser = await fetchStudentUserByEmail(email, token);
                setStudent(studentUser);
            } catch (error) {
                console.error('Failed to fetch student user:', error);
            }
        };
        if (email !== NO_EMAIL) {
            await fetchStudentDetails();
        }

    };

    useEffect(() => {
        fetchStudentDetails();
    }, [email, token]);

    useEffect(() => {
        if (token === NO_TOKEN || role !== ADMIN_ROLE) {
            return;
        }
        fetchStudents(token)
            .then((data) => setStudents(data))
            .catch(console.error);
    }, [role, token]);

    const updateStudentSubscriptions = (subscriptions: string[]) => {
        setStudent(prevStudent => prevStudent ? {...prevStudent, subscriptions} : {} as StudentUser);
    };

    const removeStudent = (studentId: number) => {
        setStudents(prevStudents => prevStudents.filter(student => student.id !== studentId));
    };

    const refreshStudents = () => {
        if (token === NO_TOKEN || role !== ADMIN_ROLE) {
            return;
        }
        fetchStudents(token)
            .then((data) => setStudents(data))
            .catch(console.error);
    };

    return (
        <StudentUserContext.Provider value={{ students, student, updateStudentSubscriptions, fetchStudentDetails, removeStudent, refreshStudents }}>
            {children}
        </StudentUserContext.Provider>
    );
};

export const useStudentUserContext = () => {
    const context = useContext(StudentUserContext);
    if (!context) {
        throw new Error('useStudentUserContext must be used within a StudentUserProvider');
    }
    return context;
};