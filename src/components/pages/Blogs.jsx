import { Empty, Spin, Modal, Popconfirm, Pagination } from "antd";
import { getDurationFromNow } from "../../utils/timeAge";
import { DeleteOutlined } from "@ant-design/icons";
import { getBlogs } from "../../api/admin";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useAuth } from "../../store/AuthContext";
import { useTranslation } from "react-i18next";
import Editor from "../Organisms/Editor";
import i18n from "../../i18n";

function Blogs({ isAdmin, loading, onDelete }) {
  const { user } = useAuth();
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const {
    data: blogsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blogs", pageIndex, pageSize, i18n.language],
    queryFn: () => getBlogs(pageIndex, pageSize, user?.token, i18n.language),
    keepPreviousData: true,
  });

  // Debug: Log the response structure
  console.log("Blogs API Response:", blogsData);
  console.log("Pagination Header:", blogsData?.pagination);

  const blogs = (
    blogsData?.data?.data ||
    blogsData?.data?.items ||
    blogsData?.data ||
    blogsData ||
    []
  )
    .slice()
    .sort((a, b) => (b.id || 0) - (a.id || 0));

  const totalBlogs = blogsData?.pagination?.TotalCount || blogs.length;
  const currentPage = blogsData?.pagination?.CurrentPage || pageIndex;
  const totalPages = blogsData?.pagination?.TotalPages || 0;
  const pageSizeFromAPI = blogsData?.pagination?.PageSize || pageSize;
  const { t } = useTranslation();

  const handlePageChange = (page, size) => {
    setPageIndex(page);
    setPageSize(size);
  };

  return (
    <div className="mt-[20px] px-2 sm:px-4 md:px-8 space-y-6">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/60 z-10">
          <Spin size="large" />
        </div>
      )}
      {blogs.map((blog, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          {/* Blog Header */}
          <div className="bg-accent-25 from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-neutral-950 rounded-full"></div>
                {/* <span className="text-sm font-medium text-gray-600">
                  {getDurationFromNow(blog.createdAt)}
                </span> */}
              </div>
              {isAdmin && (
                <Popconfirm
                  title={t("blogs.deleteTitle", "Delete the blog")}
                  description={t(
                    "blogs.deleteDescription",
                    "Are you sure to delete this blog?"
                  )}
                  onConfirm={() => onDelete(blog.id)}
                  okText={t("blogs.yes", "Yes")}
                  cancelText={t("blogs.no", "No")}
                >
                  <button
                    type="button"
                    className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center gap-2 px-3 py-1 rounded-md hover:bg-red-50 transition-colors"
                  >
                    <DeleteOutlined />
                    {t("blogs.deleteBlog", "Delete Blog")}
                  </button>
                </Popconfirm>
              )}
            </div>
          </div>

          {/* Blog Content */}
          <div className="p-6">
            <div className="prose prose-sm max-w-none">
              <Editor 
                content={(i18n.language === "ar" ? blog.contentAr : blog.contentEn) || blog.content} 
                readOnly={true} 
                field="content" 
              />
            </div>
          </div>

          {/* Blog Footer */}
          {!isAdmin && (
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{getDurationFromNow(blog.createdAt)}</span>
                <div className="flex items-center gap-2">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 21 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-gray-400"
                  >
                    <path
                      d="M19.2693 11C19.2693 15.777 15.3924 19.6539 10.6154 19.6539C5.8384 19.6539 1.96143 15.777 1.96143 11C1.96143 6.22298 5.8384 2.34601 10.6154 2.34601C15.3924 2.34601 19.2693 6.22298 19.2693 11Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M13.8257 13.752L11.143 12.151C10.6757 11.8741 10.2949 11.2077 10.2949 10.6625V7.11438"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>{t("blogs.readTime", "2 min read")}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Pagination */}
      {blogs.length > 0 && (
        <div className="flex justify-center py-6">
          <Pagination
            current={currentPage} // API uses 0-based indexing, Pagination uses 1-based
            total={totalBlogs}
            pageSize={pageSizeFromAPI}
            // showSizeChanger
            // showQuickJumper
            showTotal={(total, range) =>
              t("blogs.pagination", {
                from: range[0],
                to: range[1],
                total,
                defaultValue: "{{from}}-{{to}} of {{total}} blogs",
              })
            }
            onChange={handlePageChange}
            onShowSizeChange={handlePageChange}
            pageSizeOptions={["5", "10", "20", "50"]}
            className="pagination-custom"
          />
        </div>
      )}

      {blogs.length === 0 && (
        <div className="inset-0 flex flex-col items-center justify-center w-full p-8 text-center">
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={t("blogs.noBlogs", "No blogs found")}
          />
        </div>
      )}
    </div>
  );
}

export default Blogs;
