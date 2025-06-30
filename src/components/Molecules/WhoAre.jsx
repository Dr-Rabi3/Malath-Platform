import { Col, Row } from "antd";

function WhoAre({ ...props }) {
  return (
    <Row {...props} gutter={[0, 32]} className="flex-wrap">
      <Col
        xs={24}
        md={12}
        className="flex items-center justify-center md:justify-start mb-6 md:mb-0"
      >
        <div className="w-full px-2 md:px-8">
          <h1 className="text-neutral-950 font-extrabold text-2xl sm:text-3xl md:text-[36px] font-main text-center md:text-left">
            Get to Know Malath
          </h1>
          <h2 className="text-neutral-950 font-light text-lg sm:text-xl md:text-[30px] font-main text-center md:text-left mt-2">
            Your Trusted Partner in Business, Marketing & Investment
          </h2>
        </div>
      </Col>
      <Col xs={24} md={12} className="flex items-center justify-center">
        <div className="text-brand-700 font-tiny text-base sm:text-lg md:text-[20px] text-center font-main w-full px-2 md:px-8">
          At Malath, we provide integrated outsourcing solutions for
          entrepreneurs, startups, and investors across Saudi Arabia and Egypt.
          We help our clients streamline operations, scale confidently, and
          focus on what matters most — growth and innovation.
        </div>
      </Col>
    </Row>
  );
}

export default WhoAre;
