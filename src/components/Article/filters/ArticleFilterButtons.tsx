import { CATEGORIES } from "../../../constants/categories";
import { cn } from "@/lib/utils";

interface ArticleFilterButtonsProps {
  selectedCategory: string;
  onChangeCategory: (category: string) => void;
}

const FILTER_BASE =
  "px-4 py-2 rounded-md text-body-1 font-medium transition-all duration-300 border";

/**
 * ปุ่มกรองหมวดหมู่ (แสดงในเดสก์ท็อป lg+; ซ่อนในมือถือ)
 * ปุ่มที่เลือกอยู่จะถูก disabled และไฮไลต์
 */
const ArticleFilterButtons = ({
  selectedCategory,
  onChangeCategory,
}: ArticleFilterButtonsProps) => {
  return (
    <div className="hidden lg:flex lg:gap-2">
      {CATEGORIES.map((category) => {
        const isSelected = selectedCategory === category;
        return (
          <button
            key={category}
            type="button"
            onClick={() => onChangeCategory(category)}
            disabled={isSelected}
            className={cn(
              FILTER_BASE,
              isSelected
                ? "bg-brown-300 text-brown-600 border-brown-300 shadow-sm scale-105 cursor-not-allowed"
                : "bg-white text-brown-600 border-brown-300 hover:bg-brown-100 hover:border-brown-400 hover:shadow-md hover:shadow-brown-300/20 hover:scale-105 hover:-translate-y-0.5 active:scale-100 active:translate-y-0 cursor-pointer"
            )}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
};

export default ArticleFilterButtons;
