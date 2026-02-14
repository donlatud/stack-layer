import CommentInput from "./CommentInput";
import CommentList from "./CommentList";
import type { Comment } from "./CommentList";

interface ArticleCommentSectionProps {
  comments: Comment[];
  disabled?: boolean;
  onRequireLogin?: () => void;
  /** โหมดสมาชิก: ส่ง comment และลบได้ */
  commentValue?: string;
  onCommentChange?: (value: string) => void;
  onSendComment?: (text: string) => void;
  onDeleteComment?: (commentId: number) => void;
  currentUserId?: string | null;
  isSendingComment?: boolean;
}

/**
 * ส่วนคอมเมนต์: ช่องพิมพ์ + ปุ่ม Send, รายการคอมเมนต์
 * disabled=true จะ trigger onRequireLogin เมื่อพยายามใส่หรือโฟกัส
 * มี onSendComment: ใช้ commentValue/onCommentChange และส่ง comment ได้
 */
const ArticleCommentSection = ({
  comments,
  disabled = false,
  onRequireLogin,
  commentValue = "",
  onCommentChange,
  onSendComment,
  onDeleteComment,
  currentUserId = null,
  isSendingComment = false,
}: ArticleCommentSectionProps) => {
  return (
    <div className="flex flex-col gap-[44px] md:gap-[48px]">
      <CommentInput
        disabled={disabled}
        onRequireLogin={onRequireLogin}
        value={commentValue}
        onChange={onCommentChange}
        onSend={onSendComment}
        isSending={isSendingComment}
      />
      <CommentList
        comments={comments}
        currentUserId={currentUserId}
        onDeleteComment={onDeleteComment}
      />
    </div>
  );
};

export default ArticleCommentSection;
