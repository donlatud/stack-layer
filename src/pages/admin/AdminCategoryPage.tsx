import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import BlackButton from "../../components/common/BlackButton";
import { fetchCategories } from "../../data/categoriesApi";
import type { CategoryItem } from "../../data/categoriesApi";

/**
 * หน้าจัดการหมวดหมู่ (Admin)
 * - ดึงรายการจาก API, ค้นหาตามชื่อ (client-side)
 * - ปุ่มสร้าง/แก้ไข/ลบ
 */
const AdminCategoryPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        console.error("Error loading categories:", err);
        setError("Failed to load categories. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    loadCategories();
  }, []);

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return categories;
    const q = searchQuery.trim().toLowerCase();
    return categories.filter((c) => c.name.toLowerCase().includes(q));
  }, [categories, searchQuery]);

  return (
    <AdminLayout activeItem="category">
      <div className="w-full h-full bg-brown-100 p-[40px]">
        {/* Header */}
        <div className="-mx-[40px] border-b border-gray-200">
          <header className="flex items-center justify-between px-[40px] h-[96px]">
            <h1 className="text-headline-3 text-brown-600">Category management</h1>
            <BlackButton
              className="flex items-center gap-[8px] w-[242px] h-[44px] px-[24px]"
              onClick={() => navigate("/admin/category/create")}
            >
              <Plus className="w-[20px] h-[20px]" />
              <span>create category</span>
            </BlackButton>
          </header>
        </div>

        {/* Search */}
        <div className="mt-[32px] mb-[24px]">
          <div className="relative max-w-[400px]">
            <label htmlFor="admin-category-search" className="sr-only">
              Search categories
            </label>
            <Search className="absolute left-[16px] top-1/2 -translate-y-1/2 w-[20px] h-[20px] text-gray-400" />
            <input
              id="admin-category-search"
              type="text"
              placeholder="search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-[44px] pl-[48px] pr-[16px] bg-white border border-gray-300 rounded-[8px] text-body-1 text-[#2D2D2D] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-[#FF6B6B]"
            />
          </div>
        </div>

        {/* Category List */}
        <div className="bg-white rounded-[8px] border border-gray-200 overflow-hidden">
          <div className="px-[24px] py-[12px] border-b border-gray-200">
            <h2 className="text-body-2 text-gray-600 font-medium">Category</h2>
          </div>
          {isLoading ? (
            <div className="px-[24px] py-[32px] text-body-1 text-gray-500">
              Loading...
            </div>
          ) : error ? (
            <div className="px-[24px] py-[32px] text-body-1 text-brand-red">
              {error}
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {filteredCategories.length === 0 ? (
                <li className="px-[24px] py-[32px] text-body-1 text-gray-500">
                  {categories.length === 0
                    ? "No categories yet."
                    : "No categories match your search."}
                </li>
              ) : (
                filteredCategories.map((category) => (
                  <li
                    key={category.id}
                    className="px-[24px] py-[16px] flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-body-1 text-[#2D2D2D]">
                      {category.name}
                    </span>
                    <div className="flex items-center gap-[12px]">
                      <button
                        className="w-[32px] h-[32px] flex items-center justify-center text-gray-600 hover:text-brand-red transition-colors"
                        type="button"
                        aria-label={`Edit category: ${category.name}`}
                        onClick={() =>
                          navigate(`/admin/category/${category.id}/edit`)
                        }
                      >
                        <Edit className="w-[18px] h-[18px]" />
                      </button>
                      <button
                        className="w-[32px] h-[32px] flex items-center justify-center text-gray-600 hover:text-red-600 transition-colors"
                        type="button"
                        aria-label={`Delete category: ${category.name}`}
                        onClick={() =>
                          navigate(`/admin/category/${category.id}/delete`)
                        }
                      >
                        <Trash2 className="w-[18px] h-[18px]" />
                      </button>
                    </div>
                  </li>
                ))
              )}
            </ul>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminCategoryPage;
