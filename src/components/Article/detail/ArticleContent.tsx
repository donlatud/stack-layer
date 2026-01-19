import ReactMarkdown from "react-markdown";
import type { BlogPost } from "../../../types/blog";

interface ArticleContentProps {
  article: BlogPost;
}

/**
 * ArticleContent - Renders only the markdown content
 * Author card is now handled at the page level for responsive layout
 */
const ArticleContent = ({ article }: ArticleContentProps) => {
  return (
    <div className="markdown text-brown-500">
      <ReactMarkdown>{article.content}</ReactMarkdown>
    </div>
  );
};

export default ArticleContent;
