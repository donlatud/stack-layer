import CommentInput from "./CommentInput";
import CommentList from "./CommentList";

interface Comment {
  avatar: string;
  name: string;
  date: string;
  content: string;
}

interface ArticleCommentSectionProps {
  comments: Comment[];
  disabled?: boolean;
  onRequireLogin?: () => void;
}

/**
 * ส่วนคอมเมนต์: ช่องพิมพ์ + ปุ่ม Send, รายการคอมเมนต์
 * disabled=true จะ trigger onRequireLogin เมื่อพยายามใส่หรือโฟกัส
 */
const ArticleCommentSection = ({
  comments,
  disabled = false,
  onRequireLogin,
}: ArticleCommentSectionProps) => {
  return (
    <div className="flex flex-col gap-[44px] md:gap-[48px]">
      <CommentInput disabled={disabled} onRequireLogin={onRequireLogin} />
      <CommentList comments={comments} />
    </div>
  );
};

export default ArticleCommentSection;
