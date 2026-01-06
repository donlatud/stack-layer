import { useState } from "react";
import { CATEGORIES } from "../../../constants/categories";

const ArticleFilterButtons = () => {
  const [selectedFilter, setSelectedFilter] = useState("Highlight");

  return (
    <div className="hidden lg:flex lg:gap-2">
      {CATEGORIES.map((category) => (
        <button
          key={category}
          onClick={() => setSelectedFilter(category)}
          className={`px-4 py-2 rounded-md text-body-1 font-medium transition-all duration-300 border cursor-pointer ${
            selectedFilter === category
              ? "bg-brown-300 text-brown-600 border-brown-300 shadow-sm scale-105"
              : "bg-white text-brown-600 border-brown-300 hover:bg-brown-100 hover:border-brown-400 hover:shadow-md hover:shadow-brown-300/20 hover:scale-105 hover:-translate-y-0.5 active:scale-100 active:translate-y-0"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default ArticleFilterButtons;

