import ReactMarkdown from "react-markdown";
import type { BlogPost } from "../../../types/blog";

interface ArticleContentProps {
  article: BlogPost;
}

/**
 * เนื้อหาบทความในรูปแบบ Markdown
 */
const ArticleContent = ({ article }: ArticleContentProps) => {
  return (
    <div className="markdown text-brown-500">
      <ReactMarkdown>{article.content}</ReactMarkdown>
    </div>
  );
};

export default ArticleContent;
