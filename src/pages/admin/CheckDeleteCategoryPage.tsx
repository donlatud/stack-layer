import { useNavigate, useParams } from "react-router-dom";
import AdminConfirmModal from "../../components/admin/AdminConfirmModal";

/**
 * หน้าโมดัลยืนยันการลบหมวดหมู่ (Admin)
 * กด Cancel / X → กลับไป /admin/category
 * กด Delete → ลบ (TODO: เรียก API) แล้วกลับ /admin/category
 */
const CheckDeleteCategoryPage = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams<{ categoryId: string }>();

  const handleCancel = () => navigate("/admin/category");

  const handleDelete = () => {
    // TODO: เรียก API ลบหมวดหมู่
    console.log("Delete category", categoryId);
    navigate("/admin/category");
  };

  return (
    <AdminConfirmModal
      title="Delete category"
      message="Do you want to delete this category?"
      confirmLabel="Delete"
      onCancel={handleCancel}
      onConfirm={handleDelete}
    />
  );
};

export default CheckDeleteCategoryPage;
