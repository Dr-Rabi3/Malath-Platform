import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Button from "../atoms/Button";
import photo from "../../assets/images/1560a64114a9372e.jpg";
import { getDurationFromNow } from "../../utils/timeAge";
import { Select } from "antd";
import Editor from "../Organisms/Editor";

function ShowService() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { service, isAdmin = false } = location.state;
  return (
    <div className="bg-accent-25 p-2 sm:p-4 pb-8 sm:pb-16 shadow-custom-gray rounded-lg sm:rounded-2xl">
      <div className="mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b-2 border-[#6F6E6E]/30 pb-2 mb-4 sm:mb-6">
          <div className="flex items-center gap-2">
            <img
              src={photo}
              alt=""
              className="rounded-full w-8 h-8 sm:w-10 sm:h-10 object-cover"
            />
            <h1 className="text-sm sm:text-base font-semibold">
              Mohamed Abdalrazek
            </h1>
          </div>
          <div className="flex gap-2 items-center justify-center">
            <span className="text-xs sm:text-sm font-regular text-[#727272]">
              {getDurationFromNow(service.createdAt)}
            </span>
            <svg
              width="18"
              height="19"
              className="sm:w-[21px] sm:h-[22px]"
              viewBox="0 0 21 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.2693 11C19.2693 15.777 15.3924 19.6539 10.6154 19.6539C5.8384 19.6539 1.96143 15.777 1.96143 11C1.96143 6.22298 5.8384 2.34601 10.6154 2.34601C15.3924 2.34601 19.2693 6.22298 19.2693 11Z"
                stroke="#727272"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.8257 13.752L11.143 12.151C10.6757 11.8741 10.2949 11.2077 10.2949 10.6625V7.11438"
                stroke="#727272"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Service Content */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-[30px]">
          <div className="flex-1 rounded-lg shadow-md h-full ">
            <Editor
              content={`<h1 style="text-align: center">I have a big brand to marketing it<strong> (any description of service user write it)</strong></h1><hr><p><span>qI have a big brand to marketig it<strong> (any description of service user write it),</strong> I have a big brand to marketing it (any description of service user write it). </span></p>`}
            />
          </div>
          <div className="space-y-4 sm:space-y-5 w-full lg:max-w-[300px]">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 m-0 border-b-2 border-gray-300 h-fit pb-2">
              <h1 className="text-sm sm:text-base font-medium">
                Request Status:
              </h1>
              <Select
                defaultValue="review"
                style={{ width: "100%", maxWidth: "120px" }}
                className="w-full sm:w-auto"
                // onChange={handleChange}
                disabled={isAdmin}
                options={[
                  { value: "review", label: "Review" },
                  { value: "accepted", label: "Accepted", disabled: true },
                  { value: "canceled", label: "Canceled" },
                  { value: "reject", label: "Rejected" },
                ]}
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 m-0 border-b-2 border-gray-300 h-fit pb-2">
              <h1 className="text-sm sm:text-base font-medium">Type:</h1>
              <p className="m-0 text-sm sm:text-base">Social media</p>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 m-0 border-b-2 border-gray-300 h-fit pb-2">
              <h1 className="text-sm sm:text-base font-medium">Service:</h1>
              <p className="m-0 text-sm sm:text-base">Marketing</p>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start gap-2 m-0 border-b-2 border-gray-300 h-fit pb-2">
              <h1 className="text-sm sm:text-base font-medium">Name:</h1>
              <p className="m-0 text-sm sm:text-base break-words">
                I have a big brand to marketing it (any title of service user
                write it)
              </p>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 m-0 border-b-2 border-gray-300 h-fit pb-2">
              <h1 className="text-sm sm:text-base font-medium">Link:</h1>
              <p className="m-0 text-sm sm:text-base break-all">
                WWW.Google.com
              </p>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 m-0 border-b-2 border-gray-300 h-fit pb-2">
              <h1 className="text-sm sm:text-base font-medium">
                Phone number:
              </h1>
              <p className="m-0 text-sm sm:text-base">+201030666109</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowService;
