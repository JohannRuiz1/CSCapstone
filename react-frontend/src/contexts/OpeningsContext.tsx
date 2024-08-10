import {OpeningsItem} from "../types.ts";
import React, {createContext, useContext, useEffect, useState} from "react";
import {fetchOpenings} from "../services.ts";
import {useUserContext} from "./UserContext.tsx";
import {NO_TOKEN} from "../utils.ts";

interface OpeningsContextType {
    openings: OpeningsItem[];
    filteredOpenings: OpeningsItem[];
    refreshOpenings: (labName: string) => void;
    sortOpenings: (criteria: string) => void;
    filterOpenings: (labName: string) => void;
}

const OpeningsContext = createContext<OpeningsContextType>({
    openings: [],
    filteredOpenings: [],
    refreshOpenings: () => {
    },
    sortOpenings: () => {
    },
    filterOpenings: () => {
    }
});

export const OpeningsProvider = ({children}: React.PropsWithChildren) => {
    const {token} = useUserContext();
    const [openings, setOpenings] = useState<OpeningsItem[]>([]);
    const [filteredOpenings, setFilteredOpenings] = useState<OpeningsItem[]>([]);

    useEffect(() => {
        if (token === NO_TOKEN) {
            return;
        }
        fetchOpenings(token)
            .then((data) => setOpenings(data))
            .catch(console.error)
    }, [token]);

    const refreshOpenings = async (labName: string = "") => {
        if (token === NO_TOKEN) {
            return;
        }
        try {
            const updatedOpenings = await fetchOpenings(token);
            setOpenings(updatedOpenings);
            if (labName) {
                const filtered = updatedOpenings.filter(Opening => Opening.labName === labName);
                setFilteredOpenings(filtered);
            } else {
                setFilteredOpenings(updatedOpenings);
            }
        } catch (error) {
            console.error("Error refreshing Openings", error);
        }
    }

    const sortOpenings = (criteria: string) => {
        let sortedOpenings = [...filteredOpenings];
        if (criteria === "oldest") {
            sortedOpenings.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        } else if (criteria === "newest") {
            sortedOpenings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        } 
        setFilteredOpenings(sortedOpenings);
    };

    const filterOpenings = (labName: string) => {
        if (labName === "") {
            setFilteredOpenings(openings);
        } else {
            const filtered = openings.filter(opening => opening.labName === labName);
            setFilteredOpenings(filtered);
        }
    };

    return (
        <OpeningsContext.Provider value={{openings, filteredOpenings, refreshOpenings, sortOpenings, filterOpenings}}>
            {children}
        </OpeningsContext.Provider>
    );
};

export const useOpeningsContext = () => {
    const context = useContext(OpeningsContext);
    if (!context) {
        throw new Error('useOpeningsContext must be used within a OpeningsProvider');
    }
    return context;
};

