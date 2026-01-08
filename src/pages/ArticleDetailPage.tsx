import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; // เพิ่ม import นี้
import NavBar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";
import { blogPosts } from "../data/blogPosts";

/**
 * ArticleDetailPage component - Displays full article content
 * Fetches article by ID from URL parameter
 */
const ArticleDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Find article by ID
  const article = blogPosts.find((post) => post.id === parseInt(id || "0", 10));

  // If article not found, redirect to home
  if (!article) {
    navigate("/");
    return null;
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
