
import Home from "../Organisms/Home.jsx";
import MetaData from "../Organisms/MetaData.jsx";

function Landing() {
  return (
    <div className="container max-w-[1360px] m-auto space-y-[35px]">
      <Home id="#home" />
      <MetaData id="#who" />
    </div>
  );
}

export default Landing;
