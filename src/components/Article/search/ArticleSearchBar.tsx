import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface ArticleSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

/**
 * ArticleSearchBar component - Search input for filtering articles
 * Controlled component that searches article titles and descriptions
 * Includes search icon with hover effects
 */
const ArticleSearchBar = ({ value, onChange }: ArticleSearchBarProps) => {
  return (
    <div className="relative w-full group">
      <Input
        type="search"
        placeholder="Search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-[48px] rounded-[8px] border-brown-300 bg-white text-brown-600 placeholder:text-brown-400 placeholder:text-body-1 placeholder:w-[57px] placeholder:h-[24px] placeholder:text-center focus-visible:ring-brown-400 md:w-full lg:w-full xl:w-full lg:pr-10 transition-all duration-300 hover:border-brown-400 hover:bg-brown-50 hover:shadow-sm hover:shadow-brown-300/20 focus-visible:border-brown-500 focus-visible:bg-white focus-visible:shadow-md focus-visible:shadow-brown-300/30 cursor-text"
      />
      <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brown-400 pointer-events-none transition-all duration-300 group-hover:text-brown-500 group-focus-within:text-brown-600 group-focus-within:scale-110" />
    </div>
  );
};

export default ArticleSearchBar;
