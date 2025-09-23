import axios from "axios";
import { uploadFile } from "./http";

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
      {
        contentEn: blogData.contentEn,
        contentAr: blogData.contentAr,
        photos: blogData.photos || [], // Add photos array
      },
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
 * @returns {Promise<Object>} - The paginated blogs response with pagination info
 */
export const getBlogs = async (pageIndex, pageSize, token, language = "en") => {
  try {
    // console.log("API Request - pageIndex:", pageIndex, "pageSize:", pageSize);

    const response = await axios.get(`${API_BASE_URL}api/Blogs/all`, {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Accept-Language": language,
      },
      params: {
        pageIndex,
        pageSize,
      },
      timeout: 10000,
    });

    // console.log("API Response Headers:", response.headers);
    // console.log("API Response Data:", response.data);

    // Extract pagination info from x-pagination header
    let pagination = null;
    if (response.headers && response.headers["x-pagination"]) {
      try {
        pagination = JSON.parse(response.headers["x-pagination"]);
        // console.log("Parsed Pagination:", pagination);
      } catch (error) {
        console.warn("Failed to parse x-pagination header:", error);
      }
    }

    return {
      data: response.data,
      pagination: pagination,
    };
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

/**
 * Fetch all sliders
 * @returns {Promise<Object>} - The sliders response
 */
export const getAllSliders = async (language = "en") => {
  try {
    // console.log(language);
    const response = await axios.get(`${API_BASE_URL}api/Sliders/all`, {
      headers: {
        "Accept-Language": language,
      },
      timeout: 10000,
    });
    return response.data;
  } catch (error) {
    const errorMsg =
      error.response?.data?.error?.description ||
      error.message ||
      "Fetch sliders error";
    console.error("Get sliders error:", errorMsg);
    throw new Error(errorMsg);
  }
};

/**
 * Create a new slider
 * @param {string} token - Authorization token (if required)
 * @param {Object} sliderData - { title, description, imageFile }
 * @returns {Promise<Object>} - The created slider or API response
 */
export const createSlider = async (token, sliderData) => {
  try {
    // 1. Upload the image
    const imageUrl = await uploadFile(token, sliderData.imageFile, "slider");
    // 2. Create the slider
    const response = await axios.post(
      `${API_BASE_URL}api/Sliders/Create`,
      {
        titleEn: sliderData.titleEn,
        titleAr: sliderData.titleAr,
        descriptionEn: sliderData.descriptionEn,
        descriptionAr: sliderData.descriptionAr,
        imageUrl: imageUrl.url,
        order: +sliderData.order,
      },
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
      "Slider creation error";
    console.error("Create slider error:", errorMsg);
    throw new Error(errorMsg);
  }
};

/**
 * Delete a slider by ID
 * @param {string} token - Authorization token (if required)
 * @param {number|string} sliderId - The ID of the slider to delete
 * @returns {Promise<Object>} - The API response
 */
export const deleteSlider = async (token, sliderId) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}api/Sliders/${sliderId}`,
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
      "Delete slider error";
    console.error("Delete slider error:", errorMsg);
    throw new Error(errorMsg);
  }
};
