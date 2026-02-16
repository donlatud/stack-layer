# Stack Layer

แพลตฟอร์มบล็อก (Blog Platform) Full Stack — Frontend สำหรับ **Stack Layer** ที่เชื่อมต่อกับ Backend API

---

## ภาพรวม

| รายการ | รายละเอียด |
|--------|-------------|
| **Framework** | React 19 + TypeScript |
| **Build** | Vite 7 |
| **Styling** | TailwindCSS 4 |
| **Routing** | React Router DOM 7 |
| **Auth** | Context API + Supabase JWT |
| **Backend** | stack-layer-server (Express + PostgreSQL) |

---

## ฟีเจอร์หลัก

### ผู้ใช้สาธารณะ
- อ่านบทความ, ค้นหา, กรองหมวดหมู่

### สมาชิก (Member)
- แสดงความคิดเห็น, กด Like, แชร์บทความ  
- จัดการโปรไฟล์, เปลี่ยนรหัสผ่าน  
- Notifications (comments, likes, published)

### ผู้ดูแลระบบ (Admin)
- จัดการบทความ (สร้าง, แก้ไข, ลบ)  
- จัดการหมวดหมู่  
- หน้าการแจ้งเตือน  
- จัดการโปรไฟล์แอดมิน, เปลี่ยนรหัสผ่าน

---

## โครงสร้างโปรเจกต์

```
src/
├── components/     # UI Components (admin, Article, auth, layout, ui)
├── contexts/       # AuthContext
├── data/           # API clients (postsApi, commentsApi, likesApi, notificationsApi, ...)
├── pages/          # หน้าต่างๆ
├── services/       # authService
├── constants/      # categories, pagination
├── lib/            # utils, apiClient
├── types/          # TypeScript types
├── utils/          # helpers
├── App.tsx         # Routing
└── main.tsx        # Entry
```

---

## Routes หลัก

| Path | คำอธิบาย |
|------|----------|
| `/` | หน้าหลัก (Public) |
| `/post/:postId` | รายละเอียดบทความ (Public) |
| `/member` | หน้าหลักสมาชิก |
| `/member/post/:postId` | รายละเอียดบทความ (Member) |
| `/member/profile` | โปรไฟล์สมาชิก |
| `/member/reset-password` | เปลี่ยนรหัสผ่าน |
| `/admin/article` | จัดการบทความ |
| `/admin/category` | จัดการหมวดหมู่ |
| `/admin/notification` | การแจ้งเตือน |
| `/admin/profile` | โปรไฟล์แอดมิน |

---

## การเริ่มต้นใช้งาน

### 1. ติดตั้ง Dependencies

```bash
npm install
```

### 2. ตั้งค่า Environment

สร้าง `.env`:

```
VITE_API_BASE_URL=http://localhost:4000
```

### 3. รัน Frontend

```bash
npm run dev
```

### 4. รัน Backend

```bash
cd ../stack-layer-server
npm start
```

---

## Scripts

| Command | คำอธิบาย |
|---------|----------|
| `npm run dev` | รัน Dev Server |
| `npm run build` | Build สำหรับ Production |
| `npm run preview` | Preview Production Build |
| `npm run lint` | ตรวจสอบ ESLint |
