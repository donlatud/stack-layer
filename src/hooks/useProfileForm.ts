import { useState, useEffect } from "react";
import { toast } from "sonner";
import { updateProfile } from "../data/authApi";
import { validateImageFile } from "../utils/fileValidation";

export interface ProfileFormUser {
  name?: string;
  email?: string;
  avatar?: string;
  username?: string;
  id?: string;
  role?: string;
}

export interface ProfileFormData {
  name: string;
  username: string;
  email: string;
  bio?: string;
}

export interface UseProfileFormOptions {
  user: ProfileFormUser | null;
  updateUser: (data: Partial<ProfileFormUser>) => void;
  /** รวมฟิลด์ bio ใน formData (สำหรับ Admin) */
  includeBio?: boolean;
  /** จำกัดความยาว bio (default 120) */
  maxBioLength?: number;
  /** ค่า bio ตั้งต้นเมื่อ includeBio เป็น true */
  initialBio?: string;
}

export interface UseProfileFormReturn {
  formData: ProfileFormData;
  profileImage: string | null;
  profileFile: File | null;
  isSaving: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSave: (options?: { onNoChanges?: () => void; onSuccess?: () => void }) => Promise<void>;
  setProfileFile: (file: File | null) => void;
  displayName: string;
  displayAvatar: string | null;
}

/**
 * Hook สำหรับฟอร์มโปรไฟล์: name, avatar, การอัปโหลดรูป และการบันทึก
 * ใช้ใน ProfileManagePage และ AdminProfilePage
 */
export function useProfileForm(options: UseProfileFormOptions): UseProfileFormReturn {
  const {
    user,
    updateUser,
    includeBio = false,
    maxBioLength = 120,
    initialBio = "",
  } = options;

  const [formData, setFormData] = useState<ProfileFormData>({
    name: user?.name ?? "",
    username: user?.email?.split("@")[0] ?? "",
    email: user?.email ?? "",
    ...(includeBio && { bio: initialBio }),
  });
  const [profileImage, setProfileImage] = useState<string | null>(user?.avatar ?? null);
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name ?? "",
        username: user.email?.split("@")[0] ?? "",
        email: user.email ?? "",
      }));
      setProfileImage(user.avatar ?? null);
      setProfileFile(null);
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "bio" && includeBio && value.length > maxBioLength) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const { valid, errorMessage } = validateImageFile(file);
    if (!valid) {
      toast.error(errorMessage);
      return;
    }
    setProfileFile(file);
    setProfileImage(URL.createObjectURL(file));
  };

  const handleSave = async (saveOptions?: {
    onNoChanges?: () => void;
    onSuccess?: () => void;
  }) => {
    const form = new FormData();
    form.append("name", formData.name.trim());
    if (profileFile) {
      form.append("avatarFile", profileFile);
    }
    const hasChanges =
      profileFile || formData.name.trim() !== (user?.name ?? "");
    if (!hasChanges) {
      saveOptions?.onNoChanges?.();
      return;
    }
    setIsSaving(true);
    try {
      const result = await updateProfile(form);
      if (result.success && result.user) {
        const merged = {
          ...result.user,
          email: user?.email ?? result.user.email ?? "",
        };
        updateUser(merged);
        setProfileFile(null);
        saveOptions?.onSuccess?.();
      } else {
        toast.error(result.message ?? "Failed to update profile");
      }
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  const displayName = formData.name || user?.name || "User";
  const displayAvatar = profileImage || (user?.avatar ?? null);

  return {
    formData,
    profileImage,
    profileFile,
    isSaving,
    handleChange,
    handleImageUpload,
    handleSave,
    setProfileFile,
    displayName,
    displayAvatar,
  };
}
