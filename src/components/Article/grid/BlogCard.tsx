import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import authorLogo from "../../../assets/author-logo.svg";

interface BlogCardProps {
  id: number;
  image: string;
  category: string;
  title: string;
  description: string;
  author: string;
  date: string;
}

/**
 * การ์ดบทความ: รูป, หมวดหมู่, หัวข้อ, คำอธิบาย, ผู้เขียน, วันที่
 * คลิกไป /post/:id หรือ /member/post/:id ถ้าล็อกอินแล้ว
 */
const BlogCard = ({
  id,
  image,
  category,
  title,
  description,
  author,
  date,
}: BlogCardProps) => {
  const { isAuthenticated } = useAuth();
  const postUrl = isAuthenticated ? `/member/post/${id}` : `/post/${id}`;

  return (
    <article className="flex flex-col gap-[16px] w-full cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-brown-300/20 active:scale-100">
      <Link
        to={postUrl}
        className="relative h-[212px] lg:h-[300px] xl:h-[360px] overflow-hidden rounded-[16px] group"
      >
        <img
          className="w-full h-full object-cover rounded-[16px] transition-transform duration-300 group-hover:scale-110"
          src={image}
          alt={title}
        />
      </Link>
      <div className="flex flex-col gap-[16px]">
        <div className="flex flex-col gap-[8px] items-start">
          <span className="bg-brand-green-light rounded-[999px] px-[12px] py-[4px] text-body-2 text-brand-green transition-all duration-200 hover:bg-brand-green hover:text-white cursor-default">
            {category}
          </span>
          <Link to={postUrl} className="w-full">
            <h2 className="text-start text-headline-4 text-brown-600 hover:underline transition-all duration-200 hover:text-brown-700">
              {title}
            </h2>
          </Link>
          <p className="text-body-2 text-brown-400 grow">{description}</p>
        </div>
        <div className="flex items-center gap-[16px] justify-start">
          <div className="flex items-center gap-[8px] transition-all duration-200 hover:opacity-80">
            <img
              src={authorLogo}
              alt={author}
              className="w-[24px] h-[24px] transition-transform duration-200 hover:scale-110"
            />
            <span className="text-body-2 text-brown-500">{author}</span>
          </div>
          <span className="text-brown-300">|</span>
          <span className="text-body-2 text-brown-400">{date}</span>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
