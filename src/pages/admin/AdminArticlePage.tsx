import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import { Plus, Search, Edit, Trash2, ChevronDown } from "lucide-react";
import BlackButton from "../../components/common/BlackButton";
import { cn } from "../../lib/utils";
import { fetchAdminPosts } from "../../data/postsApi";
import type { AdminPostItem } from "../../data/postsApi";

/**
 * หน้าจัดการบทความ (Admin)
 * - ตารางบทความ พร้อมค้นหา / กรอง Status, Category
 * - ปุ่ม Create article → /admin/article/create
 * - แก้ไข → /admin/article/:id/edit ลบ → /admin/article/:id/delete
 */
const AdminArticlePage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [articles, setArticles] = useState<AdminPostItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadArticles = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchAdminPosts();
        setArticles(data);
      } catch (err) {
        console.error("Error loading articles:", err);
        setError("Failed to load articles.");
        setArticles([]);
      } finally {
        setIsLoading(false);
      }
    };
    loadArticles();
  }, []);

  // กรองบทความตามคำค้น, สถานะ และหมวดหมู่ (client-side)
  const filteredArticles = articles.filter((article) => {
    const q = searchQuery.trim().toLowerCase();
    const matchSearch = !q || article.title.toLowerCase().includes(q);
    const matchStatus =
      statusFilter === "all" || article.status.toLowerCase() === statusFilter.toLowerCase();
    const matchCategory =
      categoryFilter === "all" || article.category.toLowerCase() === categoryFilter.toLowerCase();
    return matchSearch && matchStatus && matchCategory;
  });

  return (
    <AdminLayout activeItem="article">
      <section className="w-full h-full p-[40px]">
        <div className="-mx-[40px] border-b border-gray-200">
          <header className="flex items-center justify-between px-[40px] h-[96px]">
            <h1 className="text-headline-3 text-brown-600">Article management</h1>
            <BlackButton
              className="flex items-center gap-[8px] h-[44px] px-[24px]"
              onClick={() => navigate("/admin/article/create")}
            >
              <Plus className="w-[20px] h-[20px]" />
              <span>Create article</span>
            </BlackButton>
          </header>
        </div>

        <form
          className="flex items-center justify-between gap-[16px] mt-[32px] mb-[24px]"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="relative w-full max-w-[400px]">
            <label htmlFor="admin-article-search" className="sr-only">
              Search articles
            </label>
            <Search className="absolute left-[16px] top-1/2 -translate-y-1/2 w-[20px] h-[20px] text-gray-400" />
            <input
              id="admin-article-search"
              type="text"
              placeholder="search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-[44px] pl-[48px] pr-[16px] bg-white border border-gray-300 rounded-[8px] text-body-1 text-brown-600 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-brand-red"
            />
          </div>

          <div className="flex items-center justify-end gap-[16px]">
            <div className="relative">
              <label htmlFor="admin-article-status" className="sr-only">
                Filter by status
              </label>
              <select
                id="admin-article-status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-[44px] w-[140px] pl-[16px] pr-[40px] bg-white border border-gray-300 rounded-[8px] text-body-1 text-brown-600 appearance-none focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-brand-red"
              >
                <option value="all">Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-[12px] top-1/2 -translate-y-1/2 w-[16px] h-[16px] text-brown-400" />
            </div>

            <div className="relative">
              <label htmlFor="admin-article-category" className="sr-only">
                Filter by category
              </label>
              <select
                id="admin-article-category"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="h-[44px] w-[160px] pl-[16px] pr-[40px] bg-white border border-gray-300 rounded-[8px] text-body-1 text-brown-600 appearance-none focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-brand-red"
              >
                <option value="all">Category</option>
                <option value="cat">Cat</option>
                <option value="dog">Dog</option>
                <option value="general">General</option>
                <option value="inspiration">Inspiration</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-[12px] top-1/2 -translate-y-1/2 w-[16px] h-[16px] text-brown-400" />
            </div>
          </div>
        </form>

        <section className="bg-white rounded-[8px] border border-gray-200 overflow-hidden">
          {isLoading ? (
            <div className="px-[24px] py-[60px] text-center text-body-1 text-brown-400">
              Loading...
            </div>
          ) : error ? (
            <div className="px-[24px] py-[60px] text-center text-body-1 text-brand-red">
              {error}
            </div>
          ) : (
            <table className="w-full" aria-label="Articles table">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-[24px] py-[16px] text-left text-body-2 text-gray-600 font-medium">
                    Article Title
                  </th>
                  <th className="px-[24px] py-[16px] text-left text-body-2 text-gray-600 font-medium">
                    Category
                  </th>
                  <th className="px-[24px] py-[16px] text-left text-body-2 text-gray-600 font-medium">
                    Status
                  </th>
                  <th className="px-[24px] py-[16px] text-right text-body-2 text-gray-600 font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredArticles.map((article) => (
                  <tr
                    key={article.id}
                    className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-[24px] py-[16px] text-body-1 text-brown-600">{article.title}</td>
                    <td className="px-[24px] py-[16px] text-body-1 text-brown-600">{article.category}</td>
                    <td className="px-[24px] py-[16px]">
                      <span
                        className={cn(
                          "inline-block px-[12px] py-[4px] rounded-full text-body-2 font-medium",
                          article.status === "Published"
                            ? "bg-brand-green-light text-brand-green"
                            : "bg-gray-100 text-gray-700"
                        )}
                      >
                        {article.status}
                      </span>
                    </td>
                    <td className="px-[24px] py-[16px]">
                      <div className="flex items-center justify-end gap-[12px]">
                        <button
                          type="button"
                          className="w-[32px] h-[32px] flex items-center justify-center text-gray-600 hover:text-brand-red transition-colors"
                          aria-label={`Edit: ${article.title}`}
                          onClick={() => navigate(`/admin/article/${article.id}/edit`)}
                        >
                          <Edit className="w-[18px] h-[18px]" />
                        </button>
                        <button
                          type="button"
                          className="w-[32px] h-[32px] flex items-center justify-center text-gray-600 hover:text-red-600 transition-colors"
                          aria-label={`Delete: ${article.title}`}
                          onClick={() => navigate(`/admin/article/${article.id}/delete`)}
                        >
                          <Trash2 className="w-[18px] h-[18px]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredArticles.length === 0 && (
                  <tr>
                    <td className="px-[24px] py-[20px] text-body-1 text-brown-400" colSpan={4}>
                      No articles found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </section>
      </section>
    </AdminLayout>
  );
};

export default AdminArticlePage;
