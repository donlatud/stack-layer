import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useRequireAuth } from "../hooks";
import MemberNavBar from "../components/layout/MemberNavBar";
import Footer from "../components/layout/Footer";
import { fetchPostById } from "../data/blogPosts";
import { addLike as addLikeApi, removeLike as removeLikeApi } from "../data/likesApi";
import {
  fetchComments,
  createComment,
  deleteComment,
  type CommentItem,
} from "../data/commentsApi";
import type { BlogPost } from "../types/blog";
import ArticleHeader from "../components/Article/detail/ArticleHeader";
import ArticleMeta from "../components/Article/detail/ArticleMeta";
import ArticleContent from "../components/Article/detail/ArticleContent";
import ArticleAuthorCard from "../components/Article/detail/ArticleAuthorCard";
import ArticleLikeAndShare from "../components/Article/detail/ArticleLikeAndShare";
import ArticleCommentSection from "../components/Article/detail/ArticleCommentSection";
import { copyLinkToClipboard } from "../utils/clipboardUtils";
import { LoadingMessage } from "../components/common/LoadingMessage";

/**
 * หน้ารายละเอียดบทความสำหรับสมาชิก (/member/post/:postId)
 * ใช้ MemberNavBar; Like เก็บใน API (POST/DELETE /posts/:postId/like); ต้องล็อกอิน
 */
const MemberArticleDetailPage = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isReady } = useRequireAuth({ redirectTo: "/", replace: true });
  const [article, setArticle] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isLikeLoading, setIsLikeLoading] = useState<boolean>(false);
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [commentValue, setCommentValue] = useState("");
  const [isSendingComment, setIsSendingComment] = useState(false);

  useEffect(() => {
    if (!isReady || !postId) return;
    const loadArticle = async () => {
      setIsLoading(true);
      setError(null);

      if (!postId) {
        setError("Invalid article ID");
        setIsLoading(false);
        return;
      }

      const targetId = parseInt(postId, 10);
      if (isNaN(targetId)) {
        setError("Invalid article ID");
        setIsLoading(false);
        return;
      }

      try {
        const foundArticle = await fetchPostById(postId);

        if (!foundArticle) {
          setError("Article not found");
          setTimeout(() => navigate("/member"), 2000);
          return;
        }

        setArticle(foundArticle);
        setLikeCount(foundArticle.likes ?? 0);
        setIsLiked(foundArticle.is_liked ?? false);
      } catch (err) {
        console.error("Error loading article:", err);
        setError("Failed to load article. Please try again later.");
        setTimeout(() => navigate("/member"), 2000);
      } finally {
        setIsLoading(false);
      }
    };

    loadArticle();
  }, [postId, navigate, isReady]);

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

  const handleSendComment = async (text: string) => {
    if (!postId) return;
    setIsSendingComment(true);
    try {
      const newComment = await createComment(postId, text);
      setComments((prev) => [...prev, newComment]);
      setCommentValue("");
    } catch (err) {
      console.error("Error sending comment:", err);
    } finally {
      setIsSendingComment(false);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      await deleteComment(commentId);
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };

  // Function to copy article link to clipboard
  const handleCopyLink = async () => {
    const currentUrl = window.location.href;
    await copyLinkToClipboard(currentUrl);
  };

  // Toggle like/unlike via API
  const handleLike = async () => {
    if (!postId || isLikeLoading) return;
    setIsLikeLoading(true);
    try {
      const res = isLiked
        ? await removeLikeApi(postId)
        : await addLikeApi(postId);
      setLikeCount(res.likes_count);
      setIsLiked(res.is_liked);
    } catch (err) {
      console.error("Error toggling like:", err);
    } finally {
      setIsLikeLoading(false);
    }
  };

  // Function to share on social media
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

  if (!isReady) {
    return null;
  }

  // If article not found or error, show message
  if (isLoading) {
    return (
      <div className="w-full min-h-screen font-family-poppins flex flex-col">
        <MemberNavBar />
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
        <MemberNavBar />
        <div className="flex-1 flex justify-center items-center">
          <p className="text-body-1 text-brand-red">
            {error || "Article not found"}
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen font-family-poppins flex flex-col">
      <MemberNavBar />

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
                      article={{ ...article, likes: likeCount }}
                      isLiked={isLiked}
                      onLike={handleLike}
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
                    commentValue={commentValue}
                    onCommentChange={setCommentValue}
                    onSendComment={handleSendComment}
                    onDeleteComment={handleDeleteComment}
                    currentUserId={user?.id ?? null}
                    isSendingComment={isSendingComment}
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
                article={{ ...article, likes: likeCount }}
                isLiked={isLiked}
                onLike={handleLike}
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
                commentValue={commentValue}
                onCommentChange={setCommentValue}
                onSendComment={handleSendComment}
                onDeleteComment={handleDeleteComment}
                currentUserId={user?.id ?? null}
                isSendingComment={isSendingComment}
              />
            </div>
          </div>
        </section>
      </article>

      <Footer />
    </div>
  );
};

export default MemberArticleDetailPage;
