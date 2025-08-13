import { useEffect } from "react";
import { Spin } from "antd";
import Home from "../Organisms/Home.jsx";
import MetaData from "../Organisms/MetaData.jsx";
import { useSliderData } from "../../hooks/useSliderData";

function Landing() {
  return (
    <>
      <div className="space-y-[20px]">
        <MetaData id="#who" />
      </div>
    </>
  );
}

export default Landing;
