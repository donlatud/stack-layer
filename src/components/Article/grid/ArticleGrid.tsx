import BlogCard from "./BlogCard";
import WhiteButton from "../../common/WhiteButton";
import type { BlogPost } from "../../../types/blog";

interface ArticleGridProps {
  posts: BlogPost[];
}

const ArticleGrid = ({ posts }: ArticleGridProps) => {
  return (
    <div className="flex flex-col gap-[48px] px-[16px]">
      <div className="grid grid-cols-1 gap-[48px] lg:grid-cols-2">
        {posts.map((post) => (
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
          children="View more" 
          className="w-[86px] h-[24px] rounded-[5px] text-body-2 border-none underline hover:no-underline hover:scale-110 hover:font-semibold transition-all duration-300 active:scale-100" 
        />
      </div>
    </div>
  );
};

export default ArticleGrid;
