import { useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserById, uploadFile, getFile, updateUser } from "../../api/http";
import { message } from "antd";

import UserData from "../Organisms/UserData";
import UserServices from "../Organisms/UserServices";
import ChangePasswordModal from "../Organisms/ChangePasswordModal";
import { Avatar } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/AuthContext";
import { useTranslation } from "react-i18next";

function Profile() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("data"); // "data" or "service"
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [messageApi, contextHolder] = message.useMessage();
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  // Fetch user data using React Query
  const {
    data: userData,
    isLoading: userLoading,
    error: userError,
  } = useQuery({
    queryKey: ["user", user?.userId],
    queryFn: () => getUserById(user?.token, user?.userId),
    enabled: !!user?.token && !!user?.userId,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Fetch profile image if user has one
  const { data: profileImageBlob } = useQuery({
    queryKey: ["profileImage", userData?.profilePicture],
    queryFn: () => getFile(userData?.profilePicture),
    enabled: !!userData?.profilePicture,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  // Create image URL from blob when profile image is fetched
  useEffect(() => {
    if (profileImageBlob) {
      const imageUrl = URL.createObjectURL(profileImageBlob);
      console.log(imageUrl);
      setProfileImageUrl(imageUrl);

      // Cleanup function to revoke the URL when component unmounts or image changes
      return () => {
        URL.revokeObjectURL(imageUrl);
      };
    }
  }, [profileImageBlob]);

  // Upload file mutation
  const uploadMutation = useMutation({
    mutationFn: (file) => uploadFile(user?.token, file, "image"),
    onSuccess: (uploadedPath) => {
      messageApi.success(t("profile.imageUploadSuccess"));
      // Update user data with new profile image path
      queryClient.invalidateQueries({ queryKey: ["user", user?.userId] });
      setSelectedFile(null);
      setPreviewUrl(null);
    },
    onError: (error) => {
      messageApi.error(t("profile.imageUploadFail", { error: error.message }));
    },
  });

  // Update user mutation
  const updateUserMutation = useMutation({
    mutationFn: (userData) => updateUser(userData),
    onSuccess: () => {
      messageApi.success(t("profile.profileUpdateSuccess"));
      queryClient.invalidateQueries({ queryKey: ["user", user?.userId] });
    },
    onError: (error) => {
      messageApi.error(
        t("profile.profileUpdateFail", { error: error.message })
      );
    },
  });

  useEffect(() => {
    if (!user.token) {
      console.log(user);
      navigate("/login", {
        state: {
          from: `/profile`,
          message: "Please log in to continue",
        },
      });
    }
  }, [user, user.token]);

  // Handle file selection
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    console.log("Selected file:", file);

    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        messageApi.error(t("profile.imageUploadErrorType"));
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        messageApi.error(t("profile.imageUploadErrorSize"));
        return;
      }

      setSelectedFile(file);

      // Create preview URL
      const url = URL.createObjectURL(file);
      console.log("Created preview URL:", url);
      setPreviewUrl(url);
    }
  };

  // Handle file upload
  const handleUpload = () => {
    if (selectedFile) {
      uploadMutation.mutate(selectedFile);
    }
  };

  // Handle form submission from UserData component
  const handleFormSubmit = async (formValues) => {
    if (!userData) {
      messageApi.error(t("profile.userDataUnavailable"));
      return;
    }

    setIsSubmitting(true);
    try {
      console.log(
        "Current userData.profilePicture:",
        userData?.profilePicture,
        typeof userData?.profilePicture
      );

      let profilePicturePath = userData?.profilePicture; // Keep existing path if no new image

      // If there's a new image selected, upload it first
      if (selectedFile) {
        messageApi.loading(t("profile.uploadingImage"));
        const uploadedPath = await uploadFile(
          user?.token,
          selectedFile,
          "image"
        );
        console.log("Uploaded image path:", uploadedPath, typeof uploadedPath);

        // Ensure we have a string URL, not an object
        if (typeof uploadedPath === "object" && uploadedPath.url) {
          profilePicturePath = uploadedPath.url;
        } else if (typeof uploadedPath === "string") {
          profilePicturePath = uploadedPath;
        } else {
          throw new Error("Invalid upload response format");
        }

        setSelectedFile(null);
        setPreviewUrl(null);
        messageApi.success("Image uploaded successfully!");
      }

      // Ensure profilePicture is a string
      if (typeof profilePicturePath === "object" && profilePicturePath.url) {
        profilePicturePath = profilePicturePath.url;
      }

      console.log(
        "Final profilePicturePath:",
        profilePicturePath,
        typeof profilePicturePath
      );

      // Prepare user data for update with correct API field names
      const updateData = {
        id: userData.id, // Include user ID
        fullNameAr: formValues.name, // Map name to fullNameAr
        fullNameEn: formValues.name, // Map name to fullNameEn (or you can have separate Arabic/English fields)
        mobileNumber: formValues.phone,
        whatsAppNumber: formValues.whatsapp,
        profilePicture: profilePicturePath, // This should be a string URL
        email: formValues.email,
        country: formValues.country,
        city: formValues.city,
        // Keep other existing fields from userData that we're not updating
        ...Object.fromEntries(
          Object.entries(userData).filter(
            ([key]) =>
              ![
                "id",
                "fullNameAr",
                "fullNameEn",
                "mobileNumber",
                "whatsAppNumber",
                "profilePicture",
                "email",
                "country",
                "city",
              ].includes(key)
          )
        ),
      };

      console.log("Update data:", updateData);
      console.log("Profile picture type:", typeof updateData.profilePicture);

      messageApi.loading(t("profile.updatingProfile"));
      await updateUser(user?.token, updateData);
      messageApi.success("Profile updated successfully!");

      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["user", user?.userId] });
    } catch (error) {
      messageApi.error(`Failed to update profile: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get profile image source
  const getProfileImageSrc = () => {
    console.log("Preview URL:", previewUrl);
    console.log("Profile Image URL:", profileImageUrl);
    if (previewUrl) return previewUrl; // Show preview first if available
    if (profileImageUrl) return profileImageUrl; // Then show existing profile image
    return null;
  };

  if (userLoading) {
    return (
      <div className="max-w-4xl mx-auto mt-10 p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800 mx-auto mb-4"></div>
            <p className="text-gray-600">{t("profile.loading")}</p>
          </div>
        </div>
      </div>
    );
  }

  if (userError) {
    return (
      <div className="max-w-4xl mx-auto mt-10 p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-red-600 mb-4">{t("profile.errorLoading")}</p>
            <p className="text-gray-600 text-sm">{userError.message}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {contextHolder}
      <div className="max-w-4xl mx-auto mt-10 p-6">
        {/* Profile Section */}
        <div className="flex items-center space-x-2 mb-8 gap-2">
          <Avatar
            size={60}
            src={getProfileImageSrc()}
            icon={<UserOutlined />}
          />
          <div className="flex justify-center items-center space-x-4">
            <input
              id="image"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileSelect}
            />
            <label
              htmlFor="image"
              className="border border-neutral-950 text-[14px] text-neutral-950 px-2 py-1 rounded hover:bg-neutral-700/10 cursor-pointer"
            >
              {t("profile.uploadPhoto")}
            </label>
            <button
              onClick={() => setPasswordModalVisible(true)}
              className="border border-blue-600 text-[14px] text-blue-600 px-2 py-1 rounded hover:bg-blue-600 hover:text-white transition-colors duration-200"
            >
              {t("profile.changePassword")}
            </button>
          </div>
        </div>
        {/* Tabs */}
        <div className="relative flex border-b mb-4 text-sm font-medium">
          <button
            className={`w-1/2 text-center pb-2 transition-colors duration-300 ${
              activeTab === "data"
                ? "text-blue-800 font-semibold"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("data")}
          >
            {t("profile.dataTab")}
          </button>
          <button
            className={`w-1/2 text-center pb-2 transition-colors duration-300 ${
              activeTab === "service"
                ? "text-yellow-700 font-semibold"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("service")}
          >
            {t("profile.serviceTab")}
          </button>
          {/* Animated underline */}
          <span
            className={`absolute bottom-0 left-0 h-0.5 rounded transition-all duration-300`}
            style={{
              width: "50%",
              background: activeTab === "data" ? "#1e40af" : "#ca8a04", // blue-800 or yellow-700
              transform:
                activeTab === "data"
                  ? `translateX(${lang === "ar" ? "100%" : "0%"})`
                  : `translateX(${lang === "ar" ? "0%" : "100%"})`,
            }}
          />
        </div>
        <div className="relative min-h-[100px]">
          <TabContent active={activeTab === "data"}>
            {/* Data tab content */}
            <UserData
              userData={userData}
              onSubmit={handleFormSubmit}
              isSubmitting={isSubmitting}
            />
          </TabContent>
          <TabContent active={activeTab === "service"}>
            {/* Service tab content */}
            <UserServices />
          </TabContent>
        </div>
      </div>

      {/* Change Password Modal */}
      <ChangePasswordModal
        visible={passwordModalVisible}
        onCancel={() => setPasswordModalVisible(false)}
        loading={false}
      />
    </>
  );
}

// Fade/slide transition for tab content
function TabContent({ active, children }) {
  return (
    <div
      className={`absolute w-full transition-all duration-300 ${
        active
          ? "opacity-100 translate-x-0 pointer-events-auto"
          : "opacity-0 translate-x-4 pointer-events-none"
      }`}
    >
      {children}
    </div>
  );
}

export default Profile;
