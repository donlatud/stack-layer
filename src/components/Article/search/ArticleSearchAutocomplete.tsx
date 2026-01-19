import { Link } from "react-router-dom";
import type { BlogPost } from "../../../types/blog";

interface ArticleSearchAutocompleteProps {
  posts: BlogPost[];
  searchQuery: string;
  onSelect: () => void;
}

/**
 * ArticleSearchAutocomplete component - Dropdown list of search results
 * Displays filtered articles that match the search query
 * Navigates to article detail page when clicked
 * Limits results to 6 items for better UX
 */
const ArticleSearchAutocomplete = ({
  posts,
  searchQuery,
  onSelect,
}: ArticleSearchAutocompleteProps) => {
  if (!searchQuery.trim() || posts.length === 0) return null;

  // Limit to 6 results for better UX
  const displayPosts = posts.slice(0, 6);

  return (
    <div className="absolute top-full left-0 right-0 mt-[4px] bg-white border border-brown-300 rounded-[8px] shadow-lg z-50 max-h-[400px] overflow-y-auto">
      <ul className="flex flex-col">
        {displayPosts.map((post) => (
          <li key={post.id}>
            <Link
              to={`/post/${post.id}`}
              onClick={onSelect}
              className="block px-[16px] py-[12px] hover:bg-brown-200 transition-colors cursor-pointer"
            >
              <h3 className="text-body-1 text-brown-600 font-medium line-clamp-1">
                {post.title}
              </h3>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticleSearchAutocomplete;
