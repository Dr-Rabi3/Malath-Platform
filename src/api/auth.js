import axios from "axios";
import errorStatus from "../utils/errorStatus.js";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Helper function to get error message based on status
const getErrorMessage = (status, defaultMessage) => {
  switch (status) {
    case errorStatus.Ok:
      return "Success";
    case errorStatus.Error:
      return "An error occurred";
    case errorStatus.Forbidden:
      return "Access forbidden";
    case errorStatus.UnAuthenticated:
      return "Authentication required";
    case errorStatus.UnAuthorized:
      return "Unauthorized access";
    case errorStatus.NotFound:
      return "Resource not found";
    case errorStatus.Conflict:
      return "Conflict occurred";
    case errorStatus.UserNorFound:
      return "User not found";
    default:
      return defaultMessage;
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}api/auth/login`, {
      username: email,
      password,
    });

    const result = response.data;

    if (!result.isSuccess) {
      const errorMessage = getErrorMessage(
        result.error?.status || result.status,
        result.error?.description || "Login failed"
      );
      throw new Error(errorMessage);
    }

    return result.data;
  } catch (error) {
    let errorMsg;

    if (error.response?.data) {
      const status =
        error.response.data.error?.status || error.response.data.status;
      errorMsg = getErrorMessage(
        status,
        error.response.data.error?.description || "Login error"
      );
    } else {
      errorMsg = error.message || "Login error";
    }

    console.error("Login error:", errorMsg);
    throw new Error(errorMsg);
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}api/ApplicationUsers/Register`,
      {
        ...userData,
        // confirmPassword: "",
        profilePicture: "",
      }
    );
    const result = response.data;

    if (!result.isSuccess) {
      const errorMessage = getErrorMessage(
        result.status,
        result.description || "Registration failed"
      );
      throw new Error(errorMessage);
    }

    return result.data; // Returns the user ID
  } catch (error) {
    console.log(error);
    console.error("Registration error:", error);

    let errorMsg;
    if (error.response?.data) {
      const status = error.response.data.status;
      errorMsg = getErrorMessage(
        status,
        error.response.data.title || "Registration failed"
      );
    } else {
      errorMsg = error.message || "Registration failed";
    }

    const err = new Error(errorMsg);
    err.errors = error.response?.data?.errors;
    throw err;
  }
};

export const refreshTokenAPI = async (refreshToken) => {
  try {
    const response = await axios.post(`${API_BASE_URL}api/auth/refresh`, {
      refreshToken,
    });

    const result = response.data;

    if (!result.isSuccess) {
      const errorMessage = getErrorMessage(
        result.error?.status || result.status,
        result.error?.description || "Token refresh failed"
      );
      throw new Error(errorMessage);
    }

    return result.data;
  } catch (error) {
    let errorMsg;

    if (error.response?.data) {
      const status =
        error.response.data.error?.status || error.response.data.status;
      errorMsg = getErrorMessage(
        status,
        error.response.data.error?.description || "Token refresh failed"
      );
    } else {
      errorMsg = error.message || "Token refresh failed";
    }

    console.error("Token refresh error:", errorMsg);
    throw new Error(errorMsg);
  }
};
