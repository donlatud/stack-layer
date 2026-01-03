import BlogCard from "./BlogCard";
import { blogPosts } from "../../../data/blogPosts.ts";
import WhiteButton from "../../common/WhiteButton";

const ArticleGrid = () => {
  return (
    <div className="flex flex-col gap-[48px] px-[16px]">
      <div className="grid grid-cols-1 gap-[48px] lg:grid-cols-2">
        {blogPosts.map((post) => (
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
        <WhiteButton children="View more" className="w-[86px] h-[24px] rounded-[5px] text-body-2" />
      </div>
    </div>
  );
};

export default ArticleGrid;
