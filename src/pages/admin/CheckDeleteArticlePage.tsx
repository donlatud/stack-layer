import { useNavigate, useParams } from "react-router-dom";
import AdminConfirmModal from "../../components/admin/AdminConfirmModal";

/**
 * หน้าโมดัลยืนยันการลบบทความ (Admin)
 * กด Cancel / X → กลับไป /admin/article
 * กด Delete → ลบ (TODO: เรียก API) แล้วกลับ /admin/article
 */
const CheckDeleteArticlePage = () => {
  const navigate = useNavigate();
  const { articleId } = useParams<{ articleId: string }>();

  const handleCancel = () => navigate("/admin/article");

  const handleDelete = () => {
    // TODO: เรียก API ลบบทความ
    console.log("Delete article", articleId);
    navigate("/admin/article");
  };

  return (
    <AdminConfirmModal
      title="Delete article"
      message="Do you want to delete this article?"
      confirmLabel="Delete"
      onCancel={handleCancel}
      onConfirm={handleDelete}
    />
  );
};

export default CheckDeleteArticlePage;
