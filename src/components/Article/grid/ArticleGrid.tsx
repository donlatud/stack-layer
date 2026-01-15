import BlogCard from "./BlogCard";
import WhiteButton from "../../common/WhiteButton";
import type { BlogPost } from "../../../types/blog";

interface ArticleGridProps {
  posts: BlogPost[];
  hasMore: boolean;
  isLoadingMore: boolean;
  onLoadMore: () => void;
}

/**
 * Gets className for View More button based on loading state
 */
const getViewMoreButtonClassName = (isLoadingMore: boolean): string => {
  const baseClasses =
    "w-[86px] h-[24px] rounded-[5px] text-body-2 border-none underline transition-all duration-300";
  const enabledClasses =
    "hover:no-underline hover:scale-110 hover:font-semibold active:scale-100 cursor-pointer";
  const disabledClasses = "opacity-50 cursor-not-allowed";

  return `${baseClasses} ${!isLoadingMore ? enabledClasses : disabledClasses}`;
};

/**
 * ArticleGrid component - Displays blog posts in a responsive grid layout
 * Implements pagination: shows posts from API, loads more on "View more" click
 */
const ArticleGrid = ({
  posts,
  hasMore,
  isLoadingMore,
  onLoadMore,
}: ArticleGridProps) => {
  return (
    <div className="flex flex-col gap-[48px] px-[16px] md:px-[40px]">
      <div className="grid grid-cols-1 gap-[48px] md:grid-cols-2 lg:grid-cols-2">
        {posts.map((post) => (
          <BlogCard
            key={post.id}
            id={post.id}
            image={post.image}
            category={post.category}
            title={post.title}
            description={post.description}
            author={post.author}
            date={post.date}
          />
        ))}
      </div>
      {hasMore && (
        <div className="flex flex-col justify-center items-center gap-[16px]">
          {isLoadingMore && (
            <p className="text-body-1 text-brown-400">Loading...</p>
          )}
          <WhiteButton
            onClick={onLoadMore}
            disabled={isLoadingMore}
            children="View more"
            className={getViewMoreButtonClassName(isLoadingMore)}
          />
        </div>
      )}
    </div>
  );
};

export default ArticleGrid;
