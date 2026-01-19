import { toast } from "sonner";

/**
 * Copies a URL to the clipboard and shows a success toast notification
 * Toast automatically disappears after 2 seconds
 * @param url - The URL to copy to clipboard
 */
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
