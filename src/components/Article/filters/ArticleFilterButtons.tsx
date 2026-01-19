import { CATEGORIES } from "../../../constants/categories";

interface ArticleFilterButtonsProps {
  selectedCategory: string;
  onChangeCategory: (category: string) => void;
}

/**
 * Gets className for filter button based on selection state
 */
const getButtonClassName = (isSelected: boolean): string => {
  const baseClasses =
    "px-4 py-2 rounded-md text-body-1 font-medium transition-all duration-300 border";

  if (isSelected) {
    return `${baseClasses} bg-brown-300 text-brown-600 border-brown-300 shadow-sm scale-105 cursor-not-allowed`;
  }

  return `${baseClasses} bg-white text-brown-600 border-brown-300 hover:bg-brown-100 hover:border-brown-400 hover:shadow-md hover:shadow-brown-300/20 hover:scale-105 hover:-translate-y-0.5 active:scale-100 active:translate-y-0 cursor-pointer`;
};

/**
 * ArticleFilterButtons component - Category filter buttons for desktop view
 * Renders filter buttons for each category
 * Highlights the selected category button
 */
const ArticleFilterButtons = ({
  selectedCategory,
  onChangeCategory,
}: ArticleFilterButtonsProps) => {
  return (
    <div className="hidden lg:flex lg:gap-2">
      {CATEGORIES.map((category) => (
        <button
          key={category}
          onClick={() => onChangeCategory(category)}
          disabled={selectedCategory === category}
          className={getButtonClassName(selectedCategory === category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default ArticleFilterButtons;
