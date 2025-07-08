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

/**
 * Fetch all users from the API
 * @param {string} token - Authorization token
 * @returns {Promise<Array>} List of users
 */

export const getAllUsers = async (token) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}api/ApplicationUsers/GetAll`,
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
      throw new Error(result.error?.description || "Failed to fetch users");
    }

    return result.data;
  } catch (error) {
    const errorMsg =
      error.response?.data?.error?.description ||
      error.message ||
      "Unknown user fetch error";

    console.error("Get all users error:", errorMsg);
    throw new Error(errorMsg);
  }
};

/**
 * Add a new user with a specific role
 * @param {string} token - Authorization token
 * @param {Object} userData - New user data
 * @param {string} userData.role
 * @param {string} userData.fullNameAr
 * @param {string} userData.fullNameEn
 * @param {string} userData.mobileNumber
 * @param {string} userData.whatsAppNumber
 * @param {string} userData.profilePicture
 * @param {string} userData.email
 * @param {string} userData.password
 * @param {string} userData.confirmPassword
 * @returns {Promise<number>} The ID of the newly created user
 */

export const addUserWithRole = async (token, userData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}api/ApplicationUsers/AddWithRole`,
      {
        role: userData.role,
        fullNameAr: userData.fullNameAr,
        fullNameEn: userData.fullNameEn,
        mobileNumber: userData.mobileNumber,
        whatsAppNumber: userData.whatsAppNumber,
        profilePicture: userData.profilePicture,
        email: userData.email,
        password: userData.password,
        confirmPassword: userData.confirmPassword,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        timeout: 10000, // 10-second timeout
      }
    );

    const result = response.data;

    if (!result.isSuccess) {
      throw new Error(result.error?.description || "Failed to add user");
    }

    return result.data; // the new user ID
  } catch (error) {
    const errorMsg =
      error.response?.data?.error?.description ||
      error.message ||
      "Add user error";

    console.error("Add user error:", errorMsg);
    throw new Error(errorMsg);
  }
};

/**
 * Fetch all user roles from the API
 * @param {string} token - Authorization token
 * @returns {Promise<Array>} List of roles
 */

export const getRoles = async (token) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}api/ApplicationUsers/GetRoles`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        timeout: 10000, // 10-second timeout
      }
    );

    const result = response.data;

    if (!result.isSuccess) {
      throw new Error(result.error?.description || "Failed to fetch roles");
    }

    return result.data; // list of roles [{ id, name }]
  } catch (error) {
    const errorMsg =
      error.response?.data?.error?.description ||
      error.message ||
      "Error fetching roles";

    console.error("Get roles error:", errorMsg);
    throw new Error(errorMsg);
  }
};

/**
 * Fetch all categories from the API
 * @param {string} token - Authorization token
 * @returns {Promise<Array>} List of categories
 */

export const getAllCategories = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}api/Categories/GetAll`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      timeout: 10000, // 10-second timeout
    });

    const result = response.data;

    if (!result.isSuccess) {
      throw new Error(
        result.error?.description || "Failed to fetch categories"
      );
    }

    return result.data; // List of categories [{ id, name }]
  } catch (error) {
    const errorMsg =
      error.response?.data?.error?.description ||
      error.message ||
      "Error fetching categories";

    console.error("Get categories error:", errorMsg);
    throw new Error(errorMsg);
  }
};

/**
 * Fetch all services from the API
 * @param {string} token - Authorization token
 * @returns {Promise<Array>} List of services
 */

