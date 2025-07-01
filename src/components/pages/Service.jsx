import { useNavigate } from "react-router-dom";
import Button from "../atoms/Button";
import CustomCollapse from "../Organisms/CustomCollapse";

function Service() {
  const navigate = useNavigate();
  return (
    <div className="space-y-[20px]">
      <div className="flex justify-end">
        <Button
          className="bg-neutral-1000 hover:bg-neutral-950 font-main font-medium"
          onClick={() => navigate("../add-service")}
        >
          Service Request
        </Button>
      </div>
      <CustomCollapse />
    </div>
  );
}
export default Service;
