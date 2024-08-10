import React, {createContext, useContext, useState} from 'react';
import {CommentItem} from '../types.ts';
import {NO_TOKEN} from "../utils.ts";
import {useUserContext} from "./UserContext.tsx";
import {fetchDiscussionById} from "../services.ts";

interface CommentsContextType {
    comments: CommentItem[];
    setComments: React.Dispatch<React.SetStateAction<CommentItem[]>>;
    refreshComments: (is: string) => void;
}

const CommentsContext = createContext<CommentsContextType>({
    comments: [],
    setComments: () => {
    },
    refreshComments: () => {
    }
});

export const CommentsProvider = ({children}: React.PropsWithChildren) => {
    const {token} = useUserContext();
    const [comments, setComments] = useState<CommentItem[]>([]);

    const refreshComments = async (id: string) => {
        if (token === NO_TOKEN) {
            return;
        }
        try {
            const discussionItem = await fetchDiscussionById(id, token); // Assuming fetchComments is a function that fetches comments from the server
            setComments(discussionItem.comments); // Update comments with fetched data
        } catch (error) {
            console.error('Error refreshing comments:', error);
        }
    };

    return (
        <CommentsContext.Provider value={{comments, setComments, refreshComments}}>
            {children}
        </CommentsContext.Provider>
    );
};

export const useCommentsContext = () => {
    const context = useContext(CommentsContext);
    if (!context) {
        throw new Error('useCommentsContext must be used within a CommentsProvider');
    }
    return context;
};