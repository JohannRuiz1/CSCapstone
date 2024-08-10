import { Link, useParams } from "react-router-dom";
import CommentListItem from "../components/CommentListItem.tsx";
import { CommentItem, DiscussionItem } from "../types.ts";
import DiscussionListItem from "../components/DiscussionListItem.tsx";
import "./DiscussionItemPage.css";
import { discussionPagePath, NO_TOKEN } from "../utils.ts";
import { fetchDiscussionById } from "../services.ts";
import { useEffect, useState } from "react";
import { useCommentsContext } from "../contexts/CommentsContext.tsx";
import { useUserContext } from "../contexts/UserContext.tsx";

export default function DiscussionItemPage() {
    const { id } = useParams<{ id: string }>();
    const { token } = useUserContext();
    const [discussion, setDiscussion] = useState<DiscussionItem>();
    const { comments, setComments } = useCommentsContext();
    const [commentsMessage, setCommentsMessage] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            if (token !== NO_TOKEN) {
                try {
                    const result = await fetchDiscussionById(id!, token);
                    setDiscussion(result);
                    const comments = result.comments;
                    setComments(comments);
                    setCommentsMessage(comments.length > 0 ? "" : "No comments yet!");
                } catch (error) {
                    console.error("Failed to fetch discussion:", error);
                }
            }
        };
        fetchData();
        setCommentsMessage(comments.length > 0 ? "" : "No comments yet!");
    }, [comments.length, id, setComments, setDiscussion, token]);

    return (
        <div className="discussion-item-page center-content">
            <Link to={discussionPagePath} className={"tertiary-button-other"}>
                <i className="fa-solid fa-left-long"></i> RETURN TO DISCUSSIONS
            </Link>
            {discussion && <DiscussionListItem discussion={discussion} isItemPage={true} />}
            <div className="comments-div">
                <h2>Comments</h2>
                <ul className="comments-list">
                    {comments.map((comment: CommentItem, index: number) => (
                        <CommentListItem key={index} comment={comment} discussionId={id!} />
                    ))}
                    {commentsMessage}
                </ul>
            </div>
        </div>
    );
}