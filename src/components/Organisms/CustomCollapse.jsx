import { Collapse, theme } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";

const text = `
  <div>
    We provide expert consulting to help you launch, grow, or expand your
    business. This includes:
    <ul class="list-decimal ml-5">
      <li>Feasibility studies</li>
      <li>Market and competitor analysis</li>
      <li>Expansion strategies and startup support</li>
    </ul>
  </div>`;

  
function CustomCollapse({ services }) {
  const { token } = theme.useToken();
  const panelStyle = {
    marginBottom: 10,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };
  const items = services?.map((service) => {
    return {
      key: service.categoryId,
      label: service.categoryName,
      children: (
        <ul className="list-decimal ml-5">
          {service.services.map((item) => {
            return (
              <li key={item.id}>
                {item.name}
                <ul className="list-disc ml-5">
                  {" "}
                  <li> {item.description}</li>
                </ul>
              </li>
            );
          })}
        </ul>
      ),
      style: panelStyle,
    };
  })
  

  return (
    <>
      <style jsx global>{`
        .ant-collapse-item-active .ant-collapse-header {
          border-radius: 10px 10px 0px 0px !important;
          background-color: #3b307d !important;
          color: #fff !important;
        }
        .ant-collapse-header {
          background-color: rgb(75 70 92 / 4% 4%) !important;
          color: #000 !important;
          border-radius: 10px !important;
          border: 1px solid #dbdade !important;
        }
        .ant-collapse-content-active {
          border: 1px solid #dbdade !important;
          border-radius: 0px 0px 10px 10px !important;
          padding: 10px;
        }
      `}</style>
      <Collapse
        className="custom-collapse"
        accordion
        bordered={false}
        defaultActiveKey={["1"]}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        style={{ background: "transparent" }}
        expandIconPosition="end"
        items={items}
      />
    </>
  );
}

export default CustomCollapse;
