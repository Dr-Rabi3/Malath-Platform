import TopUser from "../Organisms/TopUsers";

import { useQuery } from "@tanstack/react-query";
import { getAllCategories, getAllServices } from "../../api/http";
import { useAuth } from "../../store/AuthContext";
import { Table } from "antd";
import TopServices from "./TopServices";
import "../../assets/styles/responsive-table.css";
import { useTranslation } from "react-i18next";


function AdminDashboard() {
  const { t } = useTranslation();
  const { user } = useAuth();

const columns = [
  {
    title: t("adminDashboard.category", "Category"),
    dataIndex: "categoryName",
    key: "categoryName",
    width: 120,
    onCell: (__, index = 0) =>
      index % 2 === 0 ? { rowSpan: 2 } : { rowSpan: 0 },
    ellipsis: true,
  },
  {
    title: t("adminDashboard.serviceName", "Service Name"),
    dataIndex: "name",
    key: "name",
    width: 180,
    ellipsis: true,
  },
  {
    title: t("adminDashboard.description", "Description"),
    dataIndex: "description",
    key: "description",
    ellipsis: true,
  },
];
  const {
    data: services,
    isLoading: servicesLoading,
    error: servicesError,
  } = useQuery({
    queryKey: ["services"],
    queryFn: () => getAllServices(user?.token),
    enabled: !!user?.token,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
    cacheTime: Infinity,
  });
  const {
    data: categories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getAllCategories(user?.token),
    enabled: !!user?.token,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  // Transform services data for the table
  const tableData = (services || []).map((service) => {
    const category = (categories || []).find(
      (cat) => cat.id === service.categoryId
    );
    return {
      key: service.id,
      categoryName: category?.name || "Unknown Category",
      name: service.name,
      description: service.description,
      price: service.price,
      status: service.status,
      ...service,
    };
  });

  if (servicesLoading || categoriesLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">
          {t("common.loading", "Loading services...")}
        </div>
      </div>
    );
  }

  // if (servicesError || categoriesError) {
  //   return (
  //     <div className="flex items-center justify-center h-64">
  //       <div className="text-lg text-red-600">
  //         {t(
  //           "adminDashboard.errorLoading",
  //           "Error loading services. Please try again."
  //         )}
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8">
        <div className="w-full">
          <TopUser />
        </div>
        <div className="w-full">
          <TopServices />
        </div>
      </div>

      {/* Services Table Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                {t("adminDashboard.allServices", "All Services")}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {t("adminDashboard.servicesFound", {
                  count: tableData.length,
                  defaultValue: "{{count}} services found",
                })}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-sm text-gray-500">
                {t("adminDashboard.showing", {
                  count: tableData.length,
                  defaultValue: "Showing {{count}} of {{count}} services",
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table
            columns={columns}
            dataSource={tableData}
            loading={servicesLoading || categoriesLoading}
            pagination={{
              pageSize: 10,
              showTotal: (total, range) =>
                t("adminDashboard.pagination", {
                  from: range[0],
                  to: range[1],
                  total,
                  defaultValue: "{{from}}-{{to}} of {{total}} services",
                }),
              responsive: true,
            }}
            className="responsive-table"
          />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
