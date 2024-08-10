import React, {createContext, useState, useEffect, useContext} from 'react';
import {ResearchLabItem} from '../types';
import {fetchResearchLabs} from '../services.ts';
import {useUserContext} from "./UserContext.tsx";
import {NO_TOKEN} from "../utils.ts";

const DEFAULT_COLLEGE_NAME = "";
const DEFAULT_MAJOR_NAME = "";

interface ResearchLabContextType {
    labs: ResearchLabItem[];
    refreshLabs: () => void;
    currentSelectedCollege: string;
    setCurrentSelectedCollege: (collegeName: string) => void;
    currentSelectedMajor: string;
    setCurrentSelectedMajor: (collegeName: string) => void;
}

const ResearchLabContext = createContext<ResearchLabContextType>({
    labs: [],
    refreshLabs: () => {
    },
    currentSelectedCollege: DEFAULT_COLLEGE_NAME,
    setCurrentSelectedCollege: () => {
    },
    currentSelectedMajor: DEFAULT_MAJOR_NAME,
    setCurrentSelectedMajor: () => {
    }
});

export const ResearchLabProvider = ({children}: React.PropsWithChildren) => {
    const {token} = useUserContext();
    const [labs, setLabs] = useState<ResearchLabItem[]>([]);
    const [currentSelectedCollege, setCurrentSelectedCollege] = useState<string>(DEFAULT_COLLEGE_NAME);
    const [currentSelectedMajor, setCurrentSelectedMajor] = useState<string>(DEFAULT_MAJOR_NAME);

    useEffect(() => {
        if (token === NO_TOKEN) {
            return;
        }
        fetchResearchLabs(token)
            .then((data) => setLabs(data))
            .catch(console.error)
    }, [token]);

    const refreshLabs = async () => {
        if (token === NO_TOKEN) {
            return;
        }
        try {
            const updatedLabs = await fetchResearchLabs(token);
            setLabs(updatedLabs);
        } catch (error) {
            console.error("Error refreshing Labs", error);
        }
    }

    return (
        <ResearchLabContext.Provider value={{
            labs,
            refreshLabs,
            currentSelectedCollege,
            setCurrentSelectedCollege,
            currentSelectedMajor,
            setCurrentSelectedMajor
        }}>
            {children}
        </ResearchLabContext.Provider>
    );
};

export const useResearchLabContext = () => {
    const context = useContext(ResearchLabContext);
    if (!context) {
        throw new Error('useResearchLabContext must be used within a ResearchLabProvider');
    }
    return context;
};

