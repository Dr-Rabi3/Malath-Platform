import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Submit contact form data to the API
 * @param {string} token - Authorization token
 * @param {Object} formData - Contact form data
 * @param {string} formData.email - User's email address
 * @param {string} formData.phoneNumber - User's phone number
 * @param {string} formData.message - User's message
 * @returns {Promise<Object>} API response
 */

export const submitContactForm = async (token, formData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}api/ContactUsForms/submit`,
      {
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        message: formData.message,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        timeout: 10000, // 10 second timeout
      }
    );
    const result = response.data;

    if (!result.isSuccess) {
      throw new Error(result.error?.description || "failed contact");
    }

    return result.data;
  } catch (error) {
    const errorMsg =
      error.response?.data?.error?.description ||
      error.message ||
      "contact error";
    console.error("contact error:", errorMsg);
    throw new Error(errorMsg);
  }
};
