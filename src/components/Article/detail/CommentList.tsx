import CommentItem from "./CommentItem";

export interface Comment {
  id: number;
  user_id?: string;
  avatar: string;
  name: string;
  date: string;
  content: string;
}

interface CommentListProps {
  comments: Comment[];
  currentUserId?: string | null;
  onDeleteComment?: (commentId: number) => void;
}

/** รายการคอมเมนต์ทั้งหมด แสดง CommentItem และเส้นคั่นระหว่างรายการ */
const CommentList = ({
  comments,
  currentUserId = null,
  onDeleteComment,
}: CommentListProps) => {
  return (
    <div className="flex flex-col gap-[24px]">
      {comments.map((comment, index) => (
        <div key={comment.id} className="flex flex-col gap-[24px]">
          <CommentItem
            avatar={comment.avatar}
            name={comment.name}
            date={comment.date}
            content={comment.content}
            canDelete={
              Boolean(currentUserId && onDeleteComment && comment.user_id === currentUserId)
            }
            onDelete={
              onDeleteComment && comment.user_id === currentUserId
                ? () => onDeleteComment(comment.id)
                : undefined
            }
          />
          {index < comments.length - 1 && (
            <div className="h-px bg-brown-300" />
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentList;
