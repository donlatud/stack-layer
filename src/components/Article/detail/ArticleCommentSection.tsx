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
 * ArticleCommentSection - Comment input and list
 * Styled as inner content component for flexible layout
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
