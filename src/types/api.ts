/** โครงสร้าง post จาก API (stack-layer-server) ใช้ร่วมกันใน blogPosts และ postsApi */
export interface ApiPost {
  id: number;
  image: string;
  category_id: number;
  title: string;
  description: string;
  date: string;
  content: string;
  status_id: number;
  likes_count?: number;
  is_liked?: boolean;
}
