import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import MemberNavBar from "../components/layout/MemberNavBar";
import { User, Lock, X, CheckCircle } from "lucide-react";
import BlackButton from "../components/common/BlackButton";

/**
 * ProfileManagePage component - Profile management page for logged-in users
 * Mobile-responsive design with profile picture upload, name, username, and email fields
 * Includes segmented navigation to switch between Profile and Reset password
 */
const ProfileManagePage = () => {
  const { isAuthenticated, user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    username: user?.email?.split("@")[0] || "",
    email: user?.email || "",
  });
  const [profileImage, setProfileImage] = useState<string | null>(user?.avatar || null);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        username: user.email?.split("@")[0] || "",
        email: user.email || "",
      });
      setProfileImage(user.avatar || null);
    }
  }, [user]);

  if (!isAuthenticated) {
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    updateUser({
      name: formData.name,
      avatar: profileImage || undefined,
    });
    setShowSuccessNotification(true);
    
    // Auto hide after 5 seconds
    setTimeout(() => {
      setShowSuccessNotification(false);
    }, 5000);
  };

  const handleCloseNotification = () => {
    setShowSuccessNotification(false);
  };

  const handleNavigateToResetPassword = () => {
    navigate("/member/reset-password");
  };

  const displayName = formData.name || user?.name || "User";
  const displayAvatar = profileImage || user?.avatar || null;

  return (
    <div className="w-full min-h-screen font-family-poppins flex flex-col bg-brown-100">
      <MemberNavBar />

      <main className="flex-1 w-full px-[16px] py-[24px] flex flex-col lg:px-[80px] lg:py-[40px]">
        {/* Mobile Layout */}
        <div className="flex flex-col lg:hidden">
          <section className="bg-white -mx-[16px] px-[16px] -mt-[24px] pt-[24px]">
            {/* Segmented Navigation */}
            <div className="flex items-center gap-[32px] mb-[12px]">
              <button
                onClick={() => { }}
                className="flex items-center gap-[8px] text-brown-600 font-semibold"
              >
                <User className="w-[20px] h-[20px]" />
                <span className="text-body-1">Profile</span>
              </button>
              <button
                onClick={handleNavigateToResetPassword}
                className="flex items-center gap-[8px] text-brown-400 font-normal"
              >
                <Lock className="w-[20px] h-[20px]" />
                <span className="text-body-1">Reset password</span>
              </button>
            </div>

            {/* User Info Section */}
            <div className="flex items-center gap-[12px] pt-[8px] pb-[12px]">
              <div className="w-[44px] h-[44px] rounded-full bg-brown-300 flex items-center justify-center shrink-0 overflow-hidden">
                {displayAvatar ? (
                  <img
                    src={displayAvatar}
                    alt={displayName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-body-1 text-brown-600 font-medium">
                    {displayName.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <span className="text-headline-4 text-brown-400">{displayName}</span>
              <span className="w-px h-[20px] bg-brown-300" aria-hidden="true" />
              <span className="text-headline-4 text-brown-600 font-semibold">Profile</span>
            </div>
          </section>

          <section className="bg-brown-200 -mx-[16px] px-[16px] flex-1 -mb-[24px] pb-[24px]">
            {/* Profile Picture Section */}
            <div className="flex flex-col items-center mb-[32px]">
              <div className="w-[150px] h-[150px] rounded-full bg-brown-300 flex items-center justify-center overflow-hidden my-[24px]">
                {displayAvatar ? (
                  <img
                    src={displayAvatar}
                    alt={displayName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-headline-2 text-brown-600 font-medium">
                    {displayName.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <label className="w-full max-w-[260px]">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <div className="w-full h-[48px] rounded-[999px] bg-white border border-brown-400 text-brown-600 text-body-1 font-medium flex items-center justify-center cursor-pointer transition-colors">
                  Upload profile picture
                </div>
              </label>
            </div>

            {/* Form Section */}
            <form className="flex flex-col gap-[24px] mb-[32px]">
              {/* Name Field */}
              <div className="flex flex-col gap-[4px]">
                <label htmlFor="name" className="text-body-1 text-brown-400">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full h-[48px] px-[16px] py-[12px] bg-white border border-brown-300 rounded-[8px] text-body-1 text-brown-500 placeholder:text-brown-400 focus:outline-none focus:ring-2 focus:ring-brown-400 focus:border-brown-400"
                  placeholder="Name"
                />
              </div>

              {/* Username Field */}
              <div className="flex flex-col gap-[4px]">
                <label htmlFor="username" className="text-body-1 text-brown-400">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full h-[48px] px-[16px] py-[12px] bg-white border border-brown-300 rounded-[8px] text-body-1 text-brown-500 placeholder:text-brown-400 focus:outline-none focus:ring-2 focus:ring-brown-400 focus:border-brown-400"
                  placeholder="Username"
                />
              </div>

              {/* Email Field (Read-only) */}
              <div className="flex flex-col gap-[4px]">
                <label htmlFor="email" className="text-body-1 text-brown-400">
                  Email
                </label>
                <div className="w-full h-[48px] px-[16px] py-[12px] text-body-1 text-brown-400">
                  {formData.email}
                </div>
              </div>
            </form>

            {/* Save Button */}
            <div className="flex justify-start">
              <BlackButton onClick={handleSave} className="h-[48px] max-w-[120px]">
                Save
              </BlackButton>
            </div>
          </section>
        </div>

        {/* Desktop Layout (lg and above) */}
        <div className="hidden lg:flex lg:flex-col lg:max-w-[900px] lg:mx-auto lg:w-full">
          {/* Top Header: User Info + Page Title */}
          <header className="flex items-center gap-[12px] mb-[32px]">
            <div className="w-[44px] h-[44px] rounded-full bg-brown-300 flex items-center justify-center shrink-0 overflow-hidden">
              {displayAvatar ? (
                <img
                  src={displayAvatar}
                  alt={displayName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-body-1 text-brown-600 font-medium">
                  {displayName.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <span className="text-body-1 text-brown-500">{displayName}</span>
            <span className="w-px h-[20px] bg-brown-300" aria-hidden="true" />
            <span className="text-headline-4 text-brown-600 font-semibold">Profile</span>
          </header>

          {/* Main Content: Sidebar + Form Card */}
          <div className="flex gap-[40px]">
            {/* Left Sidebar - Navigation */}
            <aside className="shrink-0 w-[180px]">
              <nav className="flex flex-col gap-[16px]">
                <button
                  onClick={() => { }}
                  className="flex items-center gap-[8px] text-brown-600 font-semibold text-left"
                >
                  <div className="w-[6px] h-[6px] rounded-full bg-brown-500 shrink-0" />
                  <User className="w-[20px] h-[20px]" />
                  <span className="text-body-1">Profile</span>
                </button>
                <button
                  onClick={handleNavigateToResetPassword}
                  className="flex items-center gap-[8px] text-brown-400 font-normal text-left"
                >
                  <div className="w-[6px] h-[6px] rounded-full bg-transparent shrink-0" />
                  <Lock className="w-[20px] h-[20px]" />
                  <span className="text-body-1">Reset password</span>
                </button>
              </nav>
            </aside>

            {/* Right Content Card */}
            <div className="flex-1">
              <div className="bg-brown-200 rounded-[12px] p-[40px] w-[550px] h-[652px] xl:p-[48px] 2xl:p-[56px]">
                <div className="xl:max-w-[600px] 2xl:max-w-[700px]">
                  {/* Profile Picture Section */}
                  <div className="flex items-center gap-[40px] mb-[32px]">
                    <div className="w-[100px] h-[100px] rounded-full bg-brown-300 flex items-center justify-center shrink-0 overflow-hidden">
                      {displayAvatar ? (
                        <img
                          src={displayAvatar}
                          alt={displayName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-headline-2 text-brown-600 font-medium">
                          {displayName.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <div className="h-[44px] px-[24px] rounded-[999px] bg-white border border-brown-400 text-brown-600 text-body-1 font-medium flex items-center justify-center cursor-pointer transition-colors hover:bg-brown-50">
                        Upload profile picture
                      </div>
                    </label>
                  </div>

                  {/* Divider Line */}
                  <div className="w-full h-px bg-brown-300 my-[32px]" />

                  {/* Form Section */}
                  <form className="flex flex-col gap-[32px] mb-[32px]">
                    {/* Name Field */}
                    <div className="flex flex-col gap-[4px]">
                      <label htmlFor="name-desktop" className="text-body-2 text-brown-400">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name-desktop"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full h-[44px] px-[16px] py-[12px] bg-white border border-brown-300 rounded-[8px] text-body-1 text-brown-500 placeholder:text-brown-400 focus:outline-none focus:ring-2 focus:ring-brown-400 focus:border-brown-400"
                        placeholder="Name"
                      />
                    </div>

                    {/* Username Field */}
                    <div className="flex flex-col gap-[4px]">
                      <label htmlFor="username-desktop" className="text-body-2 text-brown-400">
                        Username
                      </label>
                      <input
                        type="text"
                        id="username-desktop"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full h-[44px] px-[16px] py-[12px] bg-white border border-brown-300 rounded-[8px] text-body-1 text-brown-500 placeholder:text-brown-400 focus:outline-none focus:ring-2 focus:ring-brown-400 focus:border-brown-400"
                        placeholder="Username"
                      />
                    </div>

                    {/* Email Field (Read-only) */}
                    <div className="flex flex-col gap-[4px]">
                      <label htmlFor="email-desktop" className="text-body-2 text-brown-400">
                        Email
                      </label>
                      <div className="w-full h-[44px] px-[16px] py-[12px] bg-white border border-brown-300 rounded-[8px] text-body-1 text-brown-400">
                        {formData.email}
                      </div>
                    </div>
                  </form>

                  {/* Save Button */}
                  <div className="flex justify-start">
                    <BlackButton onClick={handleSave} className="h-[44px] min-w-[120px]">
                      Save
                    </BlackButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Success Notification - Mobile Only */}
      {showSuccessNotification && (
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
            >
              <X className="w-[20px] h-[20px]" />
            </button>
          </div>
        </div>
      )}

      {/* Success Notification - Desktop (lg and above) */}
      {showSuccessNotification && (
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
            >
              <X className="w-[20px] h-[20px]" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileManagePage;
