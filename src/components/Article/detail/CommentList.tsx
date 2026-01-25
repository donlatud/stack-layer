import CommentItem from "./CommentItem";

interface Comment {
  avatar: string;
  name: string;
  date: string;
  content: string;
}

interface CommentListProps {
  comments: Comment[];
}

/** รายการคอมเมนต์ทั้งหมด แสดง CommentItem และเส้นคั่นระหว่างรายการ */
const CommentList = ({ comments }: CommentListProps) => {
  return (
    <div className="flex flex-col gap-[24px]">
      {comments.map((comment, index) => (
        <div key={index} className="flex flex-col gap-[24px]">
          <CommentItem
            avatar={comment.avatar}
            name={comment.name}
            date={comment.date}
            content={comment.content}
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
