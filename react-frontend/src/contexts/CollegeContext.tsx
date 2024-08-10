import {CollegeItem} from "../types.ts";
import React, {createContext, useContext, useEffect, useState} from "react";
import {fetchColleges} from "../services.ts";

interface CollegeContextType {
    colleges: CollegeItem[];
}

const CollegeContext = createContext<CollegeContextType>({colleges: []});

export const CollegeProvider = ({children}: React.PropsWithChildren) => {
    const [colleges, setColleges] = useState<CollegeItem[]>([]);

    useEffect(() => {
        fetchColleges()
            .then((data) => setColleges(data))
            .catch(console.error);
    }, []);

    return (
        <CollegeContext.Provider value={{colleges}}>
            {children}
        </CollegeContext.Provider>
    );
};

export const useCollegeContext = () => {
    const context = useContext(CollegeContext);
    if (!context) {
        throw new Error('useCollegeContext must be used within a CollegeProvider');
    }
    return context;
};

