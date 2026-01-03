import authorLogo from "../../../assets/author-logo.svg";

interface BlogCardProps {
  image: string;
  category: string;
  title: string;
  description: string;
  author: string;
  date: string;
}

const BlogCard = ({
  image,
  category,
  title,
  description,
  author,
  date,
}: BlogCardProps) => {
  return (
    <div className="flex flex-col gap-[16px] w-full">
      <a href="#" className="relative h-[212px] lg:h-[360px]">
        <img
          className="w-full h-full object-cover rounded-[16px]"
          src={image}
          alt={title}
        />
      </a>
      <div className="flex flex-col gap-[16px]">
        <div className="flex flex-col gap-[8px] items-start">
          <span className="bg-brand-green-light rounded-[999px] px-[12px] py-[4px] text-body-2 text-brand-green ">
            {category}
          </span>
          <a href="#">
            <h2 className="text-start text-headline-4 text-brown-600 hover:underline">
              {title}
            </h2>
          </a>
          <p className="text-body-2 text-brown-400 grow">{description}</p>
        </div>
        <div className="flex items-center gap-[16px] justify-start">
          <div className="flex items-center gap-[8px]">
            <img
              src={authorLogo}
              alt={author}
              className="w-[24px] h-[24px]"
            />
            <span className="text-body-2 text-brown-500">{author}</span>
          </div>
          <span className="text-brown-300">|</span>
          <span className="text-body-2 text-brown-400">{date}</span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
