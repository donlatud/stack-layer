import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { LoadingMessage } from "../../components/common/LoadingMessage";
import AdminLayout from "../../components/admin/AdminLayout";
import BlackButton from "../../components/common/BlackButton";
import {
  fetchCategoryById,
  createCategory,
  updateCategory,
} from "../../data/categoriesApi";

/**
 * หน้าสร้าง/แก้ไขหมวดหมู่ (Admin)
 * - Create: /admin/category/create
 * - Edit: /admin/category/:categoryId/edit
 * - ฟิลด์เดียว: ชื่อหมวดหมู่; ปุ่ม Save
 */
const CreateCategoryPage = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams<{ categoryId?: string }>();
  const isEditMode = !!categoryId;

  const [categoryName, setCategoryName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingInitial, setIsLoadingInitial] = useState(isEditMode);

  useEffect(() => {
    if (!categoryId) return;
    const loadCategory = async () => {
      setIsLoadingInitial(true);
      try {
        const category = await fetchCategoryById(categoryId);
        if (category) {
          setCategoryName(category.name);
        } else {
          toast.error("Category not found");
          navigate("/admin/category");
        }
      } catch (err) {
        console.error("Error loading category:", err);
        toast.error("Failed to load category");
        navigate("/admin/category");
      } finally {
        setIsLoadingInitial(false);
      }
    };
    loadCategory();
  }, [categoryId, navigate]);

  const handleSave = async () => {
    const name = categoryName.trim();
    if (!name) {
      toast.error("Please enter a category name");
      return;
    }
    setIsLoading(true);
    try {
      if (isEditMode && categoryId) {
        await updateCategory(categoryId, name);
        toast.success("Category updated", {
          description: "Category has been successfully updated.",
          duration: 2000,
          className: "toast-success-custom",
        });
      } else {
        await createCategory(name);
        toast.success("Category created", {
          description: "Category has been successfully created.",
          duration: 2000,
          className: "toast-success-custom",
        });
      }
      navigate("/admin/category");
    } catch (err) {
      console.error("Error saving category:", err);
      toast.error("Failed to save category");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout activeItem="category">
      <section className="w-full h-full p-[40px]">
        <header className="flex items-center justify-between mb-[32px] pb-[24px] border-b border-gray-200">
          <h1 className="text-headline-3 text-brown-600">
            {isEditMode ? "Edit category" : "Create category"}
          </h1>
          <BlackButton
            type="button"
            className="h-[44px] w-[120px] px-[24px] flex items-center justify-center"
            onClick={handleSave}
            disabled={isLoading || isLoadingInitial}
          >
            {isLoading ? "Saving..." : "Save"}
          </BlackButton>
        </header>

        <article className="pt-[32px]">
          {isEditMode && isLoadingInitial ? (
            <LoadingMessage className="text-body-1 text-gray-500" />
          ) : (
            <section className="mb-[32px]">
              <label
                htmlFor="category-name"
                className="block text-body-2 text-[#2D2D2D] mb-[12px]"
              >
                Category name
              </label>
              <input
                id="category-name"
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Category name"
                className="w-[360px] h-[44px] px-[16px] bg-white border border-gray-300 rounded-[8px] text-body-1 text-brown-600 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-brand-red"
              />
            </section>
          )}
        </article>
      </section>
    </AdminLayout>
  );
};

export default CreateCategoryPage;
