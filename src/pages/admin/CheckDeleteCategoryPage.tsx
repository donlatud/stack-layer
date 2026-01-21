import { useNavigate, useParams } from "react-router-dom";
import { X } from "lucide-react";
import BlackButton from "../../components/common/BlackButton";
import { Button } from "../../components/ui/button";

/**
 * CheckDeleteCategoryPage component - Delete confirmation modal for category
 * Desktop-only modal dialog for confirming category deletion
 */
const CheckDeleteCategoryPage = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams<{ categoryId: string }>();

  const handleCancel = () => {
    navigate("/admin/category");
  };

  const handleDelete = () => {
    // TODO: Implement delete logic
    console.log("Delete category", categoryId);
    navigate("/admin/category");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative bg-white rounded-[16px] w-full max-w-[420px] mx-[16px] shadow-lg">
        <header className="relative px-[40px] pt-[32px] pb-[8px] text-center">
          <button
            type="button"
            onClick={handleCancel}
            className="absolute right-[24px] top-[24px] w-[24px] h-[24px] flex items-center justify-center text-brown-400 hover:text-brown-600 transition-colors"
            aria-label="Close"
          >
            <X className="w-[18px] h-[18px]" />
          </button>
          <h2 className="text-headline-4 text-brown-600">Delete category</h2>
        </header>

        <section className="px-[40px] pt-[8px] pb-[32px] text-center">
          <p className="text-body-1 text-brown-500 mb-[28px]">
            Do you want to delete this category?
          </p>

          <div className="flex items-center justify-center gap-[12px]">
            <Button
              type="button"
              variant="outline"
              className="h-[44px] w-[132px] px-[28px] rounded-[999px] border border-brown-300 bg-white text-brown-600 hover:bg-brown-100"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <BlackButton
              type="button"
              className="h-[44px] w-[132px] px-[32px]"
              onClick={handleDelete}
            >
              Delete
            </BlackButton>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CheckDeleteCategoryPage;

