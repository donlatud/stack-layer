import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { fetchPostById } from "../data/blogPosts";
import {
  createPost,
  createPostWithFile,
  updatePost,
  updatePostWithFile,
  toCreatePostBody,
  PLACEHOLDER_IMAGE,
} from "../data/postsApi";
import { fetchCategories } from "../data/categoriesApi";
import type { CategoryItem } from "../data/categoriesApi";
import { validateImageFile } from "../utils/fileValidation";

export const MAX_INTRODUCTION_LENGTH = 120;
const STATUS_PUBLISHED = 1;
const STATUS_DRAFT = 2;
const AUTHOR_NAME = "Thompson P.";

export interface UseCreateArticleReturn {
  thumbnailPreview: string;
  categories: CategoryItem[];
  categoryId: number | "";
  title: string;
  introduction: string;
  content: string;
  isLoading: boolean;
  isEditMode: boolean;
  introductionLength: number;
  maxIntroductionLength: number;
  authorName: string;
  onThumbnailUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveThumbnail: () => void;
  onCategoryChange: (value: number | "") => void;
  onTitleChange: (value: string) => void;
  onIntroductionChange: (value: string) => void;
  onContentChange: (value: string) => void;
  onSaveAsDraft: () => Promise<void>;
  onSaveAndPublish: () => Promise<void>;
  onDelete: () => void;
}

export function useCreateArticle(
  articleId: string | undefined
): UseCreateArticleReturn {
  const navigate = useNavigate();
  const isEditMode = !!articleId;

  const [thumbnailImage, setThumbnailImage] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [categoryId, setCategoryId] = useState<number | "">("");
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

  useEffect(() => {
    if (articleId && categories.length > 0) {
      const loadArticle = async () => {
        try {
          const article = await fetchPostById(articleId);
          if (article) {
            setTitle(article.title);
            if (article.category_id != null && categories.some((c) => c.id === article.category_id)) {
              setCategoryId(article.category_id);
            } else {
              const match = categories.find(
                (c) => c.name.toLowerCase() === article.category.toLowerCase()
              );
              setCategoryId(match ? match.id : "");
            }
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

  const validateForm = (): boolean => {
    if (categoryId === "" || categoryId === undefined) {
      toast.error("Please select a category");
      return false;
    }
    if (!title.trim()) {
      toast.error("Please enter a title");
      return false;
    }
    if (!isEditMode && !thumbnailImage && !thumbnailPreview) {
      toast.error("Please upload a thumbnail image");
      return false;
    }
    return true;
  };

  const handleSaveAsDraft = async () => {
    if (!validateForm()) return;
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
        categoryId as number,
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
    if (!validateForm()) return;
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
        categoryId as number,
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

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const { valid, errorMessage } = validateImageFile(file);
    if (!valid) {
      toast.error(errorMessage);
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

  return {
    thumbnailPreview,
    categories,
    categoryId,
    title,
    introduction,
    content,
    isLoading,
    isEditMode,
    introductionLength: introduction.length,
    maxIntroductionLength: MAX_INTRODUCTION_LENGTH,
    authorName: AUTHOR_NAME,
    onThumbnailUpload: handleThumbnailUpload,
    onRemoveThumbnail: handleRemoveThumbnail,
    onCategoryChange: setCategoryId,
    onTitleChange: setTitle,
    onIntroductionChange: setIntroduction,
    onContentChange: setContent,
    onSaveAsDraft: handleSaveAsDraft,
    onSaveAndPublish: handleSaveAndPublish,
    onDelete: () => navigate(`/admin/article/${articleId}/delete`),
  };
}
