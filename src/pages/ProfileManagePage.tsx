import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useRequireAuth, useProfileForm } from "../hooks";
import MemberProfileLayout from "../components/layout/MemberProfileLayout";
import {
  ProfileAvatarBlock,
  ProfileFormFields,
} from "../components/profile";
import { X, CheckCircle } from "lucide-react";
import BlackButton from "../components/common/BlackButton";

/** no-op เมื่ออยู่ที่แท็บ Profile อยู่แล้ว */
const noop = () => {};

/**
 * หน้าโปรไฟล์สมาชิก: รูป, ชื่อ, username, อีเมล; แท็บสลับไป Reset password
 * ต้องล็อกอิน; ยังไม่ล็อกอินจะ redirect ไป /login
 */
const ProfileManagePage = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const { isReady } = useRequireAuth({ redirectTo: "/login" });
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

  const {
    formData,
    displayName,
    displayAvatar,
    handleChange,
    handleImageUpload,
    handleSave: saveProfile,
    isSaving,
  } = useProfileForm({ user, updateUser });

  const handleSave = () => {
    saveProfile({
      onSuccess: () => {
        setShowSuccessNotification(true);
        setTimeout(() => setShowSuccessNotification(false), 5000);
      },
    });
  };

  const handleCloseNotification = () => {
    setShowSuccessNotification(false);
  };

  if (!isReady) {
    return null;
  }

  const mobileChildren = (
    <>
      <ProfileAvatarBlock
        displayAvatar={displayAvatar}
        displayName={displayName}
        onImageUpload={handleImageUpload}
        variant="member-mobile"
      />
      <ProfileFormFields
        formData={formData}
        onChange={handleChange}
        variant="member-mobile"
        formClassName="mb-[32px]"
      />
      <div className="flex justify-start">
        <BlackButton
          onClick={handleSave}
          className="h-[48px] max-w-[120px] disabled:opacity-50"
          disabled={isSaving}
        >
          Save
        </BlackButton>
      </div>
    </>
  );

  const desktopChildren = (
    <>
      <ProfileAvatarBlock
        displayAvatar={displayAvatar}
        displayName={displayName}
        onImageUpload={handleImageUpload}
        variant="member-desktop"
      />
      <div className="w-full h-px bg-brown-300 my-[32px]" />
      <ProfileFormFields
        formData={formData}
        onChange={handleChange}
        variant="member-desktop"
        formClassName="mb-[32px]"
      />
      <div className="flex justify-start">
        <BlackButton
          onClick={handleSave}
          className="h-[44px] min-w-[120px] disabled:opacity-50"
          disabled={isSaving}
        >
          Save
        </BlackButton>
      </div>
    </>
  );

  return (
    <>
      <MemberProfileLayout
        activeTab="profile"
        displayName={displayName}
        displayAvatar={displayAvatar}
        pageTitle="Profile"
        onProfileClick={noop}
        onResetPasswordClick={() => navigate("/member/reset-password")}
        mobileChildren={mobileChildren}
        desktopChildren={desktopChildren}
      />

      {showSuccessNotification && (
        <>
          <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden px-[16px] pb-[16px]">
            <div className="bg-brand-green rounded-[12px] px-[16px] py-[16px] flex items-start justify-between gap-[16px] shadow-lg">
              <div className="flex flex-col gap-[4px] flex-1">
                <p className="text-body-1 text-white font-semibold">Saved profile</p>
                <p className="text-body-2 text-white">Your profile has been successfully updated</p>
              </div>
              <button
                onClick={handleCloseNotification}
                className="w-[24px] h-[24px] flex items-center justify-center shrink-0 text-white hover:opacity-80 transition-opacity"
                aria-label="Close notification"
                type="button"
              >
                <X className="w-[20px] h-[20px]" />
              </button>
            </div>
          </div>
          <div className="hidden lg:block fixed bottom-[24px] right-[24px] z-50 animate-in slide-in-from-bottom-2 duration-300">
            <div className="bg-brand-green rounded-[12px] px-[20px] py-[16px] flex items-center gap-[12px] shadow-lg min-w-[320px]">
              <CheckCircle className="w-[24px] h-[24px] text-white shrink-0" />
              <div className="flex flex-col gap-[2px] flex-1">
                <p className="text-body-1 text-white font-semibold">Saved profile</p>
                <p className="text-body-2 text-white/90">Your profile has been successfully updated</p>
              </div>
              <button
                onClick={handleCloseNotification}
                className="w-[24px] h-[24px] flex items-center justify-center shrink-0 text-white hover:opacity-80 transition-opacity"
                aria-label="Close notification"
                type="button"
              >
                <X className="w-[20px] h-[20px]" />
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProfileManagePage;
