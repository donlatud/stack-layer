/**
 * บล็อกรูปโปรไฟล์ + ปุ่มอัปโหลด
 * ใช้ร่วมกันใน AdminProfilePage และ ProfileManagePage
 */
export type ProfileAvatarVariant = "admin" | "member-mobile" | "member-desktop";

export interface ProfileAvatarBlockProps {
  displayAvatar: string | null;
  displayName: string;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  variant: ProfileAvatarVariant;
}

const VARIANT_STYLES: Record<
  ProfileAvatarVariant,
  {
    avatarWrapper: string;
    fallbackText: string;
    buttonWrapper: string;
    buttonInner: string;
    fallbackUppercase: boolean;
  }
> = {
  admin: {
    avatarWrapper:
      "w-[96px] h-[96px] rounded-full bg-gray-200 flex items-center justify-center overflow-hidden shrink-0",
    fallbackText: "text-headline-2 text-gray-600 font-medium",
    buttonWrapper: "flex items-center gap-[24px] mb-[32px]",
    buttonInner:
      "h-[44px] px-[24px] rounded-[999px] bg-white border border-gray-300 text-[#2D2D2D] text-body-1 font-medium flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors",
    fallbackUppercase: false,
  },
  "member-mobile": {
    avatarWrapper:
      "w-[150px] h-[150px] rounded-full bg-brown-300 flex items-center justify-center overflow-hidden my-[24px]",
    fallbackText: "text-headline-2 text-brown-600 font-medium",
    buttonWrapper: "flex flex-col items-center mb-[32px]",
    buttonInner:
      "w-full h-[48px] rounded-[999px] bg-white border border-brown-400 text-brown-600 text-body-1 font-medium flex items-center justify-center cursor-pointer transition-colors",
    fallbackUppercase: true,
  },
  "member-desktop": {
    avatarWrapper:
      "w-[100px] h-[100px] rounded-full bg-brown-300 flex items-center justify-center overflow-hidden shrink-0",
    fallbackText: "text-headline-2 text-brown-600 font-medium",
    buttonWrapper: "flex items-center gap-[40px] mb-[32px]",
    buttonInner:
      "h-[44px] px-[24px] rounded-[999px] bg-white border border-brown-400 text-brown-600 text-body-1 font-medium flex items-center justify-center cursor-pointer transition-colors hover:bg-brown-50",
    fallbackUppercase: true,
  },
};

export function ProfileAvatarBlock({
  displayAvatar,
  displayName,
  onImageUpload,
  variant,
}: ProfileAvatarBlockProps) {
  const styles = VARIANT_STYLES[variant];
  const isColumn = variant === "member-mobile";

  return (
    <div className={styles.buttonWrapper}>
      <div className={styles.avatarWrapper}>
        {displayAvatar ? (
          <img
            src={displayAvatar}
            alt={displayName}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className={styles.fallbackText}>
            {styles.fallbackUppercase
              ? displayName.charAt(0).toUpperCase()
              : displayName.charAt(0)}
          </span>
        )}
      </div>
      {isColumn ? (
        <label className="w-full max-w-[260px]">
          <input
            type="file"
            accept="image/*"
            onChange={onImageUpload}
            className="hidden"
          />
          <div className={styles.buttonInner}>Upload profile picture</div>
        </label>
      ) : (
        <label>
          <input
            type="file"
            accept="image/*"
            onChange={onImageUpload}
            className="hidden"
          />
          <div className={styles.buttonInner}>Upload profile picture</div>
        </label>
      )}
    </div>
  );
}
