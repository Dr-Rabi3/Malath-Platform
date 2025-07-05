import { useNavigate } from "react-router-dom";
import Button from "../atoms/Button";
import CustomCollapse from "../Organisms/CustomCollapse";
import { useTranslation } from "react-i18next";

function Service() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="space-y-[20px]">
      <div className="flex justify-end">
        <Button
          className="bg-neutral-1000 hover:bg-neutral-950 font-main font-medium"
          onClick={() => navigate("../add-service")}
        >
          {t("service_request")}
        </Button>
      </div>
      <CustomCollapse />
    </div>
  );
}
export default Service;
