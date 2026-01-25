import { useState } from "react";
import { toast } from "sonner";
import AdminLayout from "../../components/admin/AdminLayout";
import BlackButton from "../../components/common/BlackButton";
import { cn } from "../../lib/utils";

/** คลาส input ใช้ร่วมกันในฟอร์มโปรไฟล์ (ความกว้าง โฟกัส ขอบ) */
const PROFILE_INPUT_CLASS =
  "w-[480px] max-w-full h-[44px] px-[16px] bg-white border border-gray-300 rounded-[8px] text-body-1 text-[#2D2D2D] focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-brand-red";

const MAX_BIO_LENGTH = 120;

/**
 * หน้าโปรไฟล์ (Admin)
 * แก้ไขชื่อ, username, อีเมล, Bio; อัปโหลดรูป; ปุ่ม Save
 */
const AdminProfilePage = () => {
  const [formData, setFormData] = useState({
    name: "Thompson P.",
    username: "thompson",
    email: "thompson.p@gmail.com",
    bio: "I am a pet enthusiast and freelance writer who specializes in animal behavior and care. With a deep love for cats, I enjoy sharing insights on feline companionship and wellness.\nWhen I'm not writing, I spend time volunteering at my local animal shelter, helping cats find loving homes.",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // Bio จำกัดไม่เกิน MAX_BIO_LENGTH ตัวอักษร
    if (name === "bio" && value.length > MAX_BIO_LENGTH) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // TODO: เรียก API บันทึกโปรไฟล์
    console.log("Saving profile:", formData);
    toast.success("Saved profile", {
      description: "Your profile has been successfully updated",
      duration: 2000,
      className: "toast-success-custom",
    });
  };

  const bioLength = formData.bio.length;

  return (
    <AdminLayout activeItem="profile">
      <div className="w-full h-full bg-brown-100 p-[40px]">
        {/* Header */}
        <div className="-mx-[40px] border-b border-gray-200">
          <header className="flex items-center justify-between px-[40px] h-[96px]">
            <h1 className="text-headline-3 text-brown-600">Profile</h1>
            <BlackButton onClick={handleSubmit} className="h-[44px] px-[24px]">
              Save
            </BlackButton>
          </header>
        </div>

        {/* Profile Form */}
        <section className="max-w-[1160px] pl-[32px] pt-[32px]">
          {/* Profile Picture Section */}
          <div className="flex items-center gap-[24px] mb-[32px]">
            <div className="w-[96px] h-[96px] rounded-full bg-gray-200 flex items-center justify-center overflow-hidden shrink-0">
              <span className="text-headline-2 text-gray-600 font-medium">
                {formData.name.charAt(0)}
              </span>
            </div>
            <label>
              <input
                type="file"
                accept="image/*"
                className="hidden"
              />
              <div className="h-[44px] px-[24px] rounded-[999px] bg-white border border-gray-300 text-[#2D2D2D] text-body-1 font-medium flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                Upload profile picture
              </div>
            </label>
          </div>

          <div className="h-px bg-gray-200 mb-[32px]" />

          {/* Form Fields */}
          <form className="flex flex-col gap-[24px]">
            <div className="flex flex-col gap-[4px]">
              <label htmlFor="name" className="text-body-2 text-gray-600">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={PROFILE_INPUT_CLASS}
              />
            </div>

            <div className="flex flex-col gap-[4px]">
              <label htmlFor="username" className="text-body-2 text-gray-600">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={PROFILE_INPUT_CLASS}
              />
            </div>

            <div className="flex flex-col gap-[4px]">
              <label htmlFor="email" className="text-body-2 text-gray-600">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={PROFILE_INPUT_CLASS}
              />
            </div>

            <div className="flex flex-col gap-[4px]">
              <div className="flex items-center justify-between">
                <label htmlFor="bio" className="text-body-2 text-gray-600">
                  Bio (max 120 letters)
                </label>
                <span
                  className={cn(
                    "text-body-3",
                    bioLength > MAX_BIO_LENGTH ? "text-brand-red" : "text-gray-400"
                  )}
                >
                  {bioLength}/{MAX_BIO_LENGTH}
                </span>
              </div>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={5}
                className="w-full px-[16px] py-[12px] bg-white border border-gray-300 rounded-[8px] text-body-1 text-[#2D2D2D] resize-none focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-brand-red"
              />
            </div>
          </form>
        </section>
      </div>
    </AdminLayout>
  );
};

export default AdminProfilePage;
