import { X } from "lucide-react";
import BlackButton from "../common/BlackButton";
import { MESSAGE_RESET_PASSWORD_CONFIRM } from "../../constants/messages";

interface ResetPasswordConfirmModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

/**
 * Modal ยืนยันรีเซ็ตรหัสผ่าน (แสดงบน desktop ก่อนกด Reset)
 */
const ResetPasswordConfirmModal = ({
  onConfirm,
  onCancel,
  isSubmitting,
}: ResetPasswordConfirmModalProps) => {
  return (
    <div className="hidden lg:block fixed inset-0 z-50">
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onCancel}
        aria-hidden
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-[16px]">
        <div className="bg-white rounded-[12px] p-[32px] max-w-[400px] w-full shadow-xl relative">
          <button
            onClick={onCancel}
            className="absolute top-[16px] right-[16px] w-[32px] h-[32px] flex items-center justify-center text-brown-400 hover:text-brown-600 transition-colors"
            aria-label="Close modal"
            type="button"
          >
            <X className="w-[20px] h-[20px]" />
          </button>

          <div className="flex flex-col items-center justify-center text-center gap-[20px] mt-[24px] mb-[32px]">
            <h2 className="text-headline-3 text-brown-600 font-semibold mb-[8px]">
              Reset password
            </h2>
            <p className="text-body-1 text-brown-500">
              {MESSAGE_RESET_PASSWORD_CONFIRM}
            </p>
          </div>

          <div className="flex gap-[12px] justify-center">
            <button
              onClick={onCancel}
              className="h-[48px] w-[138px] px-[24px] rounded-[999px] bg-white border border-brown-300 text-brown-600 text-body-1 font-medium hover:bg-brown-50 transition-colors disabled:opacity-50"
              disabled={isSubmitting}
              type="button"
            >
              Cancel
            </button>
            <BlackButton
              onClick={onConfirm}
              className="h-[48px] w-[138px] px-[24px] rounded-[999px]"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Resetting..." : "Reset"}
            </BlackButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordConfirmModal;
