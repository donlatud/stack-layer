import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORIES } from "../../../constants/categories";

interface ArticleCategoryFilterProps {
  selectedCategory: string;
  onChangeCategory: (category: string) => void;
}

/**
 * ArticleCategoryFilter component - Category dropdown filter for mobile view
 * Uses Select component from shadcn/ui
 * Allows users to filter articles by category
 */
const ArticleCategoryFilter = ({
  selectedCategory,
  onChangeCategory,
}: ArticleCategoryFilterProps) => {

  return (
    <div className="flex flex-col gap-1 rounded-[8px] lg:hidden">
      <label className="text-body-1 text-brown-400 ">Category</label>
      <Select
        value={selectedCategory}
        onValueChange={(value) => onChangeCategory(value)}
      >
        <SelectTrigger className="w-[343px] h-[48px] border-brown-300 bg-white text-brown-400 focus:ring-brown-400 cursor-pointer transition-all duration-200 hover:border-brown-400 hover:bg-brown-50 active:scale-[0.98]">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          {CATEGORIES.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ArticleCategoryFilter;

