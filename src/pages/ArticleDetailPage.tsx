import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";
import { useAuth } from "../contexts/AuthContext";
import { useRedirectWhenAuthenticated } from "../hooks";
import { fetchPostById } from "../data/blogPosts";
import { fetchComments } from "../data/commentsApi";
import type { CommentItem } from "../data/commentsApi";
import type { BlogPost } from "../types/blog";
import ArticleHeader from "../components/Article/detail/ArticleHeader";
import ArticleMeta from "../components/Article/detail/ArticleMeta";
import ArticleContent from "../components/Article/detail/ArticleContent";
import ArticleAuthorCard from "../components/Article/detail/ArticleAuthorCard";
import ArticleLikeAndShare from "../components/Article/detail/ArticleLikeAndShare";
import ArticleCommentSection from "../components/Article/detail/ArticleCommentSection";
import LoginRequiredDialog from "../components/common/LoginRequiredDialog";
import { LoadingMessage } from "../components/common/LoadingMessage";
import { copyLinkToClipboard } from "../utils/clipboardUtils";

/**
 * หน้ารายละเอียดบทความ (path /post/:postId)
 * ดึงบทความจาก GET /posts/:postId
 * ถ้าล็อกอินแล้วจะ redirect ไป /member/post/:postId
 */
const ArticleDetailPage = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<BlogPost | null>(null);
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const isLoggedIn = isAuthenticated;

  useRedirectWhenAuthenticated(postId ? `/member/post/${postId}` : "");

  useEffect(() => {
    const loadArticle = async () => {
      setIsLoading(true);
      setError(null);

      if (!postId) {
        setError("Invalid article ID");
        setIsLoading(false);
        return;
      }

      try {
        const foundArticle = await fetchPostById(postId);

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
  }, [postId, navigate]);

  useEffect(() => {
    if (!postId) return;
    const loadComments = async () => {
      try {
        const list = await fetchComments(postId);
        setComments(list);
      } catch (err) {
        console.error("Error loading comments:", err);
      }
    };
    loadComments();
  }, [postId]);

  const handleCopyLink = async () => {
    await copyLinkToClipboard(window.location.href);
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const encodedUrl = encodeURIComponent(url);

    let shareUrl = "";
    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/share.php?u=${encodedUrl}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case "twitter":
        shareUrl = `https://www.twitter.com/share?&url=${encodedUrl}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, "_blank", "width=600,height=400");
  };

  const requireLogin = () => {
    setIsLoginDialogOpen(true);
  };

  // If article not found or error, show message
  if (isLoading) {
    return (
      <div className="w-full min-h-screen font-family-poppins flex flex-col">
        <NavBar />
        <div className="flex-1 flex justify-center items-center">
          <LoadingMessage />
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


  // Don't render if authenticated (will redirect to member version)
  if (!isLoading && isAuthenticated) {
    return null;
  }

  return (
    <div className="w-full min-h-screen font-family-poppins flex flex-col">
      <NavBar />
      <LoginRequiredDialog
        open={isLoginDialogOpen}
        onClose={() => setIsLoginDialogOpen(false)}
        onCreateAccountClick={() => {
          setIsLoginDialogOpen(false);
          navigate("/signup");
        }}
        onLoginClick={() => {
          setIsLoginDialogOpen(false);
          navigate("/login");
        }}
      />

      <article className="w-full flex-1">
        {/* Back Button + Image */}
        <ArticleHeader article={article} />

        {/* Mobile/MD Layout: Single column */}
        {/* LG Layout: Two columns - Main content (left) + Author sidebar (right) */}
        {/* Reduced padding for 1024px-1100px range to accommodate 80px gap */}
        <div className="w-full px-[16px] md:px-[40px] lg:px-[60px] xl:px-[120px]">
          <div className="w-full max-w-[1200px] mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-start lg:gap-[80px]">
              {/* Main Content Column */}
              <div className="flex-1 lg:max-w-[calc(100%-352px)]">
                {/* Meta: Category, Date, Title, Description */}
                <div className="pb-[24px] md:pb-[32px]">
                  <ArticleMeta article={article} />
                </div>

                {/* Article Markdown Content */}
                <div className="pb-[40px] md:pb-[50px] lg:pb-[40px]">
                  <ArticleContent article={article} />
                </div>

                {/* Author Card - Mobile/MD only (hidden on lg) */}
                <div className="lg:hidden pb-[40px] md:pb-[50px]">
                  <div className="p-[24px] md:p-[28px] bg-brown-200 rounded-[16px]">
                    <ArticleAuthorCard />
                  </div>
                </div>

                {/* Like/Share Section - Inside main content column for LG */}
                {/* Mobile/MD: Hidden here (shown as full width section below) */}
                {/* LG: Shown here as part of main content */}
                <div className="hidden lg:block pb-[40px]">
                  <div className="bg-brown-200 rounded-[16px] p-[24px]">
                    <ArticleLikeAndShare
                      article={article}
                      onLike={() => {
                        if (!isLoggedIn) return requireLogin();
                      }}
                      onCopyLink={handleCopyLink}
                      onShare={handleShare}
                    />
                  </div>
                </div>

                {/* Comment Section - Inside main content column for LG */}
                {/* Mobile/MD: Hidden here (shown as full width section below) */}
                {/* LG: Shown here as part of main content */}
                <div className="hidden lg:block pb-[60px]">
                  <ArticleCommentSection
                    comments={comments}
                    disabled={!isLoggedIn}
                    onRequireLogin={requireLogin}
                  />
                </div>
              </div>

              {/* Author Sidebar - LG only (hidden on mobile/md) */}
              <aside className="hidden lg:block lg:w-[320px] lg:shrink-0 lg:sticky lg:top-[100px] lg:self-start lg:h-fit">
                <div className="p-[24px] md:p-[28px] bg-brown-200 rounded-[16px]">
                  <ArticleAuthorCard />
                </div>
              </aside>
            </div>
          </div>
        </div>

        {/* Like/Share Section - Mobile/MD only (full width) */}
        {/* LG: Hidden here (shown inside main content column above) */}
        <section className="w-full bg-brown-200 lg:hidden">
          <div className="px-[16px] py-[16px] md:px-[40px] md:py-[24px]">
            <div className="w-full max-w-[1200px] mx-auto">
              <ArticleLikeAndShare
                article={article}
                onLike={() => {
                  if (!isLoggedIn) return requireLogin();
                }}
                onCopyLink={handleCopyLink}
                onShare={handleShare}
              />
            </div>
          </div>
        </section>

        {/* Comment Section - Mobile/MD only (full width) */}
        {/* LG: Hidden here (shown inside main content column above) */}
        <section className="w-full bg-brown-50 lg:hidden">
          <div className="px-[16px] pt-[24px] pb-[40px] md:px-[40px] md:pt-[40px] md:pb-[50px]">
            <div className="w-full max-w-[800px] mx-auto">
              <ArticleCommentSection
                comments={comments}
                disabled={!isLoggedIn}
                onRequireLogin={requireLogin}
              />
            </div>
          </div>
        </section>
      </article>

      <Footer />
    </div>
  );
};

export default ArticleDetailPage;
