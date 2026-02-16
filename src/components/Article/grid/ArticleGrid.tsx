import BlogCard from "./BlogCard";
import WhiteButton from "../../common/WhiteButton";
import { LoadingMessage } from "../../common/LoadingMessage";
import type { BlogPost } from "../../../types/blog";
import { cn } from "@/lib/utils";

interface ArticleGridProps {
  posts: BlogPost[];
  hasMore: boolean;
  isLoadingMore: boolean;
  onLoadMore: () => void;
}

const VIEW_MORE_BASE =
  "w-[86px] h-[24px] rounded-[5px] text-body-2 border-none underline transition-all duration-300";

/**
 * กริดการ์ดบทความ + ปุ่ม "View more" โหลดหน้าเพิ่ม
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
          {isLoadingMore && <LoadingMessage />}
          <WhiteButton
            onClick={onLoadMore}
            disabled={isLoadingMore}
            className={cn(
              VIEW_MORE_BASE,
              isLoadingMore
                ? "opacity-50 cursor-not-allowed"
                : "hover:no-underline hover:scale-110 hover:font-semibold active:scale-100 cursor-pointer"
            )}
          >
            View more
          </WhiteButton>
        </div>
      )}
    </div>
  );
};

export default ArticleGrid;
