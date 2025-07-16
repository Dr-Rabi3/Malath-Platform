import { useFetcher, useNavigation } from "react-router-dom";
import { useEffect } from "react";
import { Spin } from "antd";
import Home from "../Organisms/Home.jsx";
import MetaData from "../Organisms/MetaData.jsx";
import { useSliderData } from "../../hooks/useSliderData";

function Landing() {
  const navigation = useNavigation();
  const fetcher = useFetcher();
  const sliderMutation = useSliderData();

  useEffect(() => {
    // Trigger the mutation when component mounts
    sliderMutation.mutate();
  }, []);

  console.log(fetcher);

  // Show loading spinner while data is being fetched
  if (sliderMutation.isPending) {
    return (
      <div className="flex justify-center items-center min-h-[600px]">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="space-y-[20px]">
      <Home
        id="#home"
        slides={sliderMutation.data}
        isLoading={sliderMutation.isPending}
        error={sliderMutation.error}
      />
      <MetaData id="#who" />
    </div>
  );
}

export default Landing;
