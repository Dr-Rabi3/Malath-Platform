import { Col, Row } from "antd";
import photo from "../../assets/images/Rectangle 8.png";

const pros = [
  "We have deep insights into both local and regional markets",
  "We offer flexible, customizable solutions tailored to each business",
  "We prioritize quality and speed in every project we handle",
  "Our team brings diverse, cross-industry expertise",
  "We believe our success begins with the success of our clients",
];

function Pros() {
  return (
    <Row
      justify="space-between"
      align="middle"
      gutter={[0, 32]} // vertical gutter for spacing on mobile
      className="flex-wrap"
    >
      <Col
        xs={24}
        md={12}
        className="flex justify-center items-center mb-8 md:mb-0"
      >
        <img
          src={photo}
          alt="photo"
          className="w-full max-w-xs md:max-w-md lg:max-w-lg h-auto object-contain rounded-lg shadow-md"
        />
      </Col>
      <Col xs={24} md={12} className="flex items-center">
        <div className="w-full space-y-8 md:space-y-[50px] px-2 md:px-8">
          <h1 className="font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-[45px] font-main leading-tight">
            Why Choose <span className="text-brand-600">Mala</span>th?
          </h1>
          <ul className="flex flex-col gap-6 md:gap-10">
            {pros.map((item, index) => (
              <li
                key={index}
                className="font-main text-base sm:text-lg md:text-[20px] flex items-center gap-3 md:gap-5"
              >
                <span className="block w-2 h-2 md:w-3 md:h-3 bg-neutral-950 rounded-full"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Col>
    </Row>
  );
}
export default Pros;
