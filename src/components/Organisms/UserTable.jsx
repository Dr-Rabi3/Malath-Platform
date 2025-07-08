import { Table, Space, Dropdown } from "antd";
import { useState } from "react";
import AddUserModal from "./AddUserModal";
import Button from "../atoms/Button";
import { EditUser } from "../../assets/icons/EditUser";
import { DeleteUser } from "../../assets/icons/DeleteUser";
import { useAuth } from "../../store/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllUsers } from "../../api/http";
import { deleteUser } from "../../api/admin";
import { updateUser, addUserWithRole, getUserForUpdate } from "../../api/http";
import { Roles } from "../../utils/roles";

const UserTable = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editLoading, setEditLoading] = useState(false);
  const { user } = useAuth();
  const token = user?.token;

  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: ({ token, userId }) => deleteUser(token, userId),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  const userMutation = useMutation({
    mutationFn: async ({ values, editingUser }) => {
      if (editingUser) {
        // Update user
        const userData = {
          id: editingUser.id,
          fullNameAr: values.name,
          fullNameEn: values.name,
          mobileNumber: values.mobileNumber,
          whatsAppNumber: values.whatsAppNumber,
          profilePicture: editingUser.profilePicture || "",
          email: values.email,
          role: values.rule,
        };
        await updateUser(token, userData);
      } else {
        // Add user
        const userData = {
          role: values.rule,
          fullNameAr: values.name,
          fullNameEn: values.name,
          mobileNumber: values.mobileNumber,
          whatsAppNumber: values.whatsAppNumber,
          profilePicture: "",
          email: values.email,
          password: values.password,
          confirmPassword: values.confirmPassword,
        };
        await addUserWithRole(token, userData);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setIsModalVisible(false);
      setEditingUser(null);
    },
    onError: (error) => {
      alert(error.message || "Failed to save user");
    },
  });

  const handleDelete = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteMutation.mutate({ token, userId });
    }
  };

  const handleEdit = async (user) => {
    setEditLoading(true);
    try {
      const userData = await getUserForUpdate(token, user.id);
      setEditingUser(userData);
      setIsModalVisible(true);
    } catch (err) {
      alert(err.message || "Failed to fetch user data");
    } finally {
      setEditLoading(false);
    }
  };

  const handleModalSubmit = (values) => {
    userMutation.mutate({ values, editingUser });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setEditingUser(null);
  };

  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUsers(token),
    enabled: !!token && user.role === Roles.Admin, // only run if token exists
  });

  const columns = [
    {
      title: "User Name",
      dataIndex: "fullName",
      responsive: ["md"],
      render: (text, record) => (
        <div className="flex flex-col">
          <span className="font-medium text-gray-900">{text}</span>
          <span className="text-sm text-gray-500 md:hidden">
            {record.email}
          </span>
        </div>
      ),
    },
    {
      title: "Rule",
      dataIndex: "role",
      responsive: ["lg"],
      render: (text) => (
        <span className="capitalize px-2 py-1 bg-gray-100 rounded-full text-sm">
          {text}
        </span>
      ),
    },
    {
      title: "Number",
      dataIndex: "mobileNumber",
      responsive: ["xl"],
    },
    {
      title: "Email",
      dataIndex: "email",
      responsive: ["md"],
      render: (text) => <span className="text-gray-600 break-all">{text}</span>,
    },
    {
      title: "",
      key: "actions",
      render: (_, record) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "1",
                label: (
                  <button
                    className="flex items-center gap-2 w-full px-3 py-2 text-left hover:bg-gray-50 transition-colors"
                    onClick={() => handleEdit(record)}
                  >
                    <EditUser />
                    <span className="text-sm">Edit user</span>
                  </button>
                ),
              },
              {
                key: "2",
                label: (
                  <button
                    className="flex items-center gap-2 w-full px-3 py-2 text-left hover:bg-gray-50 transition-colors text-red-600"
                    onClick={() => handleDelete(record.id)}
                  >
                    <DeleteUser />
                    <span className="text-sm">Delete user</span>
                  </button>
                ),
              },
            ],
          }}
          trigger={["click"]}
          placement="bottomRight"
        >
          <span className="text-[18px] cursor-pointer hover:bg-gray-100 p-1 rounded transition-colors">
            ⋮
          </span>
        </Dropdown>
      ),
    },
  ];

  const data = users || [];

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  // console.log(data);
  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-xl font-bold text-gray-900">Users</h2>
        <Button
          className="!bg-[#E6F3FF] !text-[#000] !text-[15px] !font-medium !shadow-custom-gray !rounded-md !hover:bg-[#c7e1f8] w-full sm:w-auto"
          onClick={() => setIsModalVisible(true)}
        >
          Add New User
        </Button>
      </div>

      {/* Mobile Card View */}
      <div className="block lg:hidden space-y-4">
        {data.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{item.fullName}</h3>
                <p className="text-sm text-gray-500">{item.email}</p>
              </div>
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "1",
                      label: (
                        <button
                          className="flex items-center gap-2 w-full px-3 py-2 text-left hover:bg-gray-50 transition-colors"
                          onClick={() => handleEdit(item)}
                        >
                          <EditUser />
                          <span className="text-sm">Edit user</span>
                        </button>
                      ),
                    },
                    {
                      key: "2",
                      label: (
                        <button
                          className="flex items-center gap-2 w-full px-3 py-2 text-left hover:bg-gray-50 transition-colors text-red-600"
                          onClick={() => handleDelete(item.id)}
                        >
                          <DeleteUser />
                          <span className="text-sm">Delete user</span>
                        </button>
                      ),
                    },
                  ],
                }}
                trigger={["click"]}
                placement="bottomRight"
              >
                <span className="text-[18px] cursor-pointer hover:bg-gray-100 p-1 rounded transition-colors">
                  ⋮
                </span>
              </Dropdown>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-500">Role:</span>
                <span className="ml-1 capitalize px-2 py-1 bg-gray-100 rounded-full text-xs">
                  {item.role}
                </span>
              </div>
              <div>
                <span className="text-gray-500">Phone:</span>
                <span className="ml-1">{item.mobileNumber}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block">
        <Table
          // rowSelection={{}}
          columns={columns}
          dataSource={data}
          rowKey="id"
          pagination={true}
          className="responsive-table"
          scroll={{ x: 800 }}
        />
      </div>

      <AddUserModal
        visible={isModalVisible}
        onCancel={handleModalCancel}
        userToEdit={editingUser}
        onSubmit={handleModalSubmit}
        loading={userMutation.isPending || editLoading}
      />
    </div>
  );
};

export default UserTable;
