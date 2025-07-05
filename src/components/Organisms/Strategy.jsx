import { Col, Row } from "antd";

function Strategy() {
  return (
    <div className="px-2 sm:px-6 md:px-12">
      <h1 className="text-xl sm:text-2xl md:text-[35px] text-neutral-950 font-semibold font-main mb-6">
        Where Strategy Meets Smart Execution
      </h1>
      <Row
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        className="md:mt-20 flex-wrap"
        // align="middle"
      >
        <Col xs={24} md={12} className="mb-6 md:mb-0">
          <ul className="flex flex-wrap gap-3 sm:gap-4">
            <li className="inline-flex bg-brand-600/20 text-xs sm:text-[13px] text-neutral-950 rounded-lg px-4 sm:px-5 py-2 sm:py-3">
              General Business Consulting
            </li>
            <li className="w-[2px] bg-brand-600/50 hidden md:block"></li>
            <li className="inline-flex bg-brand-600/20 text-xs sm:text-[13px] text-neutral-950 rounded-lg px-4 sm:px-5 py-2 sm:py-3">
              Digital Marketing
            </li>
            <li className="w-[2px] bg-brand-600/50 hidden md:block"></li>
            <li className="inline-flex bg-brand-600/20 text-xs sm:text-[13px] text-neutral-950 rounded-lg px-4 sm:px-5 py-2 sm:py-3">
              Real Estate Promotion
            </li>
            <li className="w-[2px] bg-brand-600/50 hidden md:block"></li>
            <li className="inline-flex bg-brand-600/20 text-xs sm:text-[13px] text-neutral-950 rounded-lg px-4 sm:px-5 py-2 sm:py-3">
              Administrative Outsourcing
            </li>
            <li className="w-[2px] bg-brand-600/50 hidden md:block"></li>
            <li className="inline-flex bg-brand-600/20 text-xs sm:text-[13px] text-neutral-950 rounded-lg px-4 sm:px-5 py-2 sm:py-3">
              Feasibility Studies
            </li>
            <li className="w-[2px] bg-brand-600/50 hidden md:block"></li>
            <li className="inline-flex bg-brand-600/20 text-xs sm:text-[13px] text-neutral-950 rounded-lg px-4 sm:px-5 py-2 sm:py-3">
              Remote Executive Services
            </li>
          </ul>
        </Col>
        {/* <Col xs={0} md={2} className="h-full">
          <div className="h-full w-[2px] bg-brand-500/50"></div>
        </Col> */}
        <Col xs={24} md={10} className="mt-6 md:mt-0">
          <div className="font-main text-base sm:text-lg md:text-[20px] text-neutral-950 font-medium">
            Malath empowers entrepreneurs and companies across Saudi Arabia and
            Egypt with flexible, scalable solutions to grow confidently.
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Strategy;
