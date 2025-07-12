import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";
import { useEffect, useState } from "react";
import { getTopFiveRequestedServices } from "@/api/http";
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
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
const colors = ["#211C84", "#4D55CC", "#7A73D1", "#B5A8D5", "#DAD2FF"];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "#211C84",
  },
  safari: {
    label: "Safari",
    color: "#4D55CC",
  },
  firefox: {
    label: "Firefox",
    color: "#7A73D1",
  },
  edge: {
    label: "Edge",
    color: "#B5A8D5",
  },
  other: {
    label: "Other",
    color: "#DAD2FF",
  },
};
function TopServices() {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const [topServices, setTopServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const lang = i18n.language;
  const isRTL = lang === "ar";

  useEffect(() => {
    const fetchTopServices = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getTopFiveRequestedServices(user.token);
        setTopServices(data.services || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (user?.token) {
      fetchTopServices();
    }
  }, [user?.token]);

  // Transform API data for the chart
  const chartData = topServices.map((s, idx) => ({
    name: s.name,
    requests: s.totalRequestedServices,
    fill: colors[idx],
  }));

  console.log(chartData);

  return (
    <Card className="h-fit w-full bg-white shadow-sm border border-gray-200 card-hover">
      <CardHeader className="pb-4 sm:pb-6">
        <div
          className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 ${
            isRTL ? "sm:flex-row-reverse" : ""
          }`}
        >
          <div className={`${isRTL ? "text-right" : "text-left"}`}>
            <CardTitle className="text-base sm:text-lg lg:text-2xl font-semibold text-gray-900">
              {t("topServices.title", "Top Services")}
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm lg:text-base text-gray-600 mt-1">
              {t(
                "topServices.description",
                "Most requested services this month"
              )}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2 text-blue-600">
            <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-xs sm:text-sm font-medium">+8.3%</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:px-4 lg:px-6 pb-4 sm:pb-6">
        <div className="w-full h-full min-h-[180px] sm:min-h-[250px] lg:min-h-[300px] flex flex-col items-center justify-center">
          <div className="w-full max-w-full sm:max-w-[320px] lg:max-w-[360px] aspect-square">
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
                <PieChart
                  width={undefined}
                  height={undefined}
                  className="w-full h-full"
                >
                  <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                  <Pie
                    data={chartData}
                    dataKey="requests"
                    nameKey="name"
                    // cx="50%"
                    // cy="50%"
                    // outerRadius="80%"
                    // innerRadius="40%"
                    // paddingAngle={2}
                  />
                  <ChartLegend
                    content={<ChartLegendContent nameKey="name" />}
                    className={`flex flex-wrap justify-center gap-2 mt-4 ${
                      isRTL ? "rtl" : "ltr"
                    }`}
                  />
                </PieChart>
              </ChartContainer>
            )}
          </div>
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
            {t("topServices.total", {
              count: topServices.length,
              defaultValue: "Total: {{count}} services",
            })}
          </div>
          <div
            className={`flex items-center gap-2 text-xs sm:text-sm ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            <span className="text-gray-500">
              {t("topServices.lastUpdatedLabel", "Last updated:")}
            </span>
            <span className="font-medium">
              {loading ? "-" : t("topServices.lastUpdatedValue", "Just now")}
            </span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export default TopServices;
