import { apiClient } from "../lib/apiClient";

/** โครงสร้าง category จาก API */
export interface CategoryItem {
  id: number;
  name: string;
}

/** ดึงรายการหมวดหมู่ทั้งหมด */
export const fetchCategories = async (): Promise<CategoryItem[]> => {
  const response = await apiClient.get<{ data: CategoryItem[] }>("/categories");
  return response.data.data;
};

/** ดึงหมวดหมู่ตาม id */
export const fetchCategoryById = async (
  categoryId: string
): Promise<CategoryItem | null> => {
  try {
    const response = await apiClient.get<{ data: CategoryItem }>(
      `/categories/${categoryId}`
    );
    return response.data.data;
  } catch {
    return null;
  }
};

/** สร้างหมวดหมู่ใหม่ */
export const createCategory = async (
  name: string
): Promise<CategoryItem> => {
  const response = await apiClient.post<{ data: CategoryItem }>("/categories", {
    name: name.trim(),
  });
  return response.data.data;
};

/** แก้ไขหมวดหมู่ */
export const updateCategory = async (
  categoryId: string,
  name: string
): Promise<CategoryItem> => {
  const response = await apiClient.put<{ data: CategoryItem }>(
    `/categories/${categoryId}`,
    { name: name.trim() }
  );
  return response.data.data;
};

/** ลบหมวดหมู่ */
export const deleteCategory = async (categoryId: string): Promise<void> => {
  await apiClient.delete(`/categories/${categoryId}`);
};
