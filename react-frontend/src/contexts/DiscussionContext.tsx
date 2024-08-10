import {DiscussionItem} from "../types.ts";
import React, {createContext, useContext, useEffect, useState} from "react";
import {fetchDiscussions} from "../services.ts";
import {useUserContext} from "./UserContext.tsx";
import {NO_TOKEN} from "../utils.ts";

interface DiscussionContextType {
    discussions: DiscussionItem[];
    filteredDiscussions: DiscussionItem[];
    refreshDiscussions: (labName: string) => void;
    sortDiscussions: (criteria: string) => void;
    updateNumberOfComments: (discussionId: number, increment?: number) => void;
    filterDiscussions: (labName: string) => void;
}

const DiscussionContext = createContext<DiscussionContextType>({
    discussions: [],
    filteredDiscussions: [],
    refreshDiscussions: () => {
    },
    sortDiscussions: () => {
    },
    updateNumberOfComments: () => {
    },
    filterDiscussions: () => {
    }
});

export const DiscussionProvider = ({children}: React.PropsWithChildren) => {
    const {token} = useUserContext();
    const [discussions, setDiscussions] = useState<DiscussionItem[]>([]);
    const [filteredDiscussions, setFilteredDiscussions] = useState<DiscussionItem[]>([]);

    useEffect(() => {
        if (token === NO_TOKEN) {
            return;
        }
        fetchDiscussions(token)
            .then((data) => {
                setDiscussions(data);
                setFilteredDiscussions(data); // Ensure filtered discussions are set initially
            })
            .catch(console.error)
    }, [token]);


    const refreshDiscussions = async (labName: string = ""): Promise<void> => {
        if (token === NO_TOKEN) {
            return;
        }
        try {
            const updatedDiscussions = await fetchDiscussions(token);
            setDiscussions(updatedDiscussions); // Update discussions with fetched data
            if (labName) {
                const filtered = updatedDiscussions.filter(discussion => discussion.labName === labName);
                setFilteredDiscussions(filtered);
            } else {
                setFilteredDiscussions(updatedDiscussions);
            }
        } catch (error) {
            console.error('Error refreshing discussions:', error);
        }
    };

    const updateNumberOfComments = (discussionId: number, increment: number = 1) => {
        setDiscussions(discussions.map(discussion => {
            if (discussion.id === discussionId) {
                return {...discussion, numberOfComments: discussion.numberOfComments + increment};
            }
            return discussion;
        }));
    };

    const sortDiscussions = (criteria: string) => {
        let sortedDiscussions = [...filteredDiscussions];
        if (criteria === "oldest") {
            sortedDiscussions.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        } else if (criteria === "newest") {
            sortedDiscussions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        } else if (criteria === "highest") {
            sortedDiscussions.sort((a, b) => b.numberOfComments - a.numberOfComments);
        } else if (criteria === "lowest") {
            sortedDiscussions.sort((a, b) => a.numberOfComments - b.numberOfComments);
        }
        setFilteredDiscussions(sortedDiscussions);
    };

    const filterDiscussions = (labName: string) => {
        if (labName === "") {
            setFilteredDiscussions(discussions);
        } else {
            const filtered = discussions.filter(discussion => discussion.labName === labName);
            setFilteredDiscussions(filtered);
        }
    };


    return (
        <DiscussionContext.Provider value={{
            discussions,
            filteredDiscussions,
            refreshDiscussions,
            sortDiscussions,
            updateNumberOfComments,
            filterDiscussions
        }}>
            {children}
        </DiscussionContext.Provider>
    );
}

export const useDiscussionContext = () => {
    const context = useContext(DiscussionContext);
    if (!context) {
        throw new Error('useMajorContext must be used within a DiscussionProvider');
    }
    return context;
}