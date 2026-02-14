import { X } from "lucide-react";
import BlackButton from "../common/BlackButton";
import { Button } from "../ui/button";

/**
 * โมดัลยืนยันการกระทำ สำหรับหน้าแอดมิน
 * ใช้ร่วมกับ CheckDeleteArticle, CheckDeleteCategory, CheckResetPassword
 *
 * @param title - หัวข้อในโมดัล (เช่น "Delete article")
 * @param message - ข้อความยืนยัน (เช่น "Do you want to delete this article?")
 * @param confirmLabel - ข้อความปุ่มยืนยัน (เช่น "Delete", "Reset")
 * @param onCancel - เมื่อกด Cancel หรือปุ่ม X
 * @param onConfirm - เมื่อกดปุ่มยืนยัน
 * @param cancelLabel - ข้อความปุ่มยกเลิก (ค่าเริ่มต้น "Cancel")
 */
type AdminConfirmModalProps = {
  title: string;
  message: string;
  confirmLabel: string;
  onCancel: () => void;
  onConfirm: () => void;
  cancelLabel?: string;
  confirmDisabled?: boolean;
};

const AdminConfirmModal = ({
  title,
  message,
  confirmLabel,
  onCancel,
  onConfirm,
  cancelLabel = "Cancel",
  confirmDisabled = false,
}: AdminConfirmModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative bg-white rounded-[16px] w-full max-w-[420px] mx-[16px] shadow-lg">
        <header className="relative px-[40px] pt-[32px] pb-[8px] text-center">
          <button
            type="button"
            onClick={onCancel}
            className="absolute right-[24px] top-[24px] w-[24px] h-[24px] flex items-center justify-center text-brown-400 hover:text-brown-600 transition-colors"
            aria-label="Close"
          >
            <X className="w-[18px] h-[18px]" />
          </button>
          <h2 className="text-headline-4 text-brown-600">{title}</h2>
        </header>

        <section className="px-[40px] pt-[8px] pb-[32px] text-center">
          <p className="text-body-1 text-brown-500 mb-[28px]">{message}</p>

          <div className="flex items-center justify-center gap-[12px]">
            <Button
              type="button"
              variant="outline"
              className="h-[44px] w-[132px] px-[28px] rounded-[999px] border border-brown-300 bg-white text-brown-600 hover:bg-brown-100"
              onClick={onCancel}
            >
              {cancelLabel}
            </Button>
            <BlackButton
              type="button"
              className="h-[44px] w-[132px] px-[32px]"
              onClick={onConfirm}
              disabled={confirmDisabled}
            >
              {confirmLabel}
            </BlackButton>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminConfirmModal;
