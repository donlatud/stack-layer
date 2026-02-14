import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import AdminConfirmModal from "../../components/admin/AdminConfirmModal";
import { deletePost } from "../../data/postsApi";

/**
 * หน้าโมดัลยืนยันการลบบทความ (Admin)
 * กด Cancel / X → กลับไป /admin/article
 * กด Delete → เรียก API ลบ แล้วกลับ /admin/article
 */
const CheckDeleteArticlePage = () => {
  const navigate = useNavigate();
  const { articleId } = useParams<{ articleId: string }>();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleCancel = () => navigate("/admin/article");

  const handleDelete = async () => {
    if (!articleId) return;
    setIsDeleting(true);
    try {
      await deletePost(articleId);
      toast.success("Article deleted successfully");
      navigate("/admin/article");
    } catch (err) {
      console.error("Error deleting article:", err);
      toast.error("Failed to delete article");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AdminConfirmModal
      title="Delete article"
      message="Do you want to delete this article?"
      confirmLabel={isDeleting ? "Deleting..." : "Delete"}
      confirmDisabled={isDeleting}
      onCancel={handleCancel}
      onConfirm={handleDelete}
    />
  );
};

export default CheckDeleteArticlePage;
