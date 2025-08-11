import { Card } from "antd";
import { useTranslation } from "react-i18next";

function CustomCollapse({ services }) {
  const { t, i18n } = useTranslation();
  console.log(services);

  // Calculate flex basis based on total number of services
  const getFlexBasis = () => {
    if (services?.length === 1) {
      return "100%"; // Single card takes full width
    } else if (services?.length === 2) {
      return "calc(50% - 12.5px)"; // Two cards take half width with gap
    } else {
      return "calc(33.333% - 16.67px)"; // Three or more cards with gap
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-6">
        {services?.map((service, index) => (
          <div
            key={service.categoryId}
            className="animate-fade-in-up"
            style={{
              animationDelay: `${index * 150}ms`,
              animationFillMode: "both",
              flexBasis: getFlexBasis(),
              minWidth: "300px", // Minimum width for responsiveness
            }}
          >
            <Card
              className="w-full h-full bg-white border-[1px] border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
              bodyStyle={{
                padding: "24px",
              }}
            >
              <h2 className="text-[30px] font-light text-neutral-950">
                {service.categoryName}
              </h2>

              <ul className="space-y-2">
                {service.services.map((item) => (
                  <li key={item.id} className="flex flex-col items-start">
                    <div className="flex">
                      <span
                        className={`w-2 h-2 bg-gray-400 rounded-full mt-2 ${
                          i18n.language === "ar" ? "ml-3" : "mr-3"
                        } flex-shrink-0`}
                      ></span>
                      <span className="text-gray-600 text-base">
                        {item.name}
                      </span>
                    </div>
                    <span className="pl-5 text-gray-600 text-base">
                      {item.description}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomCollapse;
