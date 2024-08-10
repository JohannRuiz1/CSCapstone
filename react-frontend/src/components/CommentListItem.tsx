import {CommentItem} from "../types.ts";
import {ADMIN_ROLE, dateTimeFormatOptions, NO_TOKEN, profilePagePath} from "../utils.ts";
import "./CommentListItem.css"
import {useUserContext} from "../contexts/UserContext.tsx";
import {useStudentUserContext} from "../contexts/StudentUserContext.tsx";
import {Link} from "react-router-dom";
import {deleteComment} from "../services.ts";
import {useCommentsContext} from "../contexts/CommentsContext.tsx";

export default function CommentListItem(props: { comment: CommentItem, discussionId: string }) {

    const {role, token} = useUserContext();
    const {student} = useStudentUserContext();
    const {refreshComments} = useCommentsContext();


    const id = props.comment.id;
    const content = props.comment.content;
    const createdAt = props.comment.createdAt;
    const studentName = props.comment.studentName;

    const createdAtDate = new Date(createdAt);
    const createdAtString = createdAtDate.toLocaleString('en-US', dateTimeFormatOptions);

    function handleDeleteCommentClick() {
        if (token !== NO_TOKEN) {
            deleteComment(id, token)
                .then(() => {
                    refreshComments(props.discussionId);
                    console.log('Comment deleted successfully');
                })
                .catch((error) => {
                    console.error('Failed to delete comment:', error);
                });
        }
    }

    return (
        <div key={id} className="comment">
            <p className='comment-content'>{content}</p>
            <p className='comment-details'>Posted by <Link
                to={`${profilePagePath}/${role}/${studentName}`}>{studentName}</Link> on {createdAtString} </p>
            {(role === ADMIN_ROLE || studentName === `${student?.firstName} ${student?.lastName}`) && (
                <button className={'delete-comment-button tertiary-button'}
                        onClick={handleDeleteCommentClick}>Delete</button>
            )}
        </div>
    );
}