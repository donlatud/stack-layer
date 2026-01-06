/**
 * ArticleHeader component - Section header for article listing
 * Displays "Latest articles" title with responsive typography
 */
const ArticleHeader = () => {
  return (
    <div className="w-full px-[16px]">
      <div className="text-headline-3 text-brown-600 lg:text-headline-2">
        Latest articles
      </div>
    </div>
  );
};

export default ArticleHeader;

