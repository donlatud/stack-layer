import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import AdminConfirmModal from "../../components/admin/AdminConfirmModal";
import { deleteCategory } from "../../data/categoriesApi";

/**
 * หน้าโมดัลยืนยันการลบหมวดหมู่ (Admin)
 * กด Cancel / X → กลับไป /admin/category
 * กด Delete → เรียก API ลบ แล้วกลับ /admin/category
 */
const CheckDeleteCategoryPage = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams<{ categoryId: string }>();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleCancel = () => navigate("/admin/category");

  const handleDelete = async () => {
    if (!categoryId) {
      navigate("/admin/category");
      return;
    }
    setIsDeleting(true);
    try {
      await deleteCategory(categoryId);
      toast.success("Category deleted", {
        description: "Category has been successfully deleted.",
        duration: 2000,
        className: "toast-success-custom",
      });
      navigate("/admin/category");
    } catch (err) {
      console.error("Error deleting category:", err);
      toast.error("Failed to delete category. It may be in use by some posts.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AdminConfirmModal
      title="Delete category"
      message="Do you want to delete this category?"
      confirmLabel={isDeleting ? "Deleting..." : "Delete"}
      onCancel={handleCancel}
      onConfirm={handleDelete}
      confirmDisabled={isDeleting}
    />
  );
};

export default CheckDeleteCategoryPage;
