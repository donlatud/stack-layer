# Stack Layer - Blog Platform Documentation

## 📋 สารบัญ

1. [ภาพรวมโปรเจกต์](#ภาพรวมโปรเจกต์)
2. [เทคโนโลยีที่ใช้](#เทคโนโลยีที่ใช้)
3. [โครงสร้างโปรเจกต์](#โครงสร้างโปรเจกต์)
4. [Flow การทำงานของแอปพลิเคชัน](#flow-การทำงานของแอปพลิเคชัน)
5. [การเริ่มต้นใช้งาน](#การเริ่มต้นใช้งาน)
6. [อธิบายโค้ดแต่ละไฟล์](#อธิบายโค้ดแต่ละไฟล์)
7. [ส่วนที่ต้องรอ Backend](#ส่วนที่ต้องรอ-backend)
8. [การเชื่อมต่อ Backend](#การเชื่อมต่อ-backend)

---

## ภาพรวมโปรเจกต์

**Stack Layer** เป็นแพลตฟอร์มบล็อก (Blog Platform) ที่พัฒนาเป็น Full Stack Application แต่ปัจจุบันทำ Frontend เสร็จแล้ว และมี Backend API ที่แยกออกไป

### ฟีเจอร์หลัก

โปรเจกต์นี้รองรับ **3 ระดับผู้ใช้**:

1. **ผู้ใช้สาธารณะ (Public User)**
   - อ่านบทความได้
   - ค้นหาบทความ
   - กรองบทความตามหมวดหมู่
   - ดูรายละเอียดบทความ

2. **สมาชิก (Member)**
   - ฟีเจอร์ทั้งหมดของผู้ใช้สาธารณะ
   - แสดงความคิดเห็นในบทความ
   - กด Like บทความ
   - แชร์บทความ
   - จัดการโปรไฟล์
   - เปลี่ยนรหัสผ่าน

3. **ผู้ดูแลระบบ (Admin)**
   - ฟีเจอร์ทั้งหมดของสมาชิก
   - จัดการบทความ (สร้าง, แก้ไข, ลบ)
   - จัดการหมวดหมู่ (สร้าง, แก้ไข, ลบ)
   - จัดการโปรไฟล์แอดมิน
   - ดูการแจ้งเตือน
   - เปลี่ยนรหัสผ่าน

---

## เทคโนโลยีที่ใช้

### Core Technologies
- **React 19.2.0** - ไลบรารีสำหรับสร้าง User Interface
- **TypeScript 5.9.3** - เพิ่ม Type Safety ให้กับ JavaScript
- **Vite 7.2.4** - Build Tool และ Development Server ที่เร็วมาก

### Routing & State Management
- **React Router DOM 7.11.0** - จัดการการนำทางระหว่างหน้า
- **React Context API** - จัดการ State แบบ Global (Authentication)

### Styling
- **TailwindCSS 4.1.18** - Utility-first CSS Framework
- **@tailwindcss/vite** - Plugin สำหรับ Vite

### UI Components
- **Radix UI** - Headless UI Components (Select, Slot)
- **Lucide React** - Icon Library
- **Sonner** - Toast Notification Library

### Data & API
- **Axios 1.13.2** - HTTP Client สำหรับเรียก API
- **React Markdown** - แสดงเนื้อหาที่เป็น Markdown

### Utilities
- **clsx** - จัดการ className แบบ Conditional
- **tailwind-merge** - รวม Tailwind Classes โดยตัดค่าที่ซ้ำกัน

---

## โครงสร้างโปรเจกต์

```
stack-layer/
├── public/                 # ไฟล์ Static (รูปภาพ, icons)
│   └── vite.svg
├── src/
│   ├── assets/            # รูปภาพและ SVG ที่ใช้ในแอป
│   │   ├── author-logo.svg
│   │   ├── facebook-logo.svg
│   │   ├── github-logo.png
│   │   ├── google-logo.svg
│   │   ├── hamburger-bar.svg
│   │   ├── hero-image.png
│   │   ├── hh-logo.svg
│   │   ├── linkedin_logo.svg
│   │   ├── linkedin-black-logo.svg
│   │   └── twitter-logo.svg
│   │
│   ├── components/        # Components ทั้งหมด
│   │   ├── admin/         # Components สำหรับ Admin
│   │   │   ├── AdminConfirmModal.tsx
│   │   │   ├── AdminLayout.tsx
│   │   │   └── AdminSidebar.tsx
│   │   │
│   │   ├── Article/       # Components เกี่ยวกับบทความ
│   │   │   ├── ArticleSection.tsx
│   │   │   ├── detail/    # Components สำหรับหน้ารายละเอียด
│   │   │   ├── filters/  # Components สำหรับกรอง
│   │   │   ├── grid/     # Components สำหรับแสดง Grid
│   │   │   ├── header/   # Header ของ Article Section
│   │   │   └── search/   # Components สำหรับค้นหา
│   │   │
│   │   ├── auth/         # Components สำหรับ Authentication
│   │   │   ├── AuthFormCard.tsx
│   │   │   ├── AuthPageLayout.tsx
│   │   │   ├── FormInput.tsx
│   │   │   └── LoginForm.tsx
│   │   │
│   │   ├── common/       # Components ที่ใช้ร่วมกัน
│   │   │   ├── BlackButton.tsx
│   │   │   ├── LoginRequiredDialog.tsx
│   │   │   ├── PasswordInput.tsx
│   │   │   └── WhiteButton.tsx
│   │   │
│   │   ├── Hero/         # Components สำหรับ Hero Section
│   │   │   ├── AuthorCard.tsx
│   │   │   ├── HeroContent.tsx
│   │   │   └── HeroImage.tsx
│   │   │
│   │   ├── layout/       # Layout Components
│   │   │   ├── Footer.tsx
│   │   │   ├── MemberNavBar.tsx
│   │   │   ├── NavBar.tsx
│   │   │   └── UserDropdownMenu.tsx
│   │   │
│   │   ├── ui/           # UI Primitives (shadcn/ui)
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   └── select.tsx
│   │   │
│   │   └── HeroSection.tsx
│   │
│   ├── constants/        # ค่าคงที่
│   │   ├── categories.ts
│   │   └── pagination.ts
│   │
│   ├── contexts/         # React Context
│   │   └── AuthContext.tsx
│   │
│   ├── data/            # Data Services
│   │   └── blogPosts.ts
│   │
│   ├── lib/             # Utility Libraries
│   │   └── utils.ts
│   │
│   ├── pages/           # หน้าต่างๆ ของแอป
│   │   ├── admin/       # หน้าสำหรับ Admin
│   │   │   ├── AdminArticlePage.tsx
│   │   │   ├── AdminCategoryPage.tsx
│   │   │   ├── AdminLoginPage.tsx
│   │   │   ├── AdminNotificationPage.tsx
│   │   │   ├── AdminProfilePage.tsx
│   │   │   ├── AdminResetPasswordPage.tsx
│   │   │   ├── CheckDeleteArticlePage.tsx
│   │   │   ├── CheckDeleteCategoryPage.tsx
│   │   │   ├── CheckResetPasswordPage.tsx
│   │   │   ├── CreateArticlePage.tsx
│   │   │   └── CreateCategoryPage.tsx
│   │   │
│   │   ├── ArticleDetailPage.tsx
│   │   ├── HomePage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── MemberArticleDetailPage.tsx
│   │   ├── MemberHomePage.tsx
│   │   ├── NotFoundPage.tsx
│   │   ├── ProfileManagePage.tsx
│   │   ├── RegistrationSuccessPage.tsx
│   │   ├── ResetPasswordPage.tsx
│   │   └── SignupPage.tsx
│   │
│   ├── services/        # API Services
│   │   └── authService.ts
│   │
│   ├── types/           # TypeScript Types
│   │   └── blog.ts
│   │
│   ├── utils/           # Utility Functions
│   │   ├── blogUtils.ts
│   │   └── clipboardUtils.ts
│   │
│   ├── App.tsx          # Component หลัก (Routing)
│   ├── App.css
│   ├── index.css        # Global Styles
│   └── main.tsx         # Entry Point
│
├── .gitignore
├── components.json      # shadcn/ui config
├── eslint.config.js     # ESLint Configuration
├── index.html           # HTML Template
├── package.json         # Dependencies
├── package-lock.json
├── tsconfig.json        # TypeScript Config
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts       # Vite Configuration
```

---

## Flow การทำงานของแอปพลิเคชัน

### Step 1: การเริ่มต้นแอปพลิเคชัน

1. **index.html** ถูกโหลดโดย Browser
   - มี `<div id="root"></div>` สำหรับ React จะ mount component ลงไป

2. **main.tsx** เป็น Entry Point
   - Import `App` component
   - ใช้ `createRoot()` เพื่อสร้าง React Root
   - Render `App` component ลงใน `#root` element
   - ครอบด้วย `<StrictMode>` เพื่อตรวจสอบปัญหาในระหว่างพัฒนา

3. **App.tsx** เป็น Component หลัก
   - ตั้งค่า `BrowserRouter` สำหรับ Routing
   - ครอบด้วย `AuthProvider` เพื่อให้ทุก component เข้าถึง Authentication State
   - ตั้งค่า `Toaster` สำหรับแสดง Toast Notifications
   - กำหนด Routes ทั้งหมดของแอป

### Step 2: การตรวจสอบ Authentication

เมื่อแอปเริ่มทำงาน:

1. **AuthContext.tsx** ถูก initialize
   - ตรวจสอบ `localStorage` ว่ามีข้อมูล user หรือไม่
   - ถ้ามี → โหลดข้อมูล user และ set `isAuthenticated = true`
   - ถ้าไม่มี → `user = null` และ `isAuthenticated = false`

2. แต่ละ Page จะตรวจสอบ Authentication ตามความต้องการ:
   - **Public Pages** (`/`, `/post/:id`) → ไม่ต้องล็อกอิน
   - **Member Pages** (`/member/*`) → ต้องล็อกอิน (redirect ไป `/` ถ้ายังไม่ล็อกอิน)
   - **Admin Pages** (`/admin/*`) → ต้องล็อกอินเป็น Admin

### Step 3: การนำทาง (Navigation)

เมื่อผู้ใช้คลิกลิงก์หรือปุ่ม:

1. **React Router** จะตรวจสอบ URL
2. ดูว่า URL ตรงกับ Route ไหนใน `App.tsx`
3. Render Component ที่ตรงกับ Route นั้น
4. ถ้า Route ไม่ตรงกับอะไรเลย → แสดง `NotFoundPage`

### Step 4: การโหลดข้อมูลบทความ

เมื่อเข้าหน้าที่มีบทความ (เช่น `/` หรือ `/member`):

1. **ArticleSection** component ถูก render
2. เรียก `fetchBlogPosts()` จาก `data/blogPosts.ts`
3. ส่ง parameters (page, category, keyword) ไปยัง API
4. API ส่งข้อมูลกลับมา
5. แสดงบทความในรูปแบบ Grid โดยใช้ `ArticleGrid` และ `BlogCard`

---

## การเริ่มต้นใช้งาน

### Prerequisites
- Node.js (version 18 หรือสูงกว่า)
- npm หรือ yarn

### Installation

```bash
# ติดตั้ง dependencies
npm install

# รัน development server
npm run dev

# Build สำหรับ production
npm run build

# Preview production build
npm run preview

# ตรวจสอบ code quality
npm run lint
```

### Development Server

เมื่อรัน `npm run dev`:
- Server จะรันที่ `http://localhost:5173` (หรือ port อื่นถ้า 5173 ถูกใช้)
- มี Hot Module Replacement (HMR) - แก้ไขโค้ดแล้วเห็นผลทันที
- มี Error Overlay - แสดง error ใน browser

---

## อธิบายโค้ดแต่ละไฟล์

### 📁 Entry Point

#### `main.tsx`
**หน้าที่**: จุดเริ่มต้นของแอปพลิเคชัน

**โค้ด**:
```typescript
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

**อธิบาย**:
- `createRoot()` สร้าง React Root สำหรับ React 18+
- `document.getElementById("root")!` หา element ที่มี id="root" จาก index.html
- `!` หมายความว่าเรามั่นใจว่า element นี้มีอยู่แน่นอน
- `<StrictMode>` ช่วยตรวจสอบปัญหาในระหว่างพัฒนา
- Render `<App />` component ลงใน root element

**Flow**: Browser → index.html → main.tsx → App.tsx

---

#### `App.tsx`
**หน้าที่**: กำหนด Routing และโครงสร้างหลักของแอป

**โค้ดหลัก**:
```typescript
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="bottom-right" />
        <Routes>
          {/* Routes ทั้งหมด */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
```

**อธิบาย**:
- `<BrowserRouter>` ใช้ HTML5 History API สำหรับ routing
- `<AuthProvider>` ให้ทุก component เข้าถึง authentication state
- `<Toaster>` แสดง toast notifications ที่มุมล่างขวา
- `<Routes>` กำหนด route ทั้งหมด

**Routes แบ่งเป็น 3 กลุ่ม**:

1. **Public Routes** (ไม่ต้องล็อกอิน):
   - `/` → `HomePage`
   - `/post/:postId` → `ArticleDetailPage`
   - `/signup` → `SignupPage`
   - `/login` → `LoginPage`
   - `/registration-success` → `RegistrationSuccessPage`

2. **Member Routes** (ต้องล็อกอิน):
   - `/member` → `MemberHomePage`
   - `/member/post/:postId` → `MemberArticleDetailPage`
   - `/member/profile` → `ProfileManagePage`
   - `/member/reset-password` → `ResetPasswordPage`

3. **Admin Routes** (ต้องล็อกอินเป็น Admin):
   - `/admin/login` → `AdminLoginPage`
   - `/admin/article` → `AdminArticlePage`
   - `/admin/article/create` → `CreateArticlePage`
   - `/admin/article/:articleId/edit` → `CreateArticlePage` (edit mode)
   - `/admin/article/:articleId/delete` → `CheckDeleteArticlePage`
   - `/admin/category` → `AdminCategoryPage`
   - `/admin/category/create` → `CreateCategoryPage`
   - `/admin/category/:categoryId/edit` → `CreateCategoryPage` (edit mode)
   - `/admin/category/:categoryId/delete` → `CheckDeleteCategoryPage`
   - `/admin/profile` → `AdminProfilePage`
   - `/admin/notification` → `AdminNotificationPage`
   - `/admin/reset-password` → `AdminResetPasswordPage`
   - `/admin/reset-password/check` → `CheckResetPasswordPage`

4. **404 Route**:
   - `*` → `NotFoundPage` (ทุก route ที่ไม่ตรงกับข้างบน)

**Flow**: main.tsx → App.tsx → ตรวจสอบ route → render page ที่ตรงกัน

---

### 📁 Contexts

#### `contexts/AuthContext.tsx`
**หน้าที่**: จัดการ Authentication State แบบ Global

**โค้ดหลัก**:
```typescript
interface User {
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}
```

**อธิบาย**:
- **User Interface**: กำหนดโครงสร้างข้อมูล user (ชื่อ, อีเมล, รูปโปรไฟล์)
- **AuthContextType**: กำหนด API ที่ component อื่นๆ สามารถใช้ได้
  - `user`: ข้อมูล user ปัจจุบัน (null ถ้ายังไม่ล็อกอิน)
  - `isAuthenticated`: boolean บอกว่าล็อกอินหรือยัง
  - `login()`: ฟังก์ชันสำหรับล็อกอิน (รับข้อมูล user แล้วเก็บใน state และ localStorage)
  - `logout()`: ฟังก์ชันสำหรับล็อกเอาท์ (ลบข้อมูล user จาก state และ localStorage)
  - `updateUser()`: อัปเดตข้อมูล user บางส่วน

**การทำงาน**:
1. เมื่อ component ถูก mount → ตรวจสอบ `localStorage.getItem("user")`
2. ถ้ามีข้อมูล → parse JSON และ set เป็น initial state
3. เมื่อ `login()` ถูกเรียก → เก็บข้อมูลใน state และ localStorage
4. เมื่อ `logout()` ถูกเรียก → ลบข้อมูลจาก state และ localStorage
5. ทุก component ที่อยู่ใน `<AuthProvider>` สามารถใช้ `useAuth()` hook เพื่อเข้าถึง authentication state

**การใช้งาน**:
```typescript
// ใน component ใดๆ
import { useAuth } from "../contexts/AuthContext";

const MyComponent = () => {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  // ใช้ข้อมูล user
  if (isAuthenticated) {
    return <div>Hello, {user?.name}</div>;
  }
  
  return <div>Please log in</div>;
};
```

**Flow**: App.tsx → AuthProvider → ทุก component สามารถใช้ useAuth()

---

### 📁 Pages - Public

#### `pages/HomePage.tsx`
**หน้าที่**: หน้าหลักสำหรับผู้ใช้ที่ยังไม่ล็อกอิน

**โค้ด**:
```typescript
const HomePage = () => {
  return (
    <div className="w-full min-h-screen font-family-poppins flex flex-col">
      <NavBar />
      <HeroSection />
      <ArticleSection />
      <Footer />
    </div>
  );
};
```

**อธิบาย**:
- ใช้ `NavBar` แทน `MemberNavBar` (เพราะยังไม่ล็อกอิน)
- `HeroSection`: ส่วน Hero ที่มีข้อความต้อนรับและรูปภาพ
- `ArticleSection`: ส่วนแสดงรายการบทความ
- `Footer`: ส่วนท้ายหน้า

**Flow**: App.tsx → HomePage → Render NavBar, HeroSection, ArticleSection, Footer

---

#### `pages/ArticleDetailPage.tsx`
**หน้าที่**: หน้ารายละเอียดบทความสำหรับผู้ใช้สาธารณะ

**การทำงาน**:
1. รับ `postId` จาก URL parameter
2. ตรวจสอบว่าผู้ใช้ล็อกอินหรือไม่
   - ถ้าล็อกอินแล้ว → redirect ไป `/member/post/:postId`
3. เรียก API เพื่อหา article ที่มี id ตรงกับ `postId`
   - เนื่องจาก API แบ่งหน้า → ต้องค้นหาทุกหน้าไปเรื่อยๆ จนเจอ
4. แสดงข้อมูลบทความ:
   - `ArticleHeader`: หัวข้อบทความ
   - `ArticleMeta`: ข้อมูล meta (ผู้เขียน, วันที่, หมวดหมู่)
   - `ArticleContent`: เนื้อหาบทความ (Markdown)
   - `ArticleAuthorCard`: การ์ดผู้เขียน
   - `ArticleLikeAndShare`: ปุ่ม Like และ Share
   - `ArticleCommentSection`: ส่วนแสดงความคิดเห็น

**⚠️ Backend Required**: 
- การแสดงความคิดเห็นต้องเรียก API
- การ Like ต้องเรียก API (ตอนนี้เก็บใน localStorage)

**Flow**: 
1. User คลิกบทความ → `/post/:postId`
2. ArticleDetailPage ตรวจสอบ authentication
3. ถ้าล็อกอินแล้ว → redirect ไป `/member/post/:postId`
4. ถ้ายังไม่ล็อกอิน → โหลดข้อมูลบทความและแสดง

---

#### `pages/LoginPage.tsx`
**หน้าที่**: หน้าเข้าสู่ระบบสำหรับสมาชิก

**การทำงาน**:
1. ใช้ `LoginForm` component
2. เมื่อ submit form → เรียก `login()` จาก `authService.ts`
3. ถ้าสำเร็จ → เรียก `authLogin()` จาก `AuthContext` และ redirect ไป `/member`
4. ถ้าไม่สำเร็จ → แสดง error message

**⚠️ Backend Required**: 
- `authService.login()` ต้องเรียก API จริง (ตอนนี้เป็น mock)

**Flow**: 
1. User กรอก email และ password
2. Submit form → เรียก `authService.login()`
3. ถ้าสำเร็จ → อัปเดต AuthContext → redirect ไป `/member`
4. ถ้าไม่สำเร็จ → แสดง error

---

#### `pages/SignupPage.tsx`
**หน้าที่**: หน้าสมัครสมาชิก

**การทำงาน**:
1. มี form สำหรับกรอก: Name, Username, Email, Password
2. มี validation:
   - Name และ Username: ต้องไม่ว่าง
   - Email: ต้องเป็นรูปแบบ email ที่ถูกต้อง
   - Password: ต้องมีอย่างน้อย 6 ตัวอักษร
3. ตรวจสอบ email ซ้ำ (เรียก `checkEmailExists()`)
4. เมื่อ submit → เรียก `signup()` จาก `authService.ts`
5. ถ้าสำเร็จ → redirect ไป `/registration-success`

**⚠️ Backend Required**: 
- `authService.signup()` ต้องเรียก API จริง
- `authService.checkEmailExists()` ต้องเรียก API จริง

**Flow**: 
1. User กรอกข้อมูล
2. Validate form
3. ตรวจสอบ email ซ้ำ
4. Submit → เรียก `authService.signup()`
5. ถ้าสำเร็จ → redirect ไป `/registration-success`

---

### 📁 Pages - Member

#### `pages/MemberHomePage.tsx`
**หน้าที่**: หน้าหลักสำหรับสมาชิก (ล็อกอินแล้ว)

**การทำงาน**:
1. ตรวจสอบ `isAuthenticated` จาก `AuthContext`
2. ถ้ายังไม่ล็อกอิน → redirect ไป `/`
3. ถ้าล็อกอินแล้ว → แสดง:
   - `MemberNavBar` (มีเมนูผู้ใช้)
   - `HeroSection`
   - `ArticleSection`
   - `Footer`

**Flow**: 
1. User เข้า `/member`
2. ตรวจสอบ authentication
3. ถ้ายังไม่ล็อกอิน → redirect ไป `/`
4. ถ้าล็อกอินแล้ว → แสดงหน้า member

---

#### `pages/MemberArticleDetailPage.tsx`
**หน้าที่**: หน้ารายละเอียดบทความสำหรับสมาชิก

**ความแตกต่างจาก ArticleDetailPage**:
- ใช้ `MemberNavBar` แทน `NavBar`
- สามารถ Like บทความได้ (เก็บใน localStorage ตาม email)
- สามารถแสดงความคิดเห็นได้ (ต้องล็อกอิน)

**การทำงาน**:
1. ตรวจสอบ authentication → redirect ถ้ายังไม่ล็อกอิน
2. โหลดข้อมูลบทความ (เหมือน ArticleDetailPage)
3. โหลดสถานะ Like จาก localStorage (key: `liked_posts_${user.email}`)
4. เมื่อกด Like → อัปเดต localStorage และ state

**⚠️ Backend Required**: 
- การ Like ควรเก็บใน database (ตอนนี้เก็บใน localStorage)
- การแสดงความคิดเห็นต้องเรียก API
- การส่งความคิดเห็นต้องเรียก API

**Flow**: 
1. User คลิกบทความ → `/member/post/:postId`
2. ตรวจสอบ authentication
3. โหลดข้อมูลบทความ
4. โหลดสถานะ Like
5. แสดงบทความพร้อมฟีเจอร์ Like และ Comment

---

### 📁 Pages - Admin

#### `pages/admin/AdminLoginPage.tsx`
**หน้าที่**: หน้าเข้าสู่ระบบสำหรับ Admin

**⚠️ Backend Required**: 
- ต้องมี API สำหรับ admin login
- ต้องแยก authentication ระหว่าง member และ admin

**การทำงาน** (ปัจจุบัน):
- ใช้ `LoginForm` component
- มี subtitle "Admin panel"
- Logic login ยังเป็น placeholder (TODO)

---

#### `pages/admin/AdminArticlePage.tsx`
**หน้าที่**: หน้าจัดการบทความ (Admin)

**ฟีเจอร์**:
- แสดงตารางบทความทั้งหมด
- ค้นหาบทความ (search)
- กรองตาม Status (Published/Draft)
- กรองตาม Category
- ปุ่ม Create article
- ปุ่ม Edit และ Delete สำหรับแต่ละบทความ

**⚠️ Backend Required**: 
- ต้องเรียก API เพื่อดึงรายการบทความ
- ต้องเรียก API สำหรับ search และ filter
- ปุ่ม Delete ต้องเรียก API

**การทำงาน**:
1. โหลดรายการบทความ (ตอนนี้เป็น mock data)
2. Filter ตาม search query, status, category (client-side)
3. แสดงในตาราง
4. เมื่อคลิก Edit → ไป `/admin/article/:id/edit`
5. เมื่อคลิก Delete → ไป `/admin/article/:id/delete`

---

#### `pages/admin/CreateArticlePage.tsx`
**หน้าที่**: หน้าสร้าง/แก้ไขบทความ (Admin)

**ฟีเจอร์**:
- Upload thumbnail image
- เลือก Category
- กรอก Author name (read-only)
- กรอก Title
- กรอก Introduction (จำกัด 120 ตัวอักษร)
- กรอก Content
- ปุ่ม "Save as draft" และ "Save and publish"
- ปุ่ม "Delete article" (เฉพาะโหมดแก้ไข)

**⚠️ Backend Required**: 
- Upload image ต้องเรียก API
- Save article ต้องเรียก API (POST สำหรับ create, PUT สำหรับ edit)
- Delete article ต้องเรียก API

**การทำงาน**:
1. ตรวจสอบว่าเป็นโหมด create หรือ edit (ดูจาก URL parameter `articleId`)
2. ถ้าเป็น edit → โหลดข้อมูลบทความ (ตอนนี้เป็น mock)
3. เมื่อ submit:
   - "Save as draft" → บันทึกเป็น Draft
   - "Save and publish" → บันทึกและเผยแพร่
4. Redirect ไป `/admin/article` หลังบันทึกสำเร็จ

---

### 📁 Components - Layout

#### `components/layout/NavBar.tsx`
**หน้าที่**: แถบนำทางสำหรับผู้ใช้ที่ยังไม่ล็อกอิน

**ฟีเจอร์**:
- Logo (คลิกไปหน้าแรก)
- Hamburger menu (มือถือ)
- ปุ่ม "Log in" และ "Sign up" (เดสก์ท็อป)
- Shadow เมื่อ scroll ลง

**การทำงาน**:
1. ใช้ `useState` เพื่อจัดการ state:
   - `isScrolled`: ตรวจสอบว่าผู้ใช้ scroll หรือไม่
   - `isMenuOpen`: เปิด/ปิด hamburger menu
2. ใช้ `useEffect` เพื่อ:
   - ฟัง scroll event → อัปเดต `isScrolled`
   - ฟัง click outside และ ESC key → ปิด menu
3. Responsive:
   - Mobile: แสดง hamburger menu
   - Desktop: แสดงปุ่ม Log in และ Sign up

---

#### `components/layout/MemberNavBar.tsx`
**หน้าที่**: แถบนำทางสำหรับสมาชิก (ล็อกอินแล้ว)

**ฟีเจอร์**:
- Logo
- Notification bell (มี badge แสดงการแจ้งเตือน)
- Profile dropdown (แสดงชื่อ, รูปโปรไฟล์)
- Hamburger menu (มือถือ)

**การทำงาน**:
1. ใช้ `useAuth()` เพื่อดึงข้อมูล user
2. แสดงรูปโปรไฟล์ (หรือตัวอักษรแรกของชื่อถ้าไม่มีรูป)
3. Profile dropdown มีเมนู:
   - Profile → ไป `/member/profile`
   - Reset password → ไป `/member/reset-password`
   - Log out → เรียก `logout()` และ redirect ไป `/`

**⚠️ Backend Required**: 
- Notification bell ต้องเรียก API เพื่อดึงการแจ้งเตือน

---

### 📁 Components - Article

#### `components/Article/ArticleSection.tsx`
**หน้าที่**: ส่วนหลักสำหรับแสดงรายการบทความ

**การทำงาน**:
1. State management:
   - `selectedCategory`: หมวดหมู่ที่เลือก
   - `searchQuery`: คำค้นหา
   - `apiPosts`: บทความที่โหลดจาก API
   - `isLoading`: สถานะการโหลด
   - `currentPage`: หน้าปัจจุบัน
   - `hasMore`: ยังมีหน้าถัดไปหรือไม่

2. เมื่อเปลี่ยน category:
   - Reset ไปหน้า 1
   - เรียก `fetchBlogPosts()` ใหม่
   - อัปเดต `apiPosts`

3. Search (client-side):
   - ใช้ `filterPostsBySearch()` เพื่อกรอง `apiPosts` ตาม `searchQuery`
   - ไม่เรียก API เมื่อค้นหา (กรองฝั่ง client)

4. Load more:
   - เมื่อคลิก "View more" → เรียก `fetchBlogPosts()` หน้าถัดไป
   - Append บทความใหม่เข้า `apiPosts`

**Flow**: 
1. Component mount → โหลดบทความหน้าแรก (category: "Highlight")
2. User เปลี่ยน category → โหลดบทความใหม่
3. User พิมพ์ค้นหา → กรอง client-side
4. User คลิก "View more" → โหลดหน้าถัดไป

---

#### `components/Article/grid/BlogCard.tsx`
**หน้าที่**: การ์ดแสดงบทความแต่ละรายการ

**Props**:
- `id`: ID ของบทความ
- `image`: URL รูปภาพ
- `category`: หมวดหมู่
- `title`: หัวข้อ
- `description`: คำอธิบาย
- `author`: ผู้เขียน
- `date`: วันที่

**การทำงาน**:
1. ตรวจสอบ `isAuthenticated` จาก `AuthContext`
2. กำหนด URL:
   - ถ้าล็อกอิน → `/member/post/:id`
   - ถ้ายังไม่ล็อกอิน → `/post/:id`
3. แสดงข้อมูลบทความ
4. มี hover effect (scale และ shadow)

---

#### `components/Article/search/ArticleSearchBar.tsx`
**หน้าที่**: ช่องค้นหาบทความ

**การทำงาน**:
1. รับ `value` (search query) และ `onChange` callback
2. ใช้ `filterPostsBySearch()` เพื่อกรองบทความ
3. แสดง `ArticleSearchAutocomplete` เมื่อมี search query
4. Autocomplete แสดงรายการบทความที่ตรงกับคำค้นหา

---

### 📁 Services

#### `services/authService.ts`
**หน้าที่**: จัดการ Authentication API calls

**⚠️ ⚠️ ⚠️ BACKEND REQUIRED ⚠️ ⚠️ ⚠️**

ไฟล์นี้มี **mock implementation** ทั้งหมด ต้องแก้ไขเพื่อเรียก API จริง

**ฟังก์ชันที่ต้องแก้ไข**:

1. **`checkEmailExists(email: string)`**
   - **ปัจจุบัน**: ตรวจสอบกับ array ของ emails ที่ hardcode
   - **ต้องแก้**: เรียก API `GET /api/auth/check-email?email={email}`
   - **Response**: `{ exists: boolean }`

2. **`signup(data: SignupData)`**
   - **ปัจจุบัน**: Mock validation และ return success
   - **ต้องแก้**: เรียก API `POST /api/auth/signup`
   - **Request Body**: `{ name, username, email, password }`
   - **Response**: `{ success: boolean, message?: string, user?: User }`

3. **`login(data: LoginData)`**
   - **ปัจจุบัน**: ตรวจสอบกับ hardcoded credentials (`moodeng@gmail.com` / `123456`)
   - **ต้องแก้**: เรียก API `POST /api/auth/login`
   - **Request Body**: `{ email, password }`
   - **Response**: `{ success: boolean, message?: string, user?: User, token?: string }`
   - **Note**: ควรเก็บ token ใน localStorage หรือ httpOnly cookie

**ตัวอย่างการแก้ไข**:
```typescript
// แทนที่ mock implementation
export const login = async (data: LoginData): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>("/api/auth/login", data);
    
    if (response.data.success && response.data.user) {
      // เก็บ token ถ้ามี
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      return response.data;
    }
    
    return {
      success: false,
      message: response.data.message || "Login failed",
    };
  } catch (error) {
    console.error("Error during login:", error);
    return {
      success: false,
      message: "An error occurred during login. Please try again.",
    };
  }
};
```

---

### 📁 Data

#### `data/blogPosts.ts`
**หน้าที่**: จัดการ API calls สำหรับบทความ

**ฟังก์ชัน**:

1. **`formatDate(isoDateString: string)`**
   - แปลง ISO date string เป็นรูปแบบ "11 September 2024"
   - ไม่ต้องแก้ไข (ทำงานฝั่ง client)

2. **`fetchBlogPosts(params?: FetchBlogPostsParams)`**
   - **ปัจจุบัน**: เรียก API `https://blog-post-project-api.vercel.app/posts`
   - **Parameters**:
     - `page`: หน้าที่ต้องการ
     - `limit`: จำนวนบทความต่อหน้า
     - `category`: หมวดหมู่ (ถ้าไม่ใช่ "Highlight" หรือ "All")
     - `keyword`: คำค้นหา
   - **Response**: `BlogPostsResponse` (มี posts, totalPages, currentPage, etc.)
   - **Note**: API นี้ทำงานอยู่แล้ว แต่ควรตรวจสอบว่า backend มี endpoint นี้หรือไม่

**⚠️ Backend Required**: 
- ต้องมี API endpoint `/posts` ที่รองรับ query parameters ข้างต้น
- ต้อง return ข้อมูลในรูปแบบ `BlogPostsResponse`

---

### 📁 Utils

#### `utils/blogUtils.ts`
**หน้าที่**: Utility functions สำหรับบทความ

**ฟังก์ชัน**:

1. **`buildApiParams(page, category, keyword?)`**
   - สร้าง parameters object สำหรับเรียก API
   - ไม่ส่ง category ถ้าเป็น "Highlight" หรือ "All"
   - ไม่ต้องแก้ไข

2. **`filterPostsBySearch(posts, searchQuery)`**
   - กรองบทความตามคำค้นหา (ค้นหาใน title, description, content)
   - ทำงานฝั่ง client
   - ไม่ต้องแก้ไข

3. **`checkHasMore(response)`**
   - ตรวจสอบว่ายังมีหน้าถัดไปหรือไม่
   - ไม่ต้องแก้ไข

---

#### `utils/clipboardUtils.ts`
**หน้าที่**: Utility สำหรับ clipboard

**ฟังก์ชัน**:

1. **`copyLinkToClipboard(url: string)`**
   - คัดลอก URL ลง clipboard
   - แสดง toast notification
   - ไม่ต้องแก้ไข

---

### 📁 Types

#### `types/blog.ts`
**หน้าที่**: กำหนด TypeScript types สำหรับบทความ

**Interfaces**:

1. **`BlogPost`**
   ```typescript
   interface BlogPost {
     id: number;
     image: string;
     category: string;
     title: string;
     description: string;
     author: string;
     date: string;
     likes: number;
     content: string;
   }
   ```

2. **`BlogPostsResponse`**
   ```typescript
   interface BlogPostsResponse {
     totalPosts: number;
     totalPages: number;
     currentPage: number;
     limit: number;
     posts: BlogPost[];
     nextPage: number | null;
   }
   ```

3. **`FetchBlogPostsParams`**
   ```typescript
   interface FetchBlogPostsParams {
     page?: number;
     limit?: number;
     category?: string;
     keyword?: string;
   }
   ```

**⚠️ Backend Required**: 
- ต้องตรวจสอบว่า API response ตรงกับ types เหล่านี้หรือไม่
- อาจต้องเพิ่ม fields เช่น `comments`, `tags`, etc.

---

### 📁 Constants

#### `constants/categories.ts`
**หน้าที่**: กำหนดหมวดหมู่บทความ

```typescript
export const CATEGORIES = ["Highlight", "Cat", "Inspiration", "General"] as const;
```

**ไม่ต้องแก้ไข** (แต่ควรตรวจสอบกับ backend ว่ามีหมวดหมู่อะไรบ้าง)

---

#### `constants/pagination.ts`
**หน้าที่**: กำหนดค่าคงที่สำหรับ pagination

```typescript
export const DEFAULT_PAGE = 1;
export const POSTS_PER_PAGE = 6;
export const SPECIAL_CATEGORIES = ["Highlight", "All"] as const;
```

**ไม่ต้องแก้ไข**

---

## ส่วนที่ต้องรอ Backend

### 🔴 Critical (ต้องมีก่อนใช้งานจริง)

#### 1. Authentication Service (`services/authService.ts`)
- ✅ **`checkEmailExists()`** - ตรวจสอบ email ซ้ำ
- ✅ **`signup()`** - สมัครสมาชิก
- ✅ **`login()`** - เข้าสู่ระบบ

**ต้องแก้ไข**:
- เปลี่ยนจาก mock implementation เป็นเรียก API จริง
- เพิ่ม error handling
- จัดการ token (JWT) ที่ได้จาก API

---

#### 2. Admin Authentication
- ✅ **`pages/admin/AdminLoginPage.tsx`** - ต้องมี API สำหรับ admin login
- ✅ ต้องแยก authentication ระหว่าง member และ admin

**ต้องแก้ไข**:
- สร้าง `adminService.ts` สำหรับ admin authentication
- เพิ่ม role checking (member vs admin)

---

#### 3. Article Management (Admin)
- ✅ **`pages/admin/AdminArticlePage.tsx`** - ต้องมี API ดึงรายการบทความ
- ✅ **`pages/admin/CreateArticlePage.tsx`** - ต้องมี API สร้าง/แก้ไข/ลบบทความ
- ✅ **`pages/admin/CheckDeleteArticlePage.tsx`** - ต้องมี API ลบบทความ

**ต้องแก้ไข**:
- สร้าง `articleService.ts` สำหรับ CRUD operations
- API endpoints:
  - `GET /api/admin/articles` - ดึงรายการบทความ
  - `POST /api/admin/articles` - สร้างบทความ
  - `PUT /api/admin/articles/:id` - แก้ไขบทความ
  - `DELETE /api/admin/articles/:id` - ลบบทความ
  - `POST /api/admin/articles/:id/upload-image` - อัปโหลดรูปภาพ

---

#### 4. Category Management (Admin)
- ✅ **`pages/admin/AdminCategoryPage.tsx`** - ต้องมี API ดึงรายการหมวดหมู่
- ✅ **`pages/admin/CreateCategoryPage.tsx`** - ต้องมี API สร้าง/แก้ไข/ลบหมวดหมู่
- ✅ **`pages/admin/CheckDeleteCategoryPage.tsx`** - ต้องมี API ลบหมวดหมู่

**ต้องแก้ไข**:
- สร้าง `categoryService.ts` สำหรับ CRUD operations
- API endpoints:
  - `GET /api/admin/categories` - ดึงรายการหมวดหมู่
  - `POST /api/admin/categories` - สร้างหมวดหมู่
  - `PUT /api/admin/categories/:id` - แก้ไขหมวดหมู่
  - `DELETE /api/admin/categories/:id` - ลบหมวดหมู่

---

#### 5. Comments System
- ✅ **`components/Article/detail/ArticleCommentSection.tsx`** - ต้องมี API ดึง/ส่งความคิดเห็น
- ✅ **`components/Article/detail/CommentInput.tsx`** - ต้องมี API ส่งความคิดเห็น

**ต้องแก้ไข**:
- สร้าง `commentService.ts`
- API endpoints:
  - `GET /api/posts/:postId/comments` - ดึงความคิดเห็น
  - `POST /api/posts/:postId/comments` - ส่งความคิดเห็น
  - `DELETE /api/comments/:id` - ลบความคิดเห็น (ถ้ามี)

---

#### 6. Like System
- ✅ **`components/Article/detail/ArticleLikeAndShare.tsx`** - ต้องมี API สำหรับ Like

**ต้องแก้ไข**:
- ตอนนี้เก็บ Like ใน localStorage → ต้องย้ายไปเก็บใน database
- สร้าง `likeService.ts`
- API endpoints:
  - `GET /api/posts/:postId/likes` - ดึงจำนวน Like
  - `POST /api/posts/:postId/likes` - Like/Unlike บทความ
  - `GET /api/posts/:postId/liked` - ตรวจสอบว่า user like หรือยัง

---

### 🟡 Important (ควรมีแต่ไม่ critical)

#### 7. Profile Management
- ✅ **`pages/ProfileManagePage.tsx`** - ต้องมี API อัปเดตโปรไฟล์
- ✅ **`pages/admin/AdminProfilePage.tsx`** - ต้องมี API อัปเดตโปรไฟล์แอดมิน

**ต้องแก้ไข**:
- API endpoints:
  - `GET /api/user/profile` - ดึงข้อมูลโปรไฟล์
  - `PUT /api/user/profile` - อัปเดตโปรไฟล์
  - `POST /api/user/avatar` - อัปโหลดรูปโปรไฟล์

---

#### 8. Password Reset
- ✅ **`pages/ResetPasswordPage.tsx`** - ต้องมี API เปลี่ยนรหัสผ่าน
- ✅ **`pages/admin/AdminResetPasswordPage.tsx`** - ต้องมี API เปลี่ยนรหัสผ่านแอดมิน
- ✅ **`pages/admin/CheckResetPasswordPage.tsx`** - ต้องมี API ตรวจสอบ token

**ต้องแก้ไข**:
- API endpoints:
  - `POST /api/auth/forgot-password` - ขอ reset password (ส่ง email)
  - `POST /api/auth/reset-password` - เปลี่ยนรหัสผ่านด้วย token
  - `PUT /api/user/password` - เปลี่ยนรหัสผ่าน (ต้องล็อกอิน)

---

#### 9. Notifications
- ✅ **`pages/admin/AdminNotificationPage.tsx`** - ต้องมี API ดึงการแจ้งเตือน
- ✅ **`components/layout/MemberNavBar.tsx`** - Notification bell ต้องเรียก API

**ต้องแก้ไข**:
- API endpoints:
  - `GET /api/notifications` - ดึงการแจ้งเตือน
  - `PUT /api/notifications/:id/read` - ทำเครื่องหมายว่าอ่านแล้ว
  - `GET /api/notifications/unread-count` - ดึงจำนวนการแจ้งเตือนที่ยังไม่อ่าน

---

### 🟢 Nice to Have

#### 10. Search API
- ตอนนี้ค้นหาทำฝั่ง client → อาจย้ายไปค้นหาฝั่ง server สำหรับประสิทธิภาพที่ดีกว่า

**ต้องแก้ไข**:
- API endpoint: `GET /api/posts/search?keyword={keyword}`

---

## การเชื่อมต่อ Backend

### Step 1: ตั้งค่า API Base URL

สร้างไฟล์ `src/config/api.ts`:

```typescript
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: "/auth/login",
    SIGNUP: "/auth/signup",
    CHECK_EMAIL: "/auth/check-email",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
  },
  // Articles
  ARTICLES: {
    LIST: "/posts",
    DETAIL: (id: number) => `/posts/${id}`,
    CREATE: "/admin/articles",
    UPDATE: (id: number) => `/admin/articles/${id}`,
    DELETE: (id: number) => `/admin/articles/${id}`,
  },
  // Categories
  CATEGORIES: {
    LIST: "/admin/categories",
    CREATE: "/admin/categories",
    UPDATE: (id: number) => `/admin/categories/${id}`,
    DELETE: (id: number) => `/admin/categories/${id}`,
  },
  // Comments
  COMMENTS: {
    LIST: (postId: number) => `/posts/${postId}/comments`,
    CREATE: (postId: number) => `/posts/${postId}/comments`,
    DELETE: (id: number) => `/comments/${id}`,
  },
  // Likes
  LIKES: {
    TOGGLE: (postId: number) => `/posts/${postId}/likes`,
    COUNT: (postId: number) => `/posts/${postId}/likes`,
    CHECK: (postId: number) => `/posts/${postId}/liked`,
  },
};
```

### Step 2: ตั้งค่า Axios Interceptor

สร้างไฟล์ `src/lib/axios.ts`:

```typescript
import axios from "axios";
import { API_BASE_URL } from "../config/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - เพิ่ม token ทุก request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - จัดการ error
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token หมดอายุหรือไม่ถูกต้อง
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default apiClient;
```

### Step 3: แก้ไข Services

แก้ไข `services/authService.ts`:

```typescript
import apiClient from "../lib/axios";
import { API_ENDPOINTS } from "../config/api";

export const login = async (data: LoginData): Promise<LoginResponse> => {
  try {
    const response = await apiClient.post<LoginResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      data
    );
    
    if (response.data.success && response.data.user) {
      // เก็บ token
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      return response.data;
    }
    
    return {
      success: false,
      message: response.data.message || "Login failed",
    };
  } catch (error: any) {
    console.error("Error during login:", error);
    return {
      success: false,
      message: error.response?.data?.message || "An error occurred during login. Please try again.",
    };
  }
};

// ทำแบบเดียวกันสำหรับ signup และ checkEmailExists
```

### Step 4: สร้าง Service Files ใหม่

สร้าง `services/articleService.ts`:

```typescript
import apiClient from "../lib/axios";
import { API_ENDPOINTS } from "../config/api";
import type { BlogPost } from "../types/blog";

export const getArticles = async (params?: {
  page?: number;
  limit?: number;
  category?: string;
  keyword?: string;
}) => {
  const response = await apiClient.get(API_ENDPOINTS.ARTICLES.LIST, { params });
  return response.data;
};

export const getArticle = async (id: number): Promise<BlogPost> => {
  const response = await apiClient.get(API_ENDPOINTS.ARTICLES.DETAIL(id));
  return response.data;
};

export const createArticle = async (data: FormData) => {
  const response = await apiClient.post(API_ENDPOINTS.ARTICLES.CREATE, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateArticle = async (id: number, data: FormData) => {
  const response = await apiClient.put(API_ENDPOINTS.ARTICLES.UPDATE(id), data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteArticle = async (id: number) => {
  const response = await apiClient.delete(API_ENDPOINTS.ARTICLES.DELETE(id));
  return response.data;
};
```

### Step 5: Environment Variables

สร้างไฟล์ `.env`:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

และ `.env.production`:

```env
VITE_API_BASE_URL=https://your-api-domain.com/api
```

---

## สรุป

โปรเจกต์ **Stack Layer** เป็น Blog Platform ที่มี Frontend เสร็จสมบูรณ์แล้ว แต่ยังต้องเชื่อมต่อกับ Backend API ในหลายส่วน:

### ✅ ส่วนที่ทำงานแล้ว
- UI/UX ทั้งหมด
- Routing
- Authentication Context (frontend)
- การแสดงบทความ (อ่านข้อมูลจาก API ที่มีอยู่)
- Search และ Filter (client-side)

### ⚠️ ส่วนที่ต้องรอ Backend
- Authentication (login, signup)
- CRUD Operations (Articles, Categories)
- Comments System
- Like System
- Profile Management
- Password Reset
- Notifications

### 📝 ขั้นตอนต่อไป
1. สร้าง Backend API ตาม endpoints ที่ระบุ
2. แก้ไข services เพื่อเรียก API จริง
3. เพิ่ม error handling
4. เพิ่ม loading states
5. Test integration

---

**หมายเหตุ**: README นี้เขียนเพื่อให้เข้าใจโค้ดทุกบรรทัดและ logic ต่างๆ ของโปรเจกต์ หากมีคำถามหรือต้องการความชัดเจนเพิ่มเติม กรุณาติดต่อทีมพัฒนา
