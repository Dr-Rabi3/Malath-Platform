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

export const getAllCategories = async (token, language = "en") => {
  try {
    const response = await axios.get(`${API_BASE_URL}api/Categories/GetAll`, {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Accept-Language": language,
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
 * Create a new category
 * @param {string} token - Authorization token
 * @param {Object} categoryData - The category data
 * @param {string} categoryData.nameEn - Name in English
 * @param {string} categoryData.nameAr - Name in Arabic
 * @returns {Promise<Object>} - The created category or API response
 */
export const createCategory = async (token, categoryData) => {
  try {
    console.log(categoryData);
    const response = await axios.post(
      `${API_BASE_URL}api/Categories/Create`,
      {
        nameEn: categoryData.nameEn,
        nameAr: categoryData.nameAr,
        photoUrl: categoryData.photoUrl.url,
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
      "Category creation error";
    console.error("Create category error:", errorMsg);
    throw new Error(errorMsg);
  }
};

/**
 * Fetch all services from the API
 * @param {string} token - Authorization token
 * @returns {Promise<Array>} List of services
 */

export const getAllServices = async (token, language = "en") => {
  try {
    const response = await axios.get(`${API_BASE_URL}api/Services/all`, {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Accept-Language": language,
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
 * Create a new service
 * @param {string} token - Authorization token
 * @param {Object} serviceData - The service data
 * @param {string} serviceData.nameEn - Name in English
 * @param {string} serviceData.nameAr - Name in Arabic
 * @param {string} serviceData.descriptionEn - Description in English
 * @param {string} serviceData.descriptionAr - Description in Arabic
 * @param {number} serviceData.categoryId - Category ID
 * @returns {Promise<Object>} - The created service or API response
 */
export const createService = async (token, serviceData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}api/Services/Create`,
      {
        nameEn: serviceData.nameEn,
        nameAr: serviceData.nameAr,
        descriptionEn: serviceData.descriptionEn,
        descriptionAr: serviceData.descriptionAr,
        categoryId: serviceData.categoryId,
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
      "Service creation error";
    console.error("Create service error:", errorMsg);
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

export const getUserServiceRequests = async (
  token,
  userId,
  language = "en"
) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}api/UserService/GetAllByUserId/${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Accept-Language": language,
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

export const getAllUserServiceRequests = async (
  token,
  pageIndex = 1,
  pageSize = 10,
  language = "en"
) => {
  try {
    const response = await axios.get(`${API_BASE_URL}api/UserService/GetAll`, {
      params: { pageIndex, pageSize },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
        "Accept-Language": language,
      },
      timeout: 10000,
    });

    const result = response.data;

    if (!result.isSuccess) {
      throw new Error(result.error?.description || "Failed to fetch requests");
    }

    // Extract pagination from x-pagination header if present
    let pagination = null;
    if (response.headers && response.headers["x-pagination"]) {
      try {
        pagination = JSON.parse(response.headers["x-pagination"]);
      } catch {}
    }

    return { data: result.data, pagination };
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

export const getUserServiceRequestById = async (
  token,
  requestId,
  language = "en"
) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}api/UserService/GetById/${requestId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Accept-Language": language,
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
  status,
  language = "en"
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
          "Accept-Language": language,
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
 * Resolve a user service request
 * @param {string} token - Authorization token
 * @param {number} requestId - The ID of the request to resolve
 * @returns {Promise<Object>} API response
 */
export const resolveUserServiceRequest = async (token, requestId) => {
  const response = await axios.put(
    `${API_BASE_URL}api/UserService/ResolveRequest/${requestId}`,
    {},
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
};

/**
 * Contact a user service request
 * @param {string} token - Authorization token
 * @param {number} requestId - The ID of the request to contact
 * @returns {Promise<Object>} API response
 */
export const contactUserServiceRequest = async (token, requestId) => {
  const response = await axios.put(
    `${API_BASE_URL}api/UserService/ContactRequest/${requestId}`,
    {},
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
};

/**
 * Reject a user service request
 * @param {string} token - Authorization token
 * @param {number} requestId - The ID of the request to reject
 * @returns {Promise<Object>} API response
 */
export const rejectUserServiceRequest = async (token, requestId) => {
  const response = await axios.put(
    `${API_BASE_URL}api/UserService/RejectRequest/${requestId}`,
    {},
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

/**
 * Fetch the top 5 users with the most requested services
 * @param {string} token - Authorization token
 * @returns {Promise<Array>} List of top 5 users
 */
export const getTopFiveUsersRequestedServices = async (token) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}api/ApplicationUsers/GetTopFiveUsersRequestedServices`,
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
      throw new Error(result.error?.description || "Failed to fetch top users");
    }
    return result.data; // List of top 5 users
  } catch (error) {
    const errorMsg =
      error.response?.data?.error?.description ||
      error.message ||
      "Error fetching top users";
    console.error("Get top 5 users error:", errorMsg);
    throw new Error(errorMsg);
  }
};

/**
 * Fetch the top 5 requested services
 * @param {string} token - Authorization token
 * @returns {Promise<Array>} List of top 5 services
 */
export const getTopFiveRequestedServices = async (token) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}api/Services/GetTopFiveRequestedServices`,
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
        result.error?.description || "Failed to fetch top services"
      );
    }
    return result.data; // List of top 5 services
  } catch (error) {
    const errorMsg =
      error.response?.data?.error?.description ||
      error.message ||
      "Error fetching top services";
    console.error("Get top 5 services error:", errorMsg);
    throw new Error(errorMsg);
  }
};

/**
 * Change user password
 * @param {string} token - Authorization token
 * @param {Object} passwordData - Password change data
 * @param {string} passwordData.oldPassword - Current password (optional for admin)
 * @param {string} passwordData.newPassword - New password
 * @param {string} passwordData.userId - User ID (optional for admin password change)
 * @returns {Promise<Object>} API response
 */
export const changePassword = async (token, passwordData) => {
  try {
    const requestData = {
      newPassword: passwordData.newPassword,
      confirmPassword: passwordData.newPassword,
    };

    // Add oldPassword if provided (for user's own password change)
    if (passwordData.oldPassword) {
      requestData.oldPassword = passwordData.oldPassword;
    }

    // Add userId if provided (for admin password change)
    if (passwordData.userId) {
      requestData.userId = passwordData.userId;
    }

    const response = await axios.post(
      `${API_BASE_URL}api/ApplicationUsers/ResetPassword`,
      requestData,
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
      throw new Error(result.error?.description || "Failed to change password");
    }

    return result.data;
  } catch (error) {
    const errorMsg =
      error.response?.data?.error?.description ||
      error.message ||
      "Change password error";

    console.error("Change password error:", errorMsg);
    throw new Error(errorMsg);
  }
};

/**
 * Reset user password by support
 * @param {string} token - Authorization token
 * @param {Object} resetData - Reset password data
 * @param {string} resetData.email - User's email address
 * @param {string} resetData.phone - User's phone number
 * @returns {Promise<Object>} API response with new password
 */
export const resetPasswordBySupport = async (token, resetData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}api/ApplicationUsers/ResetPasswordBySupport?emailOrPhone=${
        resetData.email || resetData.phone
      }`,
      {
        params: {
          emailOrPhone: resetData.email || resetData.phone,
        },
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
      throw new Error(result.error?.description || "Failed to reset password");
    }

    return result.data;
  } catch (error) {
    const errorMsg =
      error.response?.data?.error?.description ||
      error.message ||
      "Reset password error";

    console.error("Reset password error:", errorMsg);
    throw new Error(errorMsg);
  }
};

/**
 * Mark notifications as read
 * @param {string} token - Authorization token
 * @param {Array<string>} notificationIds - Array of notification IDs to mark as read
 * @returns {Promise<Object>} API response
 */
export const markNotificationAsRead = async (token, notificationIds) => {
  try {
    // console.log(notificationIds);
    const response = await axios.put(
      `${API_BASE_URL}api/Notifications/MarkAsRead`,
      notificationIds,
      {
        headers: {
          // "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          // Accept: "application/json",
        },
        timeout: 10000, // 10-second timeout
      }
    );

    const result = response.data;

    if (!result.isSuccess) {
      throw new Error(
        result.error?.description || "Failed to mark notifications as read"
      );
    }

    return result.data;
  } catch (error) {
    const errorMsg =
      error.response?.data?.error?.description ||
      error.message ||
      "Mark notifications as read error";

    console.error("Mark notifications as read error:", errorMsg);
    throw new Error(errorMsg);
  }
};

/**
 * Get all notifications
 * @param {string} token - Authorization token
 * @returns {Promise<Array>} List of notifications
 */
export const getAllNotifications = async (token, language = "en") => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}api/Notifications/GetAllNotifications`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Accept-Language": language,
        },
        timeout: 10000, // 10-second timeout
      }
    );

    const result = response.data;

    if (!result.isSuccess) {
      throw new Error(
        result.error?.description || "Failed to fetch notifications"
      );
    }

    return result.data;
  } catch (error) {
    const errorMsg =
      error.response?.data?.error?.description ||
      error.message ||
      "Get notifications error";

    console.error("Get notifications error:", errorMsg);
    throw new Error(errorMsg);
  }
};
