import { Empty, Spin } from "antd";
import { getDurationFromNow } from "../../utils/timeAge";
import { DeleteOutlined } from "@ant-design/icons";
import { getBlogs } from "../../api/admin";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useAuth } from "../../store/AuthContext";

function Blogs({ isAdmin, loading, onDelete }) {
  const { user } = useAuth();
  const [pageIndex, setPageIndex] = useState(null);
  const [pageSize, setPageSize] = useState(null);
  const {
    data: blogsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blogs", pageIndex, pageSize],
    queryFn: () => getBlogs(pageIndex, pageSize, user?.token),
    keepPreviousData: true,
  });
  
  const blogs = (blogsData?.data || blogsData?.items || [])
    .slice()
    .sort((a, b) => (b.id || 0) - (a.id || 0));

  return (
    <div className="mt-[20px] px-2 sm:px-4 md:px-8 space-y-5">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/60 z-10">
          <Spin size="large" />
        </div>
      )}
      {blogs.map((blog) => (
        <div
          key={blog.id}
          className="prose max-w-none bg-accent-25 rounded-[20px] shadow-custom-gray p-4 sm:p-6 md:p-8 flex flex-col gap-4"
        >
          <div
            className="prose max-w-none prose-sm "
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-2">
            {/* <div className="flex items-center gap-4 sm:gap-5">
              <button className="text-base font-bold flex items-center gap-2">
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.9215 18.1242C10.6272 18.228 10.1426 18.228 9.84837 18.1242C7.33872 17.2675 1.73096 13.6934 1.73096 7.6356C1.73096 4.96153 3.88579 2.79803 6.54256 2.79803C8.11758 2.79803 9.51087 3.55958 10.3849 4.73652C11.259 3.55958 12.6609 2.79803 14.2273 2.79803C16.884 2.79803 19.0389 4.96153 19.0389 7.6356C19.0389 13.6934 13.4311 17.2675 10.9215 18.1242Z"
                    stroke="#EC1616"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-sm font-regular text-red-500 m-0">
                  {blog.likes}
                </span>
              </button>
              <button className="text-base font-bold flex items-center gap-2">
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.4354 5.00482L11.7527 2.92787C11.4065 2.58171 10.6277 2.40863 10.1085 2.40863H6.81995C5.78147 2.40863 4.65646 3.18749 4.39684 4.22596L2.31989 10.5434C1.88719 11.7549 2.66605 12.7934 3.96414 12.7934H7.42573C7.94496 12.7934 8.37766 13.2261 8.29112 13.8319L7.85842 16.6011C7.68534 17.38 8.20458 18.2454 8.98344 18.505C9.67576 18.7646 10.5412 18.4185 10.8873 17.8992L14.4354 12.6203"
                    stroke="#0877FF"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M18.849 5.00479V13.4857C18.849 14.6972 18.3297 15.1299 17.1182 15.1299H16.2528C15.0412 15.1299 14.522 14.6972 14.522 13.4857V5.00479C14.522 3.79323 15.0412 3.36053 16.2528 3.36053H17.1182C18.3297 3.36053 18.849 3.79323 18.849 5.00479Z"
                    stroke="#0877FF"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-sm font-regular text-blue-500">
                  {blog.dislikes}
                </span>
              </button>
              {isAdmin && (
                <>
                  <span className="text-sm font-regular text-[#727272]">
                    {getDurationFromNow(blog.createdAt)}
                  </span>
                  <svg
                    width="21"
                    height="22"
                    viewBox="0 0 21 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.2693 11C19.2693 15.777 15.3924 19.6539 10.6154 19.6539C5.8384 19.6539 1.96143 15.777 1.96143 11C1.96143 6.22298 5.8384 2.34601 10.6154 2.34601C15.3924 2.34601 19.2693 6.22298 19.2693 11Z"
                      stroke="#727272"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M13.8257 13.752L11.143 12.151C10.6757 11.8741 10.2949 11.2077 10.2949 10.6625V7.11438"
                      stroke="#727272"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </>
              )}
            </div> */}
            <div className="flex items-center gap-2">
              {isAdmin && (
                <button
                  className="text-red-600 text-[12px] border-b-2 border-red-600 w-fit"
                  onClick={() => onDelete && onDelete(blog.id)}
                >
                  <DeleteOutlined /> Delete Blog
                </button>
              )}
              {!isAdmin && (
                <>
                  <span className="text-sm font-regular text-[#727272]">
                    {getDurationFromNow(blog.createdAt)}
                  </span>
                  <svg
                    width="21"
                    height="22"
                    viewBox="0 0 21 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.2693 11C19.2693 15.777 15.3924 19.6539 10.6154 19.6539C5.8384 19.6539 1.96143 15.777 1.96143 11C1.96143 6.22298 5.8384 2.34601 10.6154 2.34601C15.3924 2.34601 19.2693 6.22298 19.2693 11Z"
                      stroke="#727272"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M13.8257 13.752L11.143 12.151C10.6757 11.8741 10.2949 11.2077 10.2949 10.6625V7.11438"
                      stroke="#727272"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
      {blogs.length === 0 && (
        <div className="inset-0 flex flex-col items-center justify-center w-full p-3 text-center">
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            // imageStyle={{ scale: 3 }}
          />
          No data
        </div>
      )}
    </div>
  );
}

export default Blogs;
