import {ProfessorUser} from "../types.ts";
import React, {createContext, useContext, useEffect, useState} from "react";
import {fetchProfessors, fetchProfessorUserByEmail} from "../services.ts";
import {useUserContext} from "./UserContext.tsx";
import {ADMIN_ROLE, NO_EMAIL, NO_TOKEN} from "../utils.ts";

interface ProfessorUserContextType {
    professors: ProfessorUser[];
    professor: ProfessorUser;
    removeProfessor: (professorId: number) => void;
    refreshProfessors: () => void;
}

const ProfessorUserContext = createContext<ProfessorUserContextType>({
    professors: [],
    professor: {} as ProfessorUser,
    removeProfessor: () => {
    },
    refreshProfessors: () => {
    }
});

export const ProfessorUserProvider = ({children}: React.PropsWithChildren) => {
    const {token, email, role} = useUserContext();
    const [professor, setProfessor] = useState<ProfessorUser>({} as ProfessorUser);
    const [professors, setProfessors] = useState<ProfessorUser[]>([]);

    useEffect(() => {
        if (token === NO_TOKEN || role !== ADMIN_ROLE) {
            return;
        }
        fetchProfessors(token)
            .then((data) => setProfessors(data))
            .catch(console.error);
    }, [role, token]);

    useEffect(() => {
        const fetchProfessorDetails = async () => {
            try {
                console.log(email);
                const professorUser = await fetchProfessorUserByEmail(email, token);
                setProfessor(professorUser);
            } catch (error) {
                console.error('Failed to fetch professor user:', error);
            }
        };
        if (email !== NO_EMAIL) {
            fetchProfessorDetails();
        }
    }, [email, token]);

    const removeProfessor = (professorId: number) => {
        setProfessors(prevProfessors => prevProfessors.filter(professor => professor.id !== professorId));
    };

    const refreshProfessors = () => {
        if (token === NO_TOKEN || role !== ADMIN_ROLE) {
            return;
        }
        fetchProfessors(token)
            .then((data) => setProfessors(data))
            .catch(console.error);
    };

    return (
        <ProfessorUserContext.Provider value={{professors, professor, removeProfessor, refreshProfessors}}>
            {children}
        </ProfessorUserContext.Provider>
    );
};

export const useProfessorUserContext = () => {
    const context = useContext(ProfessorUserContext);
    if (!context) {
        throw new Error('useProfessorUserContext must be used within a ProfessorUserProvider');
    }
    return context;
};