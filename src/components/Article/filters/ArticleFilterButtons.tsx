import { useState } from "react";

const ArticleFilterButtons = () => {
  const [selectedFilter, setSelectedFilter] = useState("highlight");

  const filters = [
    { id: "highlight", label: "Highlight" },
    { id: "cat", label: "Cat" },
    { id: "inspiration", label: "Inspiration" },
    { id: "research", label: "Research" },
  ];

  return (
    <div className="hidden lg:flex lg:gap-2">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => setSelectedFilter(filter.id)}
          className={`px-4 py-2 rounded-md text-body-1 font-medium transition-all duration-300 border cursor-pointer ${
            selectedFilter === filter.id
              ? "bg-brown-300 text-brown-600 border-brown-300 shadow-sm scale-105"
              : "bg-white text-brown-600 border-brown-300 hover:bg-brown-100 hover:border-brown-400 hover:shadow-md hover:shadow-brown-300/20 hover:scale-105 hover:-translate-y-0.5 active:scale-100 active:translate-y-0"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default ArticleFilterButtons;

