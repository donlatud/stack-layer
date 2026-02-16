import { useParams } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import { ArticleThumbnailField } from "../../components/admin/ArticleThumbnailField";
import { ArticleFormFields } from "../../components/admin/ArticleFormFields";
import {
  ArticleFormHeaderButtons,
  ArticleFormDeleteButton,
} from "../../components/admin/ArticleFormActions";
import { useCreateArticle } from "../../hooks";

/**
 * หน้าสร้าง/แก้ไขบทความ (Admin)
 * - Create: /admin/article/create
 * - Edit: /admin/article/:articleId/edit
 * - ใช้ useCreateArticle สำหรับ logic, component ย่อยสำหรับ UI
 */
const CreateArticlePage = () => {
  const { articleId } = useParams<{ articleId?: string }>();
  const article = useCreateArticle(articleId);

  return (
    <AdminLayout activeItem="article">
      <section className="w-full h-full p-[40px]">
        <header className="flex items-center justify-between mb-[32px] pb-[24px] border-b border-gray-200">
          <h1 className="text-headline-3 text-brown-600">
            {article.isEditMode ? "Edit article" : "Create article"}
          </h1>
          <ArticleFormHeaderButtons
            isEditMode={article.isEditMode}
            isLoading={article.isLoading}
            onSaveAsDraft={article.onSaveAsDraft}
            onSaveAndPublish={article.onSaveAndPublish}
          />
        </header>

        <article className="bg-white rounded-[8px] border border-gray-200 p-[40px]">
          <ArticleThumbnailField
            thumbnailPreview={article.thumbnailPreview}
            imageUrl={article.imageUrl}
            isEditMode={article.isEditMode}
            onThumbnailUpload={article.onThumbnailUpload}
            onRemoveThumbnail={article.onRemoveThumbnail}
            onImageUrlChange={article.onImageUrlChange}
          />

          <ArticleFormFields
            categories={article.categories}
            categoryId={article.categoryId}
            authorName={article.authorName}
            title={article.title}
            introduction={article.introduction}
            content={article.content}
            introductionLength={article.introductionLength}
            maxIntroductionLength={article.maxIntroductionLength}
            onCategoryChange={article.onCategoryChange}
            onTitleChange={article.onTitleChange}
            onIntroductionChange={article.onIntroductionChange}
            onContentChange={article.onContentChange}
          />

          {article.isEditMode && (
            <ArticleFormDeleteButton onDelete={article.onDelete} />
          )}
        </article>
      </section>
    </AdminLayout>
  );
};

export default CreateArticlePage;
