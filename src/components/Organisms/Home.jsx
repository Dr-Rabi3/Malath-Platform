import { ImagesSlider } from "../atoms/images-slider.tsx";
import image1 from "../../assets/images/Frame 89-1.png";
import image2 from "../../assets/images/Frame 89-2.png";
import HomeSlider from "../Molecules/HomeSlider.jsx";
import HomeInfo from "../Molecules/HomeInfo.jsx";
const images = [image1, image2];

function Home({ ...props }) {
  return (
    <div className="rounded-md" {...props}>
      <ImagesSlider
        className="h-[600px] rounded-[20px]"
        images={images}
        overlay={false}
      >
        <div className="relative w-full h-full">
          <HomeSlider className="absolute bottom-0 md:bottom-8 md:left-8" />
        </div>
        <div>
          <HomeInfo className="hidden md:block lg:flex absolute bottom-8 right-8" />
        </div>
      </ImagesSlider>
    </div>
  );
}
export default Home;
