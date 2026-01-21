import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import AdminLayout from "../../components/admin/AdminLayout";
import BlackButton from "../../components/common/BlackButton";
import { Button } from "../../components/ui/button";

/**
 * CreateCategoryPage component - Create or edit category page for admin
 * Reused for both create and edit flows
 */
const CreateCategoryPage = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams<{ categoryId?: string }>();
  const isEditMode = !!categoryId;

  const [categoryName, setCategoryName] = useState("");

  // Load category data in edit mode (mock for now)
  useEffect(() => {
    if (categoryId) {
      // TODO: Replace with actual API call
      const mockCategoryName = "Cat";
      setCategoryName(mockCategoryName);
    }
  }, [categoryId]);

  const handleSave = () => {
    // TODO: Implement save logic (create or update)
    console.log(isEditMode ? "Update category" : "Create category", {
      categoryId,
      categoryName,
    });

    if (isEditMode) {
      toast.success("Update category", {
        description: "Category has been successfully updated.",
        duration: 2000,
        className: "toast-success-custom",
      });
    } else {
      toast.success("Create category", {
        description: "Category has been successfully created.",
        duration: 2000,
        className: "toast-success-custom",
      });
    }

    navigate("/admin/category");
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
          >
            Save
          </BlackButton>
        </header>

        <article className="pt-[32px]">
          <section className="mb-[32px]">
            <label htmlFor="category-name" className="block text-body-2 text-[#2D2D2D] mb-[12px]">
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
        </article>
      </section>
    </AdminLayout>
  );
};

export default CreateCategoryPage;

