import { Collapse, theme } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";

const text = `
  <div>
    We provide expert consulting to help you launch, grow, or expand your
    business. This includes:
    <ul class="list-disc ml-5">
      <li>Feasibility studies</li>
      <li>Market and competitor analysis</li>
      <li>Expansion strategies and startup support</li>
    </ul>
  </div>`;
const getItems = (panelStyle) => [
  {
    key: "1",
    label: "Business Development",
    children: <div dangerouslySetInnerHTML={{ __html: text }} />,
    style: panelStyle,
  },
  {
    key: "2",
    label: "Executive Support Services",
    children: <div dangerouslySetInnerHTML={{ __html: text }} />,
    style: panelStyle,
  },
  {
    key: "3",
    label: "Marketing Services",
    children: <div dangerouslySetInnerHTML={{ __html: text }} />,
    style: panelStyle,
  },
  {
    key: "4",
    label: "Project Supervision",
    children: <div dangerouslySetInnerHTML={{ __html: text }} />,
    style: panelStyle,
  },
  {
    key: "5",
    label: "Administrative & Financial Services",
    children: <div dangerouslySetInnerHTML={{ __html: text }} />,
    style: panelStyle,
  },
  {
    key: "6",
    label: "Real Estate Marketing",
    children: <div dangerouslySetInnerHTML={{ __html: text }} />,
    style: panelStyle,
  },
];

function CustomCollapse() {
  const { token } = theme.useToken();
  const panelStyle = {
    marginBottom: 10,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };
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
        style={{ background: token.colorBgContainer }}
        expandIconPosition="end"
        items={ getItems(panelStyle)}
      />
    </>
  );
}

export default CustomCollapse;
