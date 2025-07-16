import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Fetch entity settings
export const getEntitySettings = async (language = "en") => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}api/WebPages/GetEntitySettings`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Accept-Language": language,
        },
        timeout: 10000,
      }
    );
    const result = response.data;
    if (!result.isSuccess) {
      throw new Error(result.error?.description || "Failed to fetch settings");
    }
    return result.data; // { vision, mission, values }
  } catch (error) {
    const errorMsg =
      error.response?.data?.error?.description ||
      error.message ||
      "Fetch settings error";
    console.error("Get entity settings error:", errorMsg);
    throw new Error(errorMsg);
  }
};

// Update entity settings
export const updateEntitySettings = async (settings) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}api/WebPages/UpdateEntitySettings`,
      settings,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        timeout: 10000,
      }
    );
    const result = response.data;
    if (!result.isSuccess) {
      throw new Error(result.error?.description || "Failed to update settings");
    }
    return result.data;
  } catch (error) {
    const errorMsg =
      error.response?.data?.error?.description ||
      error.message ||
      "Update settings error";
    console.error("Update entity settings error:", errorMsg);
    throw new Error(errorMsg);
  }
};
