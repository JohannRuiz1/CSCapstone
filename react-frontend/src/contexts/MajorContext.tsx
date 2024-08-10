import {MajorItem} from "../types.ts";
import React, {createContext, useContext, useEffect, useState} from "react";
import {fetchMajors} from "../services.ts";

interface MajorContextType {
    majors: MajorItem[]
}

const MajorContext = createContext<MajorContextType>({
    majors: []
});

export const MajorProvider = ({children}: React.PropsWithChildren) => {
    const [majors, setMajors] = useState<MajorItem[]>([]);

    useEffect(() => {
        fetchMajors()
            .then((data) => setMajors(data))
            .catch(console.error);
    }, []);

    return (
        <MajorContext.Provider value={{majors}}>
            {children}
        </MajorContext.Provider>
    );
};

export const useMajorContext = () => {
    const context = useContext(MajorContext);
    if (!context) {
        throw new Error('useMajorContext must be used within a MajorProvider');
    }
    return context;
}
