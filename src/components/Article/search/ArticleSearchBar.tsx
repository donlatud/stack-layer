import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const ArticleSearchBar = () => {
  return (
    <div className="relative w-full">
      <Input
        type="search"
        placeholder="Search"
        className="w-[343px] h-[48px] rounded-[8px] border-brown-300 bg-white text-brown-600 placeholder:text-brown-400 placeholder:text-body-1 placeholder:w-[57px] placeholder:h-[24px] placeholder:text-center focus-visible:ring-brown-400 lg:w-[360px] lg:pr-10 transition-all duration-200 hover:border-brown-400 hover:bg-brown-50 focus-visible:border-brown-500 focus-visible:bg-white cursor-text"
      />
      <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brown-400 pointer-events-none" />
    </div>
  );
};

export default ArticleSearchBar;

