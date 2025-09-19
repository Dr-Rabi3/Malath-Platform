import { Empty, Spin, Modal, Popconfirm, Pagination, Image } from "antd";
import { getDurationFromNow } from "../../utils/timeAge";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { getBlogs } from "../../api/admin";
import { getFile } from "../../api/http";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useAuth } from "../../store/AuthContext";
import { useTranslation } from "react-i18next";
import Editor from "../Organisms/Editor";
import i18n from "../../i18n";

function Blogs({ isAdmin, loading, onDelete }) {
  const { user } = useAuth();
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [photoUrls, setPhotoUrls] = useState({}); // Store photo URLs for each blog
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
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

  // Load photo URLs for blogs
  const loadPhotoUrls = async (blogs) => {
    const newPhotoUrls = { ...photoUrls };

    for (const blog of blogs) {
      if (blog.photos && blog.photos.length > 0 && !newPhotoUrls[blog.id]) {
        try {
          const blogPhotoUrls = [];
          for (const photoPath of blog.photos) {
            try {
              const blob = await getFile(photoPath);
              const url = URL.createObjectURL(blob);
              blogPhotoUrls.push(url);
            } catch (error) {
              console.error(`Error loading photo ${photoPath}:`, error);
              // Fallback to direct API URL
              const fallbackUrl = `${
                import.meta.env.VITE_API_BASE_URL
              }api/General/download?filePath=${photoPath}`;
              blogPhotoUrls.push(fallbackUrl);
            }
          }
          newPhotoUrls[blog.id] = blogPhotoUrls;
        } catch (error) {
          console.error(`Error loading photos for blog ${blog.id}:`, error);
        }
      }
    }

    if (Object.keys(newPhotoUrls).length > Object.keys(photoUrls).length) {
      setPhotoUrls(newPhotoUrls);
    }
  };

  // Load photos when blogs data changes
  useEffect(() => {
    if (blogs && blogs.length > 0) {
      loadPhotoUrls(blogs);
    }
  }, [blogs]);

  // Cleanup blob URLs on unmount
  useEffect(() => {
    return () => {
      Object.values(photoUrls).forEach((blogPhotos) => {
        blogPhotos.forEach((url) => {
          if (url.startsWith("blob:")) {
            URL.revokeObjectURL(url);
          }
        });
      });
    };
  }, []);

  const handlePageChange = (page, size) => {
    setPageIndex(page);
    setPageSize(size);
  };

  // Photo Gallery Component
  const PhotoGallery = ({ photos, blogId }) => {
    if (!photos || photos.length === 0) return null;

    const handlePreview = (url) => {
      setPreviewImage(url);
      setPreviewVisible(true);
    };

    // All photos have the same dimensions - 2x2 grid with equal sizing
    const PhotoItem = ({ photo, alt, className = "" }) => (
      <Image
        src={photo}
        alt={alt}
        className={`!w-full h-16 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity ${className}`}
        preview={false}
        onClick={() => handlePreview(photo)}
        placeholder={
          <div className="w-full h-16 bg-gray-200 rounded-lg flex items-center justify-center">
            <Spin size="small" />
          </div>
        }
      />
    );

    if (photos.length === 1) {
      return (
        <div className="grid grid-cols-2 gap-1 h-32">
          <PhotoItem
            photo={photos[0]}
            alt="Blog photo"
            className="col-span-2"
          />
        </div>
      );
    }

    if (photos.length === 2) {
      return (
        <div className="grid grid-cols-2 gap-1 h-32">
          <PhotoItem photo={photos[0]} alt="Blog photo 1" />
          <PhotoItem photo={photos[1]} alt="Blog photo 2" />
        </div>
      );
    }

    if (photos.length === 3) {
      return (
        <div className="grid grid-cols-2 gap-1 h-32">
          <PhotoItem photo={photos[0]} alt="Blog photo 1" />
          <PhotoItem photo={photos[1]} alt="Blog photo 2" />
          <PhotoItem
            photo={photos[2]}
            alt="Blog photo 3"
            className="col-span-2"
          />
        </div>
      );
    }

    // 4 or more photos - show first 4 in 2x2 grid
    return (
      <div className="grid grid-cols-2 gap-1 h-32">
        {photos.slice(0, 4).map((photo, index) => (
          <PhotoItem
            key={index}
            photo={photo}
            alt={`Blog photo ${index + 1}`}
          />
        ))}
        {photos.length > 4 && (
          <div
            className="relative h-16 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300 transition-colors flex items-center justify-center col-span-2"
            onClick={() => handlePreview(photos[4])}
          >
            <div className="text-center">
              <EyeOutlined className="text-lg text-gray-600 mb-1" />
              <div className="text-xs font-medium text-gray-600">
                +{photos.length - 4} {t("blogs.morePhotos", "more")}
              </div>
            </div>
          </div>
        )}
      </div>
    );
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
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Photos Section - Left Side */}
              {photoUrls[blog.id] && (
                <div className="lg:w-80 w-full flex-shrink-0">
                  <PhotoGallery photos={photoUrls[blog.id]} blogId={blog.id} />
                </div>
              )}

              {/* Content Section - Right Side */}
              <div className="flex-1 min-w-0">
                <div className="prose prose-sm max-w-none">
                  <Editor
                    content={
                      (i18n.language === "ar"
                        ? blog.contentAr
                        : blog.contentEn) || blog.content
                    }
                    readOnly={true}
                    field="content"
                  />
                </div>
              </div>
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

      {/* Image Preview Modal */}
      <Modal
        open={previewVisible}
        title={t("blogs.imagePreview", "Image Preview")}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
        width="90vw"
        style={{ maxWidth: "800px" }}
        centered
      >
        <div className="text-center">
          <Image
            src={previewImage}
            alt="Preview"
            className="max-w-full max-h-[70vh] object-contain"
            preview={false}
          />
        </div>
      </Modal>
    </div>
  );
}

export default Blogs;
