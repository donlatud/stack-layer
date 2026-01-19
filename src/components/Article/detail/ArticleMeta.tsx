import type { BlogPost } from "../../../types/blog";

interface ArticleMetaProps {
  article: BlogPost;
}

/**
 * ArticleMeta - Renders category, date, title, and description
 * Used in the main content area for all breakpoints
 */
const ArticleMeta = ({ article }: ArticleMetaProps) => {
  return (
    <div className="flex flex-col gap-[16px] md:gap-[20px]">
      {/* Category and Date */}
      <div className="flex items-center gap-[16px] flex-wrap">
        <span className="bg-brand-green-light rounded-[999px] px-[12px] py-[4px] text-body-2 text-brand-green">
          {article.category}
        </span>
        <span className="text-body-2 text-brown-400">{article.date}</span>
      </div>

      {/* Article Title */}
      <h1 className="text-headline-3 md:text-headline-1 text-brown-600">
        {article.title}
      </h1>

      {/* Article Description */}
      <p className="text-body-1 text-brown-400">{article.description}</p>
    </div>
  );
};

export default ArticleMeta;