export const getAllServices = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}api/Services/all`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      timeout: 10000, // 10-second timeout
    });

    const result = response.data;

    if (!result.isSuccess) {
      throw new Error(result.error?.description || "Failed to fetch services");
    }

    return result.data; // List of services [{ id, name, description, categoryId, categoryName }]
  } catch (error) {
    const errorMsg =
      error.response?.data?.error?.description ||
      error.message ||
      "Error fetching services";

    console.error("Get services error:", errorMsg);
    throw new Error(errorMsg);
  }
};

/**
 * Request a service
 * @param {string} token - Authorization token
 * @param {Object} requestData - Data for the service request
 * @param {string} requestData.title
 * @param {string} requestData.description
 * @param {number} requestData.userID
 * @param {number} requestData.serviceID
 * @param {number} requestData.status
 * @returns {Promise<number>} ID of the created service request
 */

export const requestService = async (token, requestData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}api/UserService/RequestService`,
      {
        title: requestData.title,
        description: requestData.description,
        userID: requestData.userID,
        serviceID: requestData.serviceID,
        status: requestData.status,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        timeout: 10000, // 10-second timeout
      }
    );

    const result = response.data;

    if (!result.isSuccess) {
      throw new Error(result.error?.description || "Failed to request service");
    }

    return result.data; // The ID of the created request
  } catch (error) {
    const errorMsg =
      error.response?.data?.error?.description ||
      error.message ||
      "Service request error";

    console.error("Request service error:", errorMsg);
    throw new Error(errorMsg);
  }
};

/**
 * Fetch a user by ID from the API
 * @param {string} token - Authorization token
 * @param {number} id - User ID
 * @returns {Promise<Object>} User data
 */

export const getUserById = async (token, id) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}api/ApplicationUsers/GetById/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        timeout: 10000, // 10-second timeout
      }
    );

    const result = response.data;

    if (!result.isSuccess) {
      throw new Error(result.error?.description || "Failed to fetch user");
    }

    return result.data; // user object
  } catch (error) {
    const errorMsg =
      error.response?.data?.error?.description ||
      error.message ||
      "Error fetching user";

    console.error("Get user by ID error:", errorMsg);
    throw new Error(errorMsg);
  }
};

/**
 * Fetch all service requests by a specific user ID
 * @param {string} token - Authorization token
 * @param {number} userId - ID of the user
 * @returns {Promise<Array>} List of service requests
 */

export const getUserServiceRequests = async (token, userId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}api/UserService/GetAllByUserId/${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        timeout: 10000, // 10-second timeout
      }
    );

    const result = response.data;

    if (!result.isSuccess) {
      throw new Error(
        result.error?.description || "Failed to fetch service requests"
      );
    }

    return result.data; // Array of service requests
  } catch (error) {
    const errorMsg =
      error.response?.data?.error?.description ||
      error.message ||
      "Error fetching service requests";

    console.error("Get user service requests error:", errorMsg);
    throw new Error(errorMsg);
  }
};

/**
 * Get service details by ID
 * @param {string} token - Authorization token
 * @param {number} serviceId - Service ID
 * @returns {Promise<Object>} Service details
 */

export const getServiceById = async (token, serviceId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}api/Services/GetById/${serviceId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        timeout: 10000, // 10-second timeout
      }
    );

    const result = response.data;

    if (!result.isSuccess) {
      throw new Error(
        result.error?.description || "Failed to fetch service details"
      );
    }

    return result.data; // Service object
  } catch (error) {
    const errorMsg =
      error.response?.data?.error?.description ||
      error.message ||
      "Error fetching service details";

    console.error("Get service by ID error:", errorMsg);
    throw new Error(errorMsg);
  }
};

/**
 * Fetch all user service requests
 * @param {string} token - Authorization token
 * @returns {Promise<Array>} List of user service requests
 */

