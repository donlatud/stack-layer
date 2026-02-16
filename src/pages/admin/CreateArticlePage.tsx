import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import AdminLayout from "../../components/admin/AdminLayout";
import { Upload, X, Trash2 } from "lucide-react";
import BlackButton from "../../components/common/BlackButton";
import { Button } from "../../components/ui/button";
import { cn } from "../../lib/utils";
import { fetchPostById } from "../../data/blogPosts";
import {
  createPost,
  createPostWithFile,
  updatePost,
  updatePostWithFile,
  toCreatePostBody,
  PLACEHOLDER_IMAGE,
} from "../../data/postsApi";
import { fetchCategories } from "../../data/categoriesApi";
import type { CategoryItem } from "../../data/categoriesApi";

const MAX_INTRODUCTION_LENGTH = 120;
const STATUS_PUBLISHED = 1;
const STATUS_DRAFT = 2;

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];
const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

/**
 * หน้าสร้าง/แก้ไขบทความ (Admin)
 * - Create: /admin/article/create
 * - Edit: /admin/article/:articleId/edit
 * - Thumbnail, หมวดหมู่, ชื่อผู้เขียน (read-only), หัวเรื่อง, บทนำ (max 120 ตัวอักษร), เนื้อหา
 * - ปุ่ม Save as draft / Save and publish; โหมดแก้ไขมีปุ่ม Delete article
 */
