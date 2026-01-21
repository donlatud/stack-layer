import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import AdminLayout from "../../components/admin/AdminLayout";
import { Upload, X, Trash2 } from "lucide-react";
import BlackButton from "../../components/common/BlackButton";
import { Button } from "../../components/ui/button";

/**
 * CreateArticlePage component - Create or edit article page for admin
 * Desktop-only page with form for article creation/editing
 */
const CreateArticlePage = () => {
  const navigate = useNavigate();
  const { articleId } = useParams<{ articleId?: string }>();
  const isEditMode = !!articleId;

  // Form state
  const [thumbnailImage, setThumbnailImage] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("");
  const [category, setCategory] = useState("");
  const [authorName] = useState("Thompson P."); // Pre-filled, read-only
  const [title, setTitle] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [content, setContent] = useState("");

  // Load article data if in edit mode
  useEffect(() => {
    if (articleId) {
      // TODO: Replace with actual API call
      // For now, using mock data
      const mockArticle = {
        id: articleId,
        title: "The Fascinating World of Cats: Why We Love Our Furry Friends",
        category: "cat",
        authorName: "Thompson P.",
        introduction: "Cats have captivated human hearts for thousands of years. Whether lounging in a sunny spot or playfully chasing a string, these furry companions bring warmth and joy to millions of homes.",
        content: "##1. Independent, Yet Affectionate\n\nCats are known for their independent nature...",
        thumbnailUrl: "",
      };
      setTitle(mockArticle.title);
      setCategory(mockArticle.category);
      setIntroduction(mockArticle.introduction);
      setContent(mockArticle.content);
      if (mockArticle.thumbnailUrl) {
        setThumbnailPreview(mockArticle.thumbnailUrl);
      }
    }
  }, [articleId]);

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveThumbnail = () => {
    setThumbnailImage(null);
    setThumbnailPreview("");
  };

  const handleSaveAsDraft = () => {
    // TODO: Implement save as draft logic
    console.log("Save as draft", {
      thumbnailImage,
      category,
      authorName,
      title,
      introduction,
      content,
      status: "draft",
    });
    
    // Show success toast notification
    toast.success("Create article and saved as draft", {
      description: "You can publish article later",
      duration: 2000,
      className: "toast-success-custom",
    });
    
    navigate("/admin/article");
  };

  const handleSaveAndPublish = () => {
    // TODO: Implement save and publish logic
    console.log("Save and publish", {
      thumbnailImage,
      category,
      authorName,
      title,
      introduction,
      content,
      status: "published",
    });
    
    // Show success toast notification
    toast.success("Create article and published", {
      description: "Your article has been successfully published",
      duration: 2000,
      className: "toast-success-custom",
    });
    
    navigate("/admin/article");
  };

  const handleDelete = () => {
    navigate(`/admin/article/${articleId}/delete`);
  };

  const introductionLength = introduction.length;
  const maxIntroductionLength = 120;

  return (
    <AdminLayout activeItem="article">
      <section className="w-full h-full p-[40px]">
        <header className="flex items-center justify-between mb-[32px] pb-[24px] border-b border-gray-200">
          <h1 className="text-headline-3 text-brown-600">
            {isEditMode ? "Edit article" : "Create article"}
          </h1>
          <div className="flex items-center gap-[12px]">
            <Button
              type="button"
              variant="outline"
              className="h-[44px] w-[187px] px-[24px] rounded-[999px] border border-gray-300 bg-white text-brown-600 hover:bg-gray-50"
              onClick={handleSaveAsDraft}
            >
              Save as draft
            </Button>
            <BlackButton
              type="button"
              className="h-[44px] w-[210px] px-[24px]"
              onClick={handleSaveAndPublish}
            >
              {isEditMode ? "Save" : "Save and publish"}
            </BlackButton>
          </div>
        </header>

        <article className="bg-white rounded-[8px] border border-gray-200 p-[40px]">
          {/* Thumbnail Image */}
          <section className="mb-[32px]">
            <label htmlFor="thumbnail-image" className="block text-body-2 text-brown-600 mb-[12px]">
              Thumbnail image
            </label>
            <div className="flex items-start gap-[24px]">
              <div className="relative w-[200px] h-[150px] bg-gray-100 rounded-[8px] border border-gray-300 overflow-hidden flex items-center justify-center">
                {thumbnailPreview ? (
                  <>
                    <img
                      src={thumbnailPreview}
                      alt="Thumbnail preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveThumbnail}
                      className="absolute top-[8px] right-[8px] w-[24px] h-[24px] bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                      aria-label="Remove thumbnail"
                    >
                      <X className="w-[14px] h-[14px]" />
                    </button>
                  </>
                ) : (
                  <Upload className="w-[32px] h-[32px] text-gray-400" />
                )}
              </div>
              <div className="flex-1">
                <input
                  id="thumbnail-image"
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailUpload}
                  className="hidden"
                />
                <label htmlFor="thumbnail-image">
                  <Button
                    type="button"
                    variant="outline"
                    className="h-[44px] px-[24px] rounded-[8px] border border-gray-300 bg-white text-brown-600 hover:bg-gray-50 cursor-pointer"
                    asChild
                  >
                    <span>Upload thumbnail image</span>
                  </Button>
                </label>
              </div>
            </div>
          </section>

          {/* Category */}
          <section className="mb-[32px]">
            <label htmlFor="category" className="block text-body-2 text-brown-600 mb-[12px]">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-[44px] px-[16px] bg-white border border-gray-300 rounded-[8px] text-body-1 text-brown-600 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-brand-red"
            >
              <option value="">Select category</option>
              <option value="cat">Cat</option>
              <option value="dog">Dog</option>
              <option value="general">General</option>
              <option value="inspiration">Inspiration</option>
            </select>
          </section>

          {/* Author Name */}
          <section className="mb-[32px]">
            <label htmlFor="author-name" className="block text-body-2 text-brown-600 mb-[12px]">
              Author name
            </label>
            <input
              id="author-name"
              type="text"
              value={authorName}
              readOnly
              disabled
              className="w-full h-[44px] px-[16px] bg-gray-50 border border-gray-300 rounded-[8px] text-body-1 text-brown-400 cursor-not-allowed"
            />
          </section>

          {/* Title */}
          <section className="mb-[32px]">
            <label htmlFor="title" className="block text-body-2 text-brown-600 mb-[12px]">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Article title"
              className="w-full h-[44px] px-[16px] bg-white border border-gray-300 rounded-[8px] text-body-1 text-brown-600 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-brand-red"
            />
          </section>

          {/* Introduction */}
          <section className="mb-[32px]">
            <div className="flex items-center justify-between mb-[12px]">
              <label htmlFor="introduction" className="block text-body-2 text-brown-600">
                Introduction (max 120 letters)
              </label>
              <span
                className={`text-body-3 ${
                  introductionLength > maxIntroductionLength
                    ? "text-brand-red"
                    : "text-gray-400"
                }`}
              >
                {introductionLength}/{maxIntroductionLength}
              </span>
            </div>
            <textarea
              id="introduction"
              value={introduction}
              onChange={(e) => {
                if (e.target.value.length <= maxIntroductionLength) {
                  setIntroduction(e.target.value);
                }
              }}
              placeholder="Introduction"
              rows={4}
              className="w-full px-[16px] py-[12px] bg-white border border-gray-300 rounded-[8px] text-body-1 text-brown-600 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-brand-red resize-none"
            />
          </section>

          {/* Content */}
          <section className="mb-[32px]">
            <label htmlFor="content" className="block text-body-2 text-brown-600 mb-[12px]">
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Content"
              rows={20}
              className="w-full px-[16px] py-[12px] bg-white border border-gray-300 rounded-[8px] text-body-1 text-brown-600 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-brand-red resize-none"
            />
          </section>

          {/* Delete Article Button (only in edit mode) */}
          {isEditMode && (
            <section className="pt-[24px] border-t border-gray-200">
              <button
                type="button"
                onClick={handleDelete}
                className="flex items-center gap-[8px] text-body-1 text-brand-red hover:text-red-700 transition-colors"
              >
                <Trash2 className="w-[18px] h-[18px]" />
                Delete article
              </button>
            </section>
          )}
        </article>
      </section>
    </AdminLayout>
  );
};

export default CreateArticlePage;
