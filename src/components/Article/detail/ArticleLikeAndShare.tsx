import { Smile, Copy } from "lucide-react";
import type { BlogPost } from "../../../types/blog";
import { cn } from "@/lib/utils";
import facebookLogo from "../../../assets/facebook-logo.svg";
import linkedinLogo from "../../../assets/linkedin_logo.svg";
import twitterLogo from "../../../assets/twitter-logo.svg";

interface ArticleLikeAndShareProps {
  article: BlogPost;
  isLiked?: boolean;
  onLike: () => void;
  onCopyLink: () => void;
  onShare: (platform: string) => void;
}

/**
 * ปุ่ม Like (นับเลข) + Copy link + Share ไป Facebook / LinkedIn / Twitter
 */
const ArticleLikeAndShare = ({
  article,
  isLiked = false,
  onLike,
  onCopyLink,
  onShare,
}: ArticleLikeAndShareProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-[24px] md:gap-[32px] w-full">
      <button
        type="button"
        onClick={onLike}
        className={cn(
          "flex items-center justify-center h-[48px] gap-[12px] rounded-[999px] pt-[12px] pb-[12px] pl-[40px] pr-[40px] transition-colors",
          isLiked ? "bg-brand-green hover:bg-brand-green/90" : "bg-white hover:bg-brown-300"
        )}
      >
        <Smile
          className={cn("w-[24px] h-[24px]", isLiked ? "text-white" : "text-brown-600")}
        />
        <span
          className={cn("text-body-1 font-medium", isLiked ? "text-white" : "text-brown-600")}
        >
          {article.likes || 0}
        </span>
      </button>

      <div className="flex items-center justify-center gap-[12px] flex-wrap">
        <button
          type="button"
          onClick={onCopyLink}
          className="flex items-center justify-center gap-[6px] px-[28px] py-[12px] h-[48px] bg-white rounded-[999px] hover:bg-brown-300 transition-colors"
        >
          <Copy className="w-[20px] h-[20px] text-brown-600" />
          <span className="text-body-1 text-brown-600 font-medium">
            Copy link
          </span>
        </button>

        <div className="flex items-center gap-[12px]">
          <button
            type="button"
            onClick={() => onShare("facebook")}
            className="flex items-center justify-center w-[48px] h-[48px] rounded-full overflow-hidden bg-transparent hover:opacity-90 transition-opacity"
            aria-label="Share on Facebook"
          >
            <img src={facebookLogo} alt="Facebook" className="w-full h-full object-cover" />
          </button>
          <button
            type="button"
            onClick={() => onShare("linkedin")}
            className="flex items-center justify-center w-[48px] h-[48px] rounded-full overflow-hidden bg-transparent hover:opacity-90 transition-opacity"
            aria-label="Share on LinkedIn"
          >
            <img src={linkedinLogo} alt="LinkedIn" className="w-full h-full object-cover" />
          </button>
          <button
            type="button"
            onClick={() => onShare("twitter")}
            className="flex items-center justify-center w-[48px] h-[48px] rounded-full overflow-hidden bg-transparent hover:opacity-90 transition-opacity"
            aria-label="Share on Twitter"
          >
            <img src={twitterLogo} alt="Twitter" className="w-full h-full object-cover" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleLikeAndShare;
