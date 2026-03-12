import { toast } from "sonner";
import AdminLayout from "../../components/admin/AdminLayout";
import BlackButton from "../../components/common/BlackButton";
import {
  ProfileAvatarBlock,
  ProfileFormFields,
} from "../../components/profile";
import { useAuth } from "../../contexts/AuthContext";
import { useProfileForm } from "../../hooks";

const MAX_BIO_LENGTH = 120;
const DEFAULT_BIO =
  "I am a pet enthusiast and freelance writer who specializes in animal behavior and care. With a deep love for cats, I enjoy sharing insights on feline companionship and wellness.\nWhen I'm not writing, I spend time volunteering at my local animal shelter, helping cats find loving homes.";

/**
 * หน้าโปรไฟล์ (Admin)
 * แก้ไขชื่อ, อัปโหลดรูป; เรียก PATCH /auth/profile (name + avatarFile)
 */
const AdminProfilePage = () => {
  const { user, updateUser } = useAuth();
  const {
    formData,
    displayName,
    displayAvatar,
    handleChange,
    handleImageUpload,
    handleSave: saveProfile,
    isSaving,
  } = useProfileForm({
    user,
    updateUser,
    includeBio: true,
    maxBioLength: MAX_BIO_LENGTH,
    initialBio: DEFAULT_BIO,
  });

  const handleSubmit = () => {
    saveProfile({
      onNoChanges: () =>
        toast.success("No changes to save", { className: "toast-success-custom" }),
      onSuccess: () =>
        toast.success("Saved profile", {
          description: "Your profile has been successfully updated",
          duration: 2000,
          className: "toast-success-custom",
        }),
    });
  };

  return (
    <AdminLayout activeItem="profile">
      <div className="w-full h-full bg-brown-100 p-[40px]">
        {/* Header */}
        <div className="-mx-[40px] border-b border-gray-200">
          <header className="flex items-center justify-between px-[40px] h-[96px]">
            <h1 className="text-headline-3 text-brown-600">Profile</h1>
            <BlackButton onClick={handleSubmit} className="h-[44px] px-[24px] disabled:opacity-50" disabled={isSaving}>
              Save
            </BlackButton>
          </header>
        </div>

        {/* Profile Form */}
        <section className="max-w-[1160px] pl-[32px] pt-[32px]">
          <ProfileAvatarBlock
            displayAvatar={displayAvatar}
            displayName={displayName}
            onImageUpload={handleImageUpload}
            variant="admin"
          />

          <div className="h-px bg-gray-200 mb-[32px]" />

          <ProfileFormFields
            formData={formData}
            onChange={handleChange}
            variant="admin"
            includeBio
            maxBioLength={MAX_BIO_LENGTH}
          />
        </section>
      </div>
    </AdminLayout>
  );
};

export default AdminProfilePage;
