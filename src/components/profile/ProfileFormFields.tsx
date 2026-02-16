import { cn } from "../../lib/utils";
import type { ProfileFormData } from "../../hooks";

export type ProfileFormVariant = "admin" | "member-mobile" | "member-desktop";

export interface ProfileFormFieldsProps {
  formData: ProfileFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  variant: ProfileFormVariant;
  /** แสดงช่อง bio (Admin เท่านั้น) */
  includeBio?: boolean;
  maxBioLength?: number;
  /** class เพิ่มเติมสำหรับ form wrapper */
  formClassName?: string;
}

const INPUT_CLASSES: Record<
  ProfileFormVariant,
  {
    label: string;
    input: string;
    emailDisplay: string;
  }
> = {
  admin: {
    label: "text-body-2 text-gray-600",
    input:
      "w-[480px] max-w-full h-[44px] px-[16px] bg-white border border-gray-300 rounded-[8px] text-body-1 text-[#2D2D2D] focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-brand-red",
    emailDisplay: "",
  },
  "member-mobile": {
    label: "text-body-1 text-brown-400",
    input:
      "w-full h-[48px] px-[16px] py-[12px] bg-white border border-brown-300 rounded-[8px] text-body-1 text-brown-500 placeholder:text-brown-400 focus:outline-none focus:ring-2 focus:ring-brown-400 focus:border-brown-400",
    emailDisplay: "w-full h-[48px] px-[16px] py-[12px] text-body-1 text-brown-400",
  },
  "member-desktop": {
    label: "text-body-2 text-brown-400",
    input:
      "w-full h-[44px] px-[16px] py-[12px] bg-white border border-brown-300 rounded-[8px] text-body-1 text-brown-500 placeholder:text-brown-400 focus:outline-none focus:ring-2 focus:ring-brown-400 focus:border-brown-400",
    emailDisplay:
      "w-full h-[44px] px-[16px] py-[12px] bg-white border border-brown-300 rounded-[8px] text-body-1 text-brown-400",
  },
};

export function ProfileFormFields({
  formData,
  onChange,
  variant,
  includeBio = false,
  maxBioLength = 120,
  formClassName,
}: ProfileFormFieldsProps) {
  const styles = INPUT_CLASSES[variant];
  const idSuffix = variant === "member-desktop" ? "-desktop" : "";
  const formGap = variant === "member-desktop" ? "gap-[32px]" : "gap-[24px]";

  return (
    <form className={cn("flex flex-col", formGap, formClassName)}>
      <div className="flex flex-col gap-[4px]">
        <label htmlFor={`name${idSuffix}`} className={styles.label}>
          Name
        </label>
        <input
          type="text"
          id={`name${idSuffix}`}
          name="name"
          value={formData.name}
          onChange={onChange}
          className={styles.input}
          placeholder={variant !== "admin" ? "Name" : undefined}
        />
      </div>

      <div className="flex flex-col gap-[4px]">
        <label htmlFor={`username${idSuffix}`} className={styles.label}>
          Username
        </label>
        <input
          type="text"
          id={`username${idSuffix}`}
          name="username"
          value={formData.username}
          onChange={onChange}
          className={styles.input}
          placeholder={variant !== "admin" ? "Username" : undefined}
        />
      </div>

      <div className="flex flex-col gap-[4px]">
        <label htmlFor={`email${idSuffix}`} className={styles.label}>
          Email
        </label>
        {variant === "admin" ? (
          <input
            type="email"
            id={`email${idSuffix}`}
            name="email"
            value={formData.email}
            onChange={onChange}
            className={styles.input}
          />
        ) : (
          <div className={styles.emailDisplay}>{formData.email}</div>
        )}
      </div>

      {includeBio && (
        <div className="flex flex-col gap-[4px]">
          <div className="flex items-center justify-between">
            <label htmlFor="bio" className={styles.label}>
              Bio (max 120 letters)
            </label>
            <span
              className={cn(
                "text-body-3",
                (formData.bio ?? "").length > maxBioLength
                  ? "text-brand-red"
                  : "text-gray-400"
              )}
            >
              {(formData.bio ?? "").length}/{maxBioLength}
            </span>
          </div>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio ?? ""}
            onChange={onChange}
            rows={5}
            className="w-full px-[16px] py-[12px] bg-white border border-gray-300 rounded-[8px] text-body-1 text-[#2D2D2D] resize-none focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-brand-red"
          />
        </div>
      )}
    </form>
  );
}
