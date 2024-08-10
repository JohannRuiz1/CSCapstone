import {Link, useNavigate} from "react-router-dom";
import {CommentItem, DiscussionItem} from "../types.ts";
import {
    ADMIN_ROLE,
    dateTimeFormatOptions,
    discussionPagePath,
    NO_TOKEN,
    profilePagePath,
    STUDENT_ROLE
} from "../utils.ts";
import "./DiscussionListItem.css";
import React, {useState} from "react";
import {addCommentByDiscussionId, deleteDiscussion} from "../services.ts";
import {useCommentsContext} from "../contexts/CommentsContext.tsx";
import {useUserContext} from "../contexts/UserContext.tsx";
import {useStudentUserContext} from "../contexts/StudentUserContext.tsx";
import {useDiscussionContext} from "../contexts/DiscussionContext.tsx";

export default function DiscussionListItem(props: { discussion: DiscussionItem, isItemPage: boolean }) {
    const id = props.discussion.id;
    const title = props.discussion.title;
    const content = props.discussion.content;
    const numberOfComments = props.discussion.numberOfComments;
    const createdAt = props.discussion.createdAt;
    const labName = props.discussion.labName;
    const studentUserDiscussion = props.discussion.student;

    const studentName = `${studentUserDiscussion.firstName} ${studentUserDiscussion.lastName}`;
    const createdAtDate = new Date(createdAt);
    const createdAtString = createdAtDate.toLocaleString('en-US', dateTimeFormatOptions);

    const navigate = useNavigate();
    const {token, role} = useUserContext();
    const {refreshDiscussions} = useDiscussionContext();

    const handleTitleClick = () => {
        navigate(`${discussionPagePath}/${id}`);
    };

    function handleDeleteDiscussionClick() {
        if (token !== NO_TOKEN) {
            deleteDiscussion(id, token)
                .then(() => {
                    refreshDiscussions(""); // refresh discussions after deletion
                    if (props.isItemPage) {
                        navigate(discussionPagePath);
                    }
                    console.log('Discussion deleted successfully');
                })
                .catch((error) => {
                    // Handle error
                    console.error('Failed to delete discussion:', error);
                });
        }
    }

    // If isItemPage, add commenting stuff.

    const {student} = useStudentUserContext();
    const {comments, setComments} = useCommentsContext();
    const [isCommenting, setIsCommenting] = useState(false);

    console.log(studentUserDiscussion);
    console.log(student);

    const commentItem: CommentItem = {
        id: id,
        content: '',
        createdAt: new Date(),
        studentName: `${student?.firstName} ${student?.lastName}`
    }

    const [comment, setComment] = useState<CommentItem>(commentItem);
    const {updateNumberOfComments} = useDiscussionContext();


    const handleCommentClick = () => {
        setIsCommenting(true);
    };

    const handleCancelClick = () => {
        setIsCommenting(false);
        setComment(commentItem);
    };

    const handleSubmitClick = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (token !== NO_TOKEN) {
            setComment({
                ...comment,
                createdAt: new Date()
            });
            try {
                await addCommentByDiscussionId(id, comment, token);
                setComments([...comments, comment]);
                updateNumberOfComments(id);
            } catch (error) {
                console.error('Failed to add comment:', error);
            }
        }

        setComment(commentItem);
        setIsCommenting(false);
    };

    return (
        <li key={id} className="discussion-post">
            <h1 className="discussion-title" onClick={handleTitleClick}>{title}</h1>
            <p className="discussion-author-details">{labName}</p>
            <p className="discussion-content">{content}</p>
            <p className="discussion-details">
                Posted by <Link
                to={`${profilePagePath}/STUDENT/${studentName}`}>{studentName}</Link> on {createdAtString} | {numberOfComments} comments
            </p>
            {props.isItemPage && (
                isCommenting ? (
                    <form onSubmit={handleSubmitClick}>
            <textarea
                className='resizable-textarea'
                value={comment.content}
                onChange={e => setComment({...comment, content: e.target.value})}
                required
            />
                        <div className='cancel-submit-buttons'>
                            <button className='tertiary-button-other' onClick={handleCancelClick}>Cancel</button>
                            <button type='submit' className='tertiary-button'>Submit</button>
                        </div>
                    </form>
                ) : (
                    <>
                        {(role === STUDENT_ROLE) && (
                            <button className={'add-comment-button tertiary-button'} onClick={handleCommentClick}>Add a
                                Comment</button>
                        )}
                    </>
                )
            )}
            {(role === ADMIN_ROLE || studentName === `${student?.firstName} ${student?.lastName}`) && (
                <button className={'delete-comment-button tertiary-button'}
                        onClick={handleDeleteDiscussionClick}>Delete</button>
            )}
        </li>
    );
}