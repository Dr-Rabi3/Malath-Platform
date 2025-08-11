import { Card, Row, Col } from "antd";
import { useTranslation } from "react-i18next";

function CustomCollapse({ services }) {
  const { t } = useTranslation();
  console.log(services);
  return (
    <div className="w-full">
      <Row gutter={[32, 32]} className="w-full">
        {services?.map((service, index) => {
          // Calculate column size based on total number of services
          let colSize = 8; // Default for 3+ cards
          if (services.length === 1) {
            colSize = 24; // Single card takes full width
          } else if (services.length === 2) {
            colSize = 12; // Two cards take half width each
          }

          return (
            <Col
              key={service.categoryId}
              xs={24}
              sm={12}
              lg={colSize}
              className="animate-fade-in-up"
              style={{
                animationDelay: `${index * 150}ms`,
                animationFillMode: "both",
                padding: 0,
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
                        <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
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
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default CustomCollapse;
