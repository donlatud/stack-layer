import { cn } from "../../lib/utils";
import type { CategoryItem } from "../../data/categoriesApi";

export interface ArticleFormFieldsProps {
  categories: CategoryItem[];
  categoryId: number | "";
  authorName: string;
  title: string;
  introduction: string;
  content: string;
  introductionLength: number;
  maxIntroductionLength: number;
  onCategoryChange: (value: number | "") => void;
  onTitleChange: (value: string) => void;
  onIntroductionChange: (value: string) => void;
  onContentChange: (value: string) => void;
}

const INPUT_CLASS =
  "w-full h-[44px] px-[16px] bg-white border border-gray-300 rounded-[8px] text-body-1 text-brown-600 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-brand-red";
const TEXTAREA_CLASS =
  "w-full px-[16px] py-[12px] bg-white border border-gray-300 rounded-[8px] text-body-1 text-brown-600 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-brand-red resize-none";

export function ArticleFormFields({
  categories,
  categoryId,
  authorName,
  title,
  introduction,
  content,
  introductionLength,
  maxIntroductionLength,
  onCategoryChange,
  onTitleChange,
  onIntroductionChange,
  onContentChange,
}: ArticleFormFieldsProps) {
  return (
    <>
      {/* Category */}
      <section className="mb-[32px]">
        <label htmlFor="category" className="block text-body-2 text-brown-600 mb-[12px]">
          Category
        </label>
        <select
          id="category"
          value={categoryId === "" ? "" : categoryId}
          onChange={(e) =>
            onCategoryChange(e.target.value === "" ? "" : Number(e.target.value))
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
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Article title"
          className={INPUT_CLASS}
        />
      </section>

      {/* Introduction */}
      <section className="mb-[32px]">
        <div className="flex items-center justify-between mb-[12px]">
          <label htmlFor="introduction" className="block text-body-2 text-brown-600">
            Introduction (max 120 letters)
          </label>
          <span
            className={cn(
              "text-body-3",
              introductionLength > maxIntroductionLength ? "text-brand-red" : "text-gray-400"
            )}
          >
            {introductionLength}/{maxIntroductionLength}
          </span>
        </div>
        <textarea
          id="introduction"
          value={introduction}
          onChange={(e) => {
            if (e.target.value.length <= maxIntroductionLength) {
              onIntroductionChange(e.target.value);
            }
          }}
          placeholder="Introduction"
          rows={4}
          className={TEXTAREA_CLASS}
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
          onChange={(e) => onContentChange(e.target.value)}
          placeholder="Content"
          rows={20}
          className={TEXTAREA_CLASS}
        />
      </section>
    </>
  );
}
