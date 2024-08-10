import DiscussionListItem from "./DiscussionListItem";
import './DiscussionList.css';
import { DiscussionItem } from "../types.ts";


interface DiscussionListProps {
    discussions: DiscussionItem[];
}

export default function DiscussionList({ discussions }: DiscussionListProps) {
    const discussionList = discussions.map((discussion) => (
        <DiscussionListItem key={discussion.id} discussion={discussion} isItemPage={false} />
    ));

    return <ul id="discussion-posts">{discussionList}</ul>;
}