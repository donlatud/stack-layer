import { useState, useEffect } from "react";
import BlogCard from "./BlogCard";
import WhiteButton from "../../common/WhiteButton";
import type { BlogPost } from "../../../types/blog";

interface ArticleGridProps {
  posts: BlogPost[];
}

/**
 * ArticleGrid component - Displays blog posts in a responsive grid layout
 * Implements pagination: shows 4 posts initially, loads 4 more on "View more" click
 */
const ArticleGrid = ({ posts }: ArticleGridProps) => {
  const [visibleCount, setVisibleCount] = useState(4);

  /**
   * Reset visible count when posts change (e.g., when filter/search changes)
   */
  useEffect(() => {
    setVisibleCount(4);
  }, [posts]);

  const visiblePosts = posts.slice(0, visibleCount);
  const hasMore = visibleCount < posts.length;

  /**
   * Handles "View more" button click
   * Increases visible count by 4 if there are more posts to show
   */
  const handleViewMore = () => {
    if (hasMore) {
      setVisibleCount((prev) => prev + 4);
    }
  };

  return (
    <div className="flex flex-col gap-[48px] px-[16px]">
      <div className="grid grid-cols-1 gap-[48px] lg:grid-cols-2">
        {visiblePosts.map((post) => (
          <BlogCard
            key={post.id}
            image={post.image}
            category={post.category}
            title={post.title}
            description={post.description}
            author={post.author}
            date={post.date}
          />
        ))}
      </div>
      <div className="flex justify-center items-center">
        <WhiteButton
          onClick={handleViewMore}
          disabled={!hasMore}
          children="View more"
          className={`w-[86px] h-[24px] rounded-[5px] text-body-2 border-none underline transition-all duration-300 ${
            hasMore
              ? "hover:no-underline hover:scale-110 hover:font-semibold active:scale-100 cursor-pointer"
              : "opacity-50 cursor-not-allowed"
          }`}
        />
      </div>
    </div>
  );
};

export default ArticleGrid;