export const getAllUserServiceRequests = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}api/UserService/GetAll`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      timeout: 10000,
    });

    const result = response.data;

    if (!result.isSuccess) {
      throw new Error(result.error?.description || "Failed to fetch requests");
    }

    return result.data; // Array of { id, title, description, userID, serviceID, status }
  } catch (error) {
    const errorMsg =
      error.response?.data?.error?.description ||
      error.message ||
      "User service fetch error";

    console.error("Fetch all user services error:", errorMsg);
    throw new Error(errorMsg);
  }
};

/**
 * Get user service request by ID
 * @param {string} token - Authorization token
 * @param {number} requestId - User service request ID
 * @returns {Promise<Object>} User service request details
 */

export const getUserServiceRequestById = async (token, requestId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}api/UserService/GetById/${requestId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        timeout: 10000, // 10-second timeout
      }
    );

    const result = response.data;

    if (!result.isSuccess) {
      throw new Error(
        result.error?.description || "Failed to fetch service request details"
      );
    }

    return result.data; // User service request object
  } catch (error) {
    const errorMsg =
      error.response?.data?.error?.description ||
      error.message ||
      "Error fetching service request details";

    console.error("Get user service request by ID error:", errorMsg);
    throw new Error(errorMsg);
  }
};

/**
 * Update user service request status
 * @param {string} token - Authorization token
 * @param {number} requestId - User service request ID
 * @param {number} status - New status (0: Pending, 1: Approved, 2: Rejected)
 * @returns {Promise<Object>} Updated service request
 */

export const updateUserServiceRequestStatus = async (
  token,
  requestId,
  status
) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}api/UserService/UpdateStatus/${requestId}`,
      {
        status: status,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        timeout: 10000, // 10-second timeout
      }
    );

    const result = response.data;

    if (!result.isSuccess) {
      throw new Error(
        result.error?.description || "Failed to update service request status"
      );
    }

    return result.data; // Updated service request object
  } catch (error) {
    const errorMsg =
      error.response?.data?.error?.description ||
      error.message ||
      "Error updating service request status";

    console.error("Update user service request status error:", errorMsg);
    throw new Error(errorMsg);
  }
};

/**
 * Upload a file to a specific folder on the server
 * @param {string} token - Authorization token (optional if API doesn't require it)
 * @param {File} file - The file to upload (e.g., from an <input type="file" />)
 * @param {string} folderName - Name of the target folder
 * @returns {Promise<string>} Uploaded file path or URL
 */

export const uploadFile = async (token, file, folderName) => {
  try {
    console.log(file);
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(
      `${API_BASE_URL}api/General/UploadFile?FolderName=${folderName}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        timeout: 10000,
      }
    );

    const result = response.data;

    if (!result.isSuccess) {
      throw new Error(result.error?.description || "File upload failed");
    }

    return result.data; // uploaded file path or URL
  } catch (error) {
    const errorMsg =
      error.response?.data?.error?.description ||
      error.message ||
      "File upload error";

    console.error("Upload file error:", errorMsg);
    throw new Error(errorMsg);
  }
};

/**
 * Fetch a file (image or other) by path
 * @param {string} filePath - Relative file path (e.g., "/image/abc.jpg")
 * @returns {Promise<Blob>} File blob (e.g., image, PDF)
 */

export const getFile = async (filePath) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}api/General/download?filePath=${filePath}`,
      {
        responseType: "blob", // important for files/images
        timeout: 10000,
      }
    );

    return response.data; // Blob
  } catch (error) {
    const errorMsg =
      error.response?.data?.error?.description ||
      error.message ||
      "File fetch error";

    console.error("Get file error:", errorMsg);
    throw new Error(errorMsg);
  }
};

/**
 * Fetch user data for update
 * @param {string} token - Authorization token (if required)
 * @param {number|string} id - User ID
 * @returns {Promise<Object>} User data for update
 */
export const getUserForUpdate = async (token, id) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}api/ApplicationUsers/GetForUpdate/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        timeout: 10000,
      }
    );
    if (response.data.isSuccess) return response.data.data;
    else
      throw new Error(
        response.data.error?.description || "Failed to fetch user for update"
      );
  } catch (err) {
    throw new Error(err.message);
  }
};

const fetchUser = async (id) => {
  try {
    const res = await axios.get(
      `${API_BASE_URL}api/ApplicationUsers/GetForUpdate/${id}`
    );
    if (res.data.isSuccess) return res.data.data;
    else throw new Error(res.data.error.description || "Failed to fetch user");
  } catch (err) {
    message.error(`Fetch error: ${err.message}`);
    return null;
  }
};

export const updateUser = async (token, userData) => {
  try {
    const res = await axios.put(
      `${API_BASE_URL}api/ApplicationUsers/Update`,
      userData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        timeout: 10000,
      }
    );
    if (res.data.isSuccess) return true;
    else throw new Error(res.data.error.description || "Update failed");
  } catch (err) {
    console.error(`Update error: ${err.message}`);
    throw new Error(err.message);
  }
};
