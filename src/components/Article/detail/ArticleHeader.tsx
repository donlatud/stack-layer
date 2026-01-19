import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import type { BlogPost } from "../../../types/blog";

interface ArticleHeaderProps {
  article: BlogPost;
}

/**
 * ArticleHeader - Only renders back button and image
 * For lg breakpoint restructure
 */
const ArticleHeader = ({ article }: ArticleHeaderProps) => {
  const navigate = useNavigate();

  return (
    <section className="w-full pt-[24px] pb-[20px] md:pt-[40px] md:pr-[40px] md:pb-[40px] md:pl-[40px] lg:pt-[60px] lg:pr-[60px] lg:pb-[40px] lg:pl-[60px] xl:pr-[120px] xl:pl-[120px]">
      <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-[24px] md:gap-[32px]">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="flex pl-[16px] pr-[16px] md:pl-0 md:pr-0 items-center gap-[8px] text-body-1 text-brown-600 hover:text-brown-700 transition-colors self-start"
        >
          <ArrowLeft className="w-[20px] h-[20px]" />
          <span>Back to Posts</span>
        </button>

        {/* Article Image */}
        <div className="w-full h-[212px] md:h-[400px] md:rounded-[16px] lg:h-[500px] xl:h-[600px] overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default ArticleHeader;
