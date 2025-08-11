import { useTranslation } from "react-i18next";

function States() {
  const { t } = useTranslation();

  return (
    <div className="relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Large Left Card - Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-neutral-950 rounded-2xl p-8 lg:p-12 text-white h-full">
              <div className="flex items-center gap-4 mb-6">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 8C0 3.58172 3.58172 0 8 0H40C44.4183 0 48 3.58172 48 8V40C48 44.4183 44.4183 48 40 48H8C3.58172 48 0 44.4183 0 40V8Z"
                    fill="white"
                  />
                  <rect
                    x="23"
                    y="8"
                    width="2"
                    height="12"
                    rx="1"
                    fill="#D4C1A5"
                  />
                  <rect
                    x="23"
                    y="28"
                    width="2"
                    height="12"
                    rx="1"
                    fill="#D4C1A5"
                  />
                  <rect
                    x="34.6064"
                    y="11.9794"
                    width="2"
                    height="12"
                    rx="1"
                    transform="rotate(45 34.6064 11.9794)"
                    fill="#D4C1A5"
                  />
                  <rect
                    x="20.4648"
                    y="26.1215"
                    width="2"
                    height="12"
                    rx="1"
                    transform="rotate(45 20.4648 26.1215)"
                    fill="#D4C1A5"
                  />
                  <rect
                    x="28"
                    y="25"
                    width="2"
                    height="12"
                    rx="1"
                    transform="rotate(-90 28 25)"
                    fill="#D4C1A5"
                  />
                  <rect
                    x="8"
                    y="25"
                    width="2"
                    height="12"
                    rx="1"
                    transform="rotate(-90 8 25)"
                    fill="#D4C1A5"
                  />
                  <rect
                    x="26.1211"
                    y="27.5355"
                    width="2"
                    height="12"
                    rx="1"
                    transform="rotate(-45 26.1211 27.5355)"
                    fill="#D4C1A5"
                  />
                  <rect
                    x="11.9795"
                    y="13.3934"
                    width="2"
                    height="12"
                    rx="1"
                    transform="rotate(-45 11.9795 13.3934)"
                    fill="#D4C1A5"
                  />
                </svg>
                <div>
                  <div className="text-xl lg:text-3xl font-medium text-white mb-2">
                    3500 Project
                  </div>
                </div>
              </div>

              <div className="text-white text-base lg:text-lg leading-relaxed">
                Our commitment to sustainability shines through as we proudly
                announce the generation of 5,000 megawatt-hours of renewable
                energy, contributing to a greener and more environmentally
                friendly future.
              </div>
            </div>
          </div>

          {/* Right Column - Stacked Small Cards */}
          <div className="lg:col-span-1 flex flex-col gap-5 justify-between">
            {/* Card 1 - Customers */}
            <div className="bg-neutral-950 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-4">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 8C0 3.58172 3.58172 0 8 0H40C44.4183 0 48 3.58172 48 8V40C48 44.4183 44.4183 48 40 48H8C3.58172 48 0 44.4183 0 40V8Z"
                    fill="white"
                  />
                  <path
                    d="M24.0003 10.6667C20.6866 10.6667 18.0003 13.353 18.0003 16.6667C18.0003 19.9804 20.6866 22.6667 24.0003 22.6667C27.314 22.6667 30.0003 19.9804 30.0003 16.6667C30.0003 13.353 27.314 10.6667 24.0003 10.6667Z"
                    fill="#D4C1A5"
                  />
                  <path
                    d="M24.0003 24C17.6566 24 13.2225 28.6948 12.6729 34.5419C12.6377 34.9156 12.7617 35.2867 13.0144 35.5643C13.2671 35.8418 13.625 36 14.0003 36H34.0003C34.3757 36 34.7336 35.8418 34.9863 35.5643C35.2389 35.2867 35.3629 34.9156 35.3278 34.5419C34.7781 28.6948 30.344 24 24.0003 24Z"
                    fill="#D4C1A5"
                  />
                </svg>
                <div>
                  <div className="text-3xl font-bold text-yellow-100">
                    1000+
                  </div>
                  <div className="text-sm text-yellow-100/80">
                    Customers Served
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 - Experience */}
            <div className="bg-neutral-950 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-4">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 8C0 3.58172 3.58172 0 8 0H40C44.4183 0 48 3.58172 48 8V40C48 44.4183 44.4183 48 40 48H8C3.58172 48 0 44.4183 0 40V8Z"
                    fill="white"
                  />
                  <path
                    d="M24.0004 31.0334L18.4671 34.3667C18.2227 34.5223 17.9671 34.5889 17.7004 34.5667C17.4338 34.5445 17.2004 34.4556 17.0004 34.3001C16.8004 34.1445 16.6449 33.9503 16.5338 33.7174C16.4227 33.4845 16.4004 33.2232 16.4671 32.9334L17.9338 26.6334L13.0338 22.4001C12.8115 22.2001 12.6729 21.9721 12.6178 21.7161C12.5627 21.4601 12.5791 21.2103 12.6671 20.9667C12.7551 20.7232 12.8884 20.5232 13.0671 20.3667C13.2458 20.2103 13.4902 20.1103 13.8004 20.0667L20.2671 19.5001L22.7671 13.5667C22.8782 13.3001 23.0507 13.1001 23.2844 12.9667C23.5182 12.8334 23.7569 12.7667 24.0004 12.7667C24.244 12.7667 24.4827 12.8334 24.7164 12.9667C24.9502 13.1001 25.1227 13.3001 25.2338 13.5667L27.7338 19.5001L34.2004 20.0667C34.5115 20.1112 34.756 20.2112 34.9338 20.3667C35.1115 20.5223 35.2449 20.7223 35.3338 20.9667C35.4227 21.2112 35.4395 21.4614 35.3844 21.7174C35.3293 21.9734 35.1902 22.2009 34.9671 22.4001L30.0671 26.6334L31.5338 32.9334C31.6004 33.2223 31.5782 33.4836 31.4671 33.7174C31.356 33.9512 31.2004 34.1454 31.0004 34.3001C30.8004 34.4547 30.5671 34.5436 30.3004 34.5667C30.0338 34.5898 29.7782 34.5232 29.5338 34.3667L24.0004 31.0334Z"
                    fill="#D4C1A5"
                  />
                </svg>
                <div>
                  <div className="text-3xl font-bold text-yellow-100">5+</div>
                  <div className="text-sm text-yellow-100/80">
                    Years Experience
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default States;