const CreateArticlePage = () => {
  const navigate = useNavigate();
  const { articleId } = useParams<{ articleId?: string }>();
  const isEditMode = !!articleId;

  const [thumbnailImage, setThumbnailImage] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [categoryId, setCategoryId] = useState<number | "">("");
  const [authorName] = useState("Thompson P."); // คงที่ โหมดอ่านอย่างเดียว
  const [title, setTitle] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        console.error("Error loading categories:", err);
        toast.error("Failed to load categories");
      }
    };
    loadCategories();
  }, []);

  // โหลดข้อมูลบทความเมื่อเป็นโหมดแก้ไข
  useEffect(() => {
    if (articleId && categories.length > 0) {
      const loadArticle = async () => {
        try {
          const article = await fetchPostById(articleId);
          if (article) {
            setTitle(article.title);
            const match = categories.find(
              (c) => c.name.toLowerCase() === article.category.toLowerCase()
            );
            setCategoryId(match ? match.id : "");
            setIntroduction(article.description);
            setContent(article.content);
            setImageUrl(article.image);
            setThumbnailPreview(article.image);
          }
        } catch (err) {
          console.error("Error loading article:", err);
          toast.error("Failed to load article");
        }
      };
      loadArticle();
    }
  }, [articleId, categories.length]);

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      toast.error("Please upload a valid image (JPEG, PNG, GIF, WebP).");
      return;
    }
    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      toast.error("Image must be smaller than 5MB.");
      return;
    }
    setThumbnailImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setThumbnailPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveThumbnail = () => {
    setThumbnailImage(null);
    setThumbnailPreview("");
    setImageUrl("");
  };

  const getEffectiveImageUrl = (): string => {
    if (imageUrl.trim()) return imageUrl.trim();
    if (thumbnailPreview.startsWith("http")) return thumbnailPreview;
    return PLACEHOLDER_IMAGE;
  };

  const buildFormData = (statusId: number): FormData => {
    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("category_id", String(categoryId));
    formData.append("description", introduction.trim());
    formData.append("content", content.trim());
    formData.append("status_id", String(statusId));
    formData.append("imageFile", thumbnailImage as File);
    return formData;
  };

  const handleSaveAsDraft = async () => {
    if (categoryId === "" || categoryId === undefined) {
      toast.error("Please select a category");
      return;
    }
    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }
    const isCreateWithFile = !isEditMode && thumbnailImage;
    const isEditWithFile = isEditMode && articleId && thumbnailImage;
    if (isCreateWithFile || isEditWithFile) {
      setIsLoading(true);
      try {
        const formData = buildFormData(STATUS_DRAFT);
        if (isEditWithFile) {
          await updatePostWithFile(articleId, formData);
          toast.success("Article saved as draft");
        } else {
          await createPostWithFile(formData);
          toast.success("Create article and saved as draft", {
            description: "You can publish article later",
            duration: 2000,
            className: "toast-success-custom",
          });
        }
        navigate("/admin/article");
      } catch (err) {
        console.error("Error saving article:", err);
        toast.error("Failed to save article");
      } finally {
        setIsLoading(false);
      }
      return;
    }
    try {
      const body = toCreatePostBody(
        title.trim(),
        getEffectiveImageUrl(),
        categoryId,
        introduction.trim(),
        content.trim(),
        STATUS_DRAFT
      );
      if (isEditMode && articleId) {
        await updatePost(articleId, body);
        toast.success("Article saved as draft");
      } else {
        await createPost(body);
        toast.success("Create article and saved as draft", {
          description: "You can publish article later",
          duration: 2000,
          className: "toast-success-custom",
        });
      }
      navigate("/admin/article");
    } catch (err) {
      console.error("Error saving article:", err);
      toast.error("Failed to save article");
    }
  };

  const handleSaveAndPublish = async () => {
    if (categoryId === "" || categoryId === undefined) {
      toast.error("Please select a category");
      return;
    }
    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }
    const isCreateWithFile = !isEditMode && thumbnailImage;
    const isEditWithFile = isEditMode && articleId && thumbnailImage;
    if (isCreateWithFile || isEditWithFile) {
      setIsLoading(true);
      try {
        const formData = buildFormData(STATUS_PUBLISHED);
        if (isEditWithFile) {
          await updatePostWithFile(articleId, formData);
          toast.success("Article updated and published");
        } else {
          await createPostWithFile(formData);
          toast.success("Create article and published", {
            description: "Your article has been successfully published",
            duration: 2000,
            className: "toast-success-custom",
          });
        }
        navigate("/admin/article");
      } catch (err) {
        console.error("Error saving article:", err);
        toast.error("Failed to save article");
      } finally {
        setIsLoading(false);
      }
      return;
    }
    try {
      const body = toCreatePostBody(
        title.trim(),
        getEffectiveImageUrl(),
        categoryId,
        introduction.trim(),
        content.trim(),
        STATUS_PUBLISHED
      );
      if (isEditMode && articleId) {
        await updatePost(articleId, body);
        toast.success("Article updated and published");
      } else {
        await createPost(body);
        toast.success("Create article and published", {
          description: "Your article has been successfully published",
          duration: 2000,
          className: "toast-success-custom",
        });
      }
      navigate("/admin/article");
    } catch (err) {
      console.error("Error saving article:", err);
      toast.error("Failed to save article");
    }
  };

  const handleDelete = () => navigate(`/admin/article/${articleId}/delete`);

  const introductionLength = introduction.length;

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
              className="h-[44px] w-[187px] px-[24px] rounded-[999px] border border-gray-300 bg-white text-brown-600 hover:bg-gray-50 disabled:opacity-50"
              onClick={handleSaveAsDraft}
              disabled={isLoading}
            >
              Save as draft
            </Button>
            <BlackButton
              type="button"
              className="h-[44px] w-[210px] px-[24px] disabled:opacity-50"
              onClick={handleSaveAndPublish}
              disabled={isLoading}
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
              <div className="relative w-[300px] h-[300px] bg-gray-100 rounded-[8px] border border-gray-300 overflow-hidden flex items-center justify-center">
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
              <div className="flex-1 flex flex-col gap-[12px]">
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
                {!isEditMode && (
                  <div>
                    <label htmlFor="image-url" className="block text-body-3 text-gray-600 mb-[4px]">
                      Or paste image URL
                    </label>
                    <input
                      id="image-url"
                      type="url"
                      value={imageUrl}
                      onChange={(e) => {
                        setImageUrl(e.target.value);
                        if (e.target.value && e.target.value.startsWith("http")) {
                          setThumbnailPreview(e.target.value);
                        }
                      }}
                      placeholder="https://..."
                      className="w-full h-[40px] px-[12px] bg-white border border-gray-300 rounded-[8px] text-body-2 text-brown-600 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-brand-red"
                    />
                  </div>
                )}
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
              value={categoryId === "" ? "" : categoryId}
              onChange={(e) =>
                setCategoryId(e.target.value === "" ? "" : Number(e.target.value))
              }
              className="w-[30%] h-[44px] px-[16px] bg-white border border-gray-300 rounded-[8px] text-body-1 text-brown-600 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-brand-red"
            >
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
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

          {/* Introduction — จำกัดไม่เกิน MAX_INTRODUCTION_LENGTH ตัวอักษร */}
          <section className="mb-[32px]">
            <div className="flex items-center justify-between mb-[12px]">
              <label htmlFor="introduction" className="block text-body-2 text-brown-600">
                Introduction (max 120 letters)
              </label>
              <span
                className={cn(
                  "text-body-3",
                  introductionLength > MAX_INTRODUCTION_LENGTH
                    ? "text-brand-red"
                    : "text-gray-400"
                )}
              >
                {introductionLength}/{MAX_INTRODUCTION_LENGTH}
              </span>
            </div>
            <textarea
              id="introduction"
              value={introduction}
              onChange={(e) => {
                if (e.target.value.length <= MAX_INTRODUCTION_LENGTH) {
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
