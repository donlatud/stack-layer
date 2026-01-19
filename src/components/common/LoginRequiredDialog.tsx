import { X } from "lucide-react";

interface LoginRequiredDialogProps {
  open: boolean;
  onClose: () => void;
}

/**
 * LoginRequiredDialog - Alert dialog shown when user isn't logged in
 * Shows a modal that asks user to create account / log in
 */
const LoginRequiredDialog = ({ open, onClose }: LoginRequiredDialogProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Close dialog"
        onClick={onClose}
        className="absolute inset-0 bg-black/50 cursor-default"
      />

      <section
        role="dialog"
        aria-modal="true"
        aria-label="Login required"
        className="absolute left-1/2 top-1/2 w-[343px] h-[272px] md:w-[480px] md:h-[300px] lg:w-[621px] lg:h-[352px] -translate-x-1/2 -translate-y-1/2 rounded-[20px] bg-white px-[24px] py-[24px] shadow-xl md:px-[48px] md:py-[40px]"
      >
        <header className="flex items-start justify-end">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center justify-center rounded-[10px] p-[8px] text-brown-600 hover:bg-brown-200 transition-colors"
            aria-label="Close"
          >
            <X className="h-[22px] w-[22px]" />
          </button>
        </header>

        <div className="flex flex-col items-center text-center gap-[20px] pb-[8px] md:gap-[24px] lg:gap-[32px]">
          <h2 className="text-headline-3 text-brown-600 font-semibold leading-[1.1] md:text-headline-2 lg:text-headline-2">
            Create an account to
            <br className="hidden md:block" />
            continue
          </h2>

          <button
            type="button"
            className="h-[48px] px-[40px] rounded-[999px] bg-black text-white text-body-1 font-medium hover:opacity-90 transition-opacity"
          >
            Create account
          </button>

          <div className="flex items-center gap-[12px]">
            <span className="text-body-1 text-brown-400">
              Already have an account?
            </span>
            <button
              type="button"
              className="underline text-brown-600 font-semibold hover:opacity-90 transition-opacity"
            >
              Log in
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginRequiredDialog;
