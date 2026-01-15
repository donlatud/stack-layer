import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import NavBar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";
import { fetchBlogPosts } from "../data/blogPosts";
import { buildApiParams } from "../utils/blogUtils";
import { DEFAULT_PAGE } from "../constants/pagination";
import type { BlogPost } from "../types/blog";

/**
 * ArticleDetailPage component - Displays full article content
 * Fetches article by ID from URL parameter
 * Searches through all pages if necessary to find the article
 */
const ArticleDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadArticle = async () => {
      setIsLoading(true);
      setError(null);

      if (!id) {
        setError("Invalid article ID");
        setIsLoading(false);
        return;
      }

      const targetId = parseInt(id, 10);
      if (isNaN(targetId)) {
        setError("Invalid article ID");
        setIsLoading(false);
        return;
      }

      try {
        let currentPage = DEFAULT_PAGE;
        let foundArticle: BlogPost | null = null;
        let hasMorePages = true;

        // Search through all pages until we find the article
        while (hasMorePages && !foundArticle) {
          const params = buildApiParams(currentPage, "Highlight");
          const response = await fetchBlogPosts(params);

          // Check if article exists in current page
          foundArticle =
            response.posts.find((post) => post.id === targetId) || null;

          if (foundArticle) {
            break;
          }

          // Check if there are more pages to search
          hasMorePages =
            response.nextPage !== null &&
            response.currentPage < response.totalPages;

          if (hasMorePages) {
            currentPage = response.nextPage!;
          }
        }

        if (!foundArticle) {
          setError("Article not found");
          setTimeout(() => navigate("/"), 2000);
          return;
        }

        setArticle(foundArticle);
      } catch (err) {
        console.error("Error loading article:", err);
        setError("Failed to load article. Please try again later.");
        setTimeout(() => navigate("/"), 2000);
      } finally {
        setIsLoading(false);
      }
    };

    loadArticle();
  }, [id, navigate]);

  // If article not found or error, show message
  if (isLoading) {
    return (
      <div className="w-full min-h-screen font-family-poppins flex flex-col">
        <NavBar />
        <div className="flex-1 flex justify-center items-center">
          <p className="text-body-1 text-brown-400">Loading...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="w-full min-h-screen font-family-poppins flex flex-col">
        <NavBar />
        <div className="flex-1 flex justify-center items-center">
          <p className="text-body-1 text-brand-red">
            {error || "Article not found"}
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  // Parse content (assuming markdown-like format with ## headings)
  const parseContent = (content: string) => {
    const sections = content.split("## ").filter(Boolean);
    return sections.map((section, index) => {
      const lines = section.split("\n").filter(Boolean);
      const heading = lines[0];
      const paragraphs = lines.slice(1);
      return { heading, paragraphs, key: index };
    });
  };

  const contentSections = parseContent(article.content);

  return (
    <div className="w-full min-h-screen font-family-poppins flex flex-col">
      <NavBar />

      <article className="w-full flex-1">
        {/* Article Header */}
        <section className="w-full pt-[40px] pr-[16px] pb-[40px] pl-[16px] md:pt-[50px] md:pr-[40px] md:pb-[50px] md:pl-[40px] lg:pt-[60px] lg:pr-[120px] lg:pb-[60px] lg:pl-[120px]">
          <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-[24px]">
            {/* Back Button */}
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-[8px] text-body-1 text-brown-600 hover:text-brown-700 transition-colors self-start mb-[8px]"
            >
              <ArrowLeft className="w-[20px] h-[20px]" />
              <span>Back to Articles</span>
            </button>

            {/* Article Image */}
            <div className="w-full h-[212px] md:h-[400px] lg:h-[500px] xl:h-[600px] overflow-hidden rounded-[16px]">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Article Meta */}
            <div className="flex flex-col gap-[16px]">
              <div className="flex items-center gap-[16px] flex-wrap">
                <span className="bg-brand-green-light rounded-[999px] px-[12px] py-[4px] text-body-2 text-brand-green">
                  {article.category}
                </span>
                <span className="text-body-2 text-brown-400">
                  {article.date}
                </span>
              </div>

              {/* Article Title */}
              <h1 className="text-headline-2 md:text-headline-1 text-brown-600">
                {article.title}
              </h1>

              {/* Article Description */}
              <p className="text-body-1 text-brown-400">
                {article.description}
              </p>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="w-full pt-0 pr-[16px] pb-[40px] pl-[16px] md:pr-[40px] md:pl-[40px] lg:pr-[120px] lg:pb-[60px] lg:pl-[120px]">
          <div className="w-full max-w-[800px] mx-auto flex flex-col gap-[32px]">
            {contentSections.map((section) => (
              <div key={section.key} className="flex flex-col gap-[16px]">
                <h2 className="text-headline-3 text-brown-600">
                  {section.heading}
                </h2>
                {section.paragraphs.map((paragraph, pIndex) => (
                  <p
                    key={pIndex}
                    className="text-body-1 text-brown-500 leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </section>
      </article>

      <Footer />
    </div>
  );
};

export default ArticleDetailPage;
