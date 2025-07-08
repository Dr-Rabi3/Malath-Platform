import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Create a new blog post
 * @param {string} token - Authorization token (if required)
 * @param {Object} blogData - The blog post data to send
 * @returns {Promise<Object>} - The created blog post or API response
 */
export const createBlog = async (token, blogData) => {
  try {
    // console.log(token, blogData);
    const response = await axios.post(
      `${API_BASE_URL}api/Blogs/create`,
      { content: blogData.description },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        timeout: 10000,
      }
    );
    return response.data;
  } catch (error) {
    const errorMsg =
      error.response?.data?.error?.description ||
      error.message ||
      "Blog creation error";
    console.error("Create blog error:", errorMsg);
    throw new Error(errorMsg);
  }
};

/**
 * Fetch paginated blogs
 * @param {number} pageIndex - The page index (starting from 1 or 0, depending on API)
 * @param {number} pageSize - The number of items per page
 * @param {string} [token] - Authorization token (if required)
 * @returns {Promise<Object>} - The paginated blogs response
 */
export const getBlogs = async (pageIndex, pageSize, token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}api/Blogs/all`, {
      params: {
        pageIndex,
        pageSize,
      },
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      timeout: 10000,
    });
    return response.data;
  } catch (error) {
    const errorMsg =
      error.response?.data?.error?.description ||
      error.message ||
      "Fetch blogs error";
    console.error("Get blogs error:", errorMsg);
    throw new Error(errorMsg);
  }
};

/**
 * Delete a blog post by ID
 * @param {string} token - Authorization token (if required)
 * @param {number|string} blogId - The ID of the blog to delete
 * @returns {Promise<Object>} - The API response
 */
export const deleteBlog = async (token, blogId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}api/Blogs/${blogId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      timeout: 10000,
    });
    return response.data;
  } catch (error) {
    const errorMsg =
      error.response?.data?.error?.description ||
      error.message ||
      "Delete blog error";
    console.error("Delete blog error:", errorMsg);
    throw new Error(errorMsg);
  }
};

/**
 * Delete a user by ID
 * @param {string} token - Authorization token (if required)
 * @param {number|string} userId - The ID of the user to delete
 * @returns {Promise<Object>} - The API response
 */
export const deleteUser = async (token, userId) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}api/ApplicationUsers/Delete/${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        timeout: 10000,
      }
    );
    return response.data;
  } catch (error) {
    const errorMsg =
      error.response?.data?.error?.description ||
      error.message ||
      "Delete user error";
    console.error("Delete user error:", errorMsg);
    throw new Error(errorMsg);
  }
};
