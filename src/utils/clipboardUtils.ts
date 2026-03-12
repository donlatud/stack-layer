import { toast } from "sonner";

/** คัดลอก URL ลงคลิปบอร์ด และแสดง toast สำเร็จ/ไม่สำเร็จ */
export const copyLinkToClipboard = async (url: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(url);
    toast.success("Copied!", {
      description: "This article has been copied to your clipboard.",
      duration: 2000, // 2 seconds
      className: "toast-success-custom",
    });
  } catch (err) {
    console.error("Failed to copy link:", err);
    toast.error("Copy failed", {
      description: "Please try again.",
      duration: 2000, // 2 seconds
    });
  }
};
