import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { useEffect, useState } from "react";
import { getTopFiveUsersRequestedServices } from "@/api/http";
import { useAuth } from "@/store/AuthContext";
import { useTranslation } from "react-i18next";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const colors = [
  "oklch(0.646 0.222 41.116)",
  "oklch(0.6 0.118 184.704)",
  "oklch(0.398 0.07 227.392)",
  "oklch(0.828 0.189 84.429)",
  "oklch(0.769 0.188 70.08)",
];

function TopUser() {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const [topUsers, setTopUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const lang = i18n.language;
  const isRTL = lang === "ar";

  useEffect(() => {
    const fetchTopUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getTopFiveUsersRequestedServices(user.token);
        setTopUsers(data.users || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (user?.token) {
      fetchTopUsers();
    }
  }, [user?.token]);

  // Transform API data for the chart
  const chartData = topUsers.map((u, idx) => ({
    name: u.fullName,
    requests: u.totalRequestedServices,
    fill: colors[idx], // You can customize color per user if desired
  }));

  return (
    <Card className="h-full w-full bg-white shadow-sm border border-gray-200 card-hover">
      <CardHeader className="pb-4 sm:pb-6">
        <div
          className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 ${
            isRTL ? "sm:flex-row-reverse" : ""
          }`}
        >
          <div className={`${isRTL ? "text-right" : "text-left"}`}>
            <CardTitle className="text-base sm:text-lg lg:text-2xl font-semibold text-gray-900">
              {t("topUsers.title", "Top Users")}
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm lg:text-base text-gray-600 mt-1">
              {t("topUsers.description", "Most Five requested users")}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2 text-green-600">
            <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-xs sm:text-sm font-medium">+12.5%</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:px-4 lg:px-6 pb-4 sm:pb-6">
        <div className="w-full h-full min-h-[180px] sm:min-h-[250px] lg:min-h-[300px]">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              {t("common.loading", "Loading...")}
            </div>
          ) : error ? (
            <div className="text-red-500 text-center">
              {t("common.error", { error: error })}
            </div>
          ) : (
            <ChartContainer config={{}} className="w-full h-full">
              <BarChart
                accessibilityLayer
                data={chartData}
                layout="vertical"
                margin={{ left: 0, right: 0, top: 10, bottom: 10 }}
                height={200}
                width={undefined}
                className="w-full"
              >
                <YAxis
                  dataKey="name"
                  type="category"
                  tickLine={false}
                  tickMargin={8}
                  axisLine={false}
                  fontSize={12}
                  width={120}
                />
                <XAxis dataKey="requests" type="number" hide={false} />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar
                  dataKey="requests"
                  layout="vertical"
                  radius={[0, 4, 4, 0]}
                  maxBarSize={40}
                />
              </BarChart>
            </ChartContainer>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-0 px-2 sm:px-4 lg:px-6">
        <div
          className={`flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-2 ${
            isRTL ? "sm:flex-row-reverse" : ""
          }`}
        >
          <div
            className={`text-xs sm:text-sm text-gray-500 ${
              isRTL ? "text-right" : "text-left"
            }`}
          >
            {t("topUsers.total", {
              count: topUsers.length,
              defaultValue: "Total: {{count}} users",
            })}
          </div>
          <div
            className={`flex items-center gap-2 text-xs sm:text-sm ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            <span className="text-gray-500">
              {t("topUsers.lastUpdatedLabel", "Last updated:")}
            </span>
            <span className="font-medium">
              {loading ? "-" : t("topUsers.lastUpdatedValue", "Just now")}
            </span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export default TopUser;
