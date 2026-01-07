import React, { Suspense, useEffect, useState } from "react";
import useUserStore from "../store/userStore";
import useConstStore from "../store/constStore";
import useDashboardStore from "../store/dashboardStore";
import axios from "axios";
// import Marquee from "../components/Dashboard/Marquee";
import Intro from "../components/Dashboard/Intro";
import Loader from "../components/common/Loader";
import { FaWallet } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
const Card = React.lazy(() => import("../components/Dashboard/Card"));
const Graph = React.lazy(() => import("../components/Dashboard/Graph"));
const DetailedCards = React.lazy(() =>
  import("../components/Dashboard/DetailedCards")
);

const DepinSection = React.lazy(() =>
  import("../components/Dashboard/DepinSection")
);

const ClaimReward = React.lazy(() =>
  import("../components/Dashboard/ClaimReward")
);

const Link = React.lazy(() => import("../components/Dashboard/Link"));
const Img = React.lazy(() => import("../components/Dashboard/Img"));
const YouTube = React.lazy(() => import("../components/Dashboard/YouTube"));
const Transaction = React.lazy(() =>
  import("../components/Dashboard/Transaction")
);
const Footer = React.lazy(() => import("../components/common/Footer"));

function Dashboard() {
  const { user, isConnected, token } = useUserStore();
  const { baseUrl, setScreenLoading } = useConstStore();
  const { dashboardData, setDashBoardData } = useDashboardStore();

  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);

  const [title, setTitle] = useState("");
  const [msg, setMsg] = useState("");
  const [delegatorWalletAddress, setDeligatorWalletAddress] = useState("")

  useEffect(() => {
    setScreenLoading(true);
    const fetchUserData = async () => {
      if (user && isConnected) {
        try {
          const [dashboardRes, generalRes] = await Promise.all([
            axios.post(
              `${baseUrl}dashboard`,
              { user_id: user?.id },
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            ),
            axios.get(`${baseUrl}generalSetting`, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }),
          ]);

          console.log({ dashboardRes, generalRes })
          setDeligatorWalletAddress(generalRes.data.data.delegator_reward_wallet)
          // Handle dashboard response
          if (dashboardRes.data.status === 200) {
            setDashBoardData(dashboardRes.data.data);
          }

          // Handle general settings response
          if (generalRes.data.status === 200) {
            if (generalRes.data.data.popup_status === 1) {
              setShowModal(true);
              setTitle(generalRes.data.data.popup_title);
              setMsg(generalRes.data.data.popup_message.split("\n"));
            }
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setScreenLoading(false);
        }
      }
    };

    fetchUserData();
  }, [user, isConnected]);

  useEffect(() => {
    if (!dashboardData) {
      return
    }

    if (dashboardData?.user_wallet?.roi_wallet == 0) {
      return
    }

    const total = (dashboardData?._4x_pending) + (dashboardData?._4x_income)
    const percentage = (dashboardData?._4x_income / total) * 100;

    // console.log((0 / 0) * 100)
    if (percentage >= 85 && percentage < 100) {
      setShowModal2(true)
    }

    if (percentage == 100 || total == 0) {
      setShowModal3(true)
    }
    // console.log({ total, income: dashboardData?._4x_income, pending: dashboardData?._4x_pending, percentage })
  }, [dashboardData])

  const Data = [
    {
      title: "WITHDRAW BALANCE",
      balance: dashboardData?.user_wallet?.balance.toFixed(4),
      icon: FaWallet,
      show: true,
      footer: "Total locked across all validators",
      svg: ''
    },
    {
      title: "DEPOSIT BALANCE",
      balance: dashboardData?.user_wallet?.deposit_balance.toFixed(4),
      icon: FaWallet,
      show: true,
      footer: "Total locked across all validators",
      svg: ''
    },
    {
      title: "DIRECT TEAM",
      balance: dashboardData?.total_direct,
      icon: FaWallet,
      show: false,
      footer: "Total locked across all validators",
      svg: (
      <svg
        className="absolute top-0 right-0 h-full w-auto px-2"
        width="30"
        height="40"
        viewBox="0 0 60 88"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.75">
          <path d="M28.9384 39.3422L60 58.6512L31.2618 74.375L0 56.1276L28.9384 39.3422Z" fill="url(#paint0_linear)" />
          <path d="M28.9384 30L60 49.309L31.2618 65.0328L0 46.7854L28.9384 30Z" fill="url(#paint1_linear)" />
          <path d="M28.9384 20.4456L60 39.7546L31.2618 55.4784L0 37.231L28.9384 20.4456Z" fill="url(#paint2_linear)" />
          <path d="M28.9384 11.9528L60 31.2618L31.2618 46.9856L0 28.7382L28.9384 11.9528Z" fill="url(#paint3_linear)" />
        </g>
        <defs>
          <linearGradient id="paint0_linear" x1="45.6309" y1="43.0203" x2="14.3692" y2="71.7585" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1E1822" />
            <stop offset="1" stopColor="#3EECB5" />
          </linearGradient>
          <linearGradient id="paint1_linear" x1="45.6309" y1="33.6781" x2="14.3692" y2="62.4163" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1E1822" />
            <stop offset="1" stopColor="#3EECB5" />
          </linearGradient>
          <linearGradient id="paint2_linear" x1="45.6309" y1="24.1237" x2="14.3692" y2="52.8619" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1E1822" />
            <stop offset="1" stopColor="#3EECB5" />
          </linearGradient>
          <linearGradient id="paint3_linear" x1="45.6309" y1="15.6309" x2="14.3692" y2="44.3691" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1E1822" />
            <stop offset="1" stopColor="#3EECB5" />
          </linearGradient>
        </defs>
      </svg>
      )
    },
    {
      title: "LEVEL TEAM",
      balance: dashboardData?.all_team,
      icon: FaWallet,
      show: false,
      footer: "Total locked across all validators",
      svg: (<svg className="absolute top-0 right-0 h-full w-auto px-2" viewBox="0 0 60 61" width="30" height="40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M43.5235 24.1619H35.3964V56.99H43.5235V24.1619Z" fill="url(#paint0_linear_96_566)" />
        <path d="M54.5443 15.9811H46.4171V56.9868H54.5443V15.9811Z" fill="url(#paint1_linear_96_566)" />
        <path d="M32.5027 32.3722H24.3755V56.9934H32.5027V32.3722Z" fill="url(#paint2_linear_96_566)" />
        <path d="M21.4819 40.5826H13.3547V56.9967H21.4819V40.5826Z" fill="url(#paint3_linear_96_566)" />
        <path d="M10.4614 48.793H2.33423V57.0001H10.4614V48.793Z" fill="url(#paint4_linear_96_566)" />
        <path d="M0 45.892L23.0307 21.8403L23.6828 21.1593L24.3559 21.8887L28.8946 26.8065L27.3009 26.7507L48.0176 4.98303L50.7174 7.69691L28.8424 28.3003L27.9721 29.1199L27.2485 28.2444L22.9852 23.086L24.3103 23.1344L0 45.892Z" fill="url(#paint5_linear_96_566)" />
        <path d="M52.4771 12.0572L55.7405 0L43.6666 3.20073L52.4771 12.0572Z" fill="url(#paint6_linear_96_566)" />
        <defs>
          <linearGradient id="paint0_linear_96_566" x1="39.4599" y1="24.1619" x2="39.4599" y2="56.99" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1E1822" />
            <stop offset="1" stopColor="#3EECB5" />
          </linearGradient>
          <linearGradient id="paint1_linear_96_566" x1="50.4807" y1="15.9811" x2="50.4807" y2="56.9868" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1E1822" />
            <stop offset="1" stopColor="#3EECB5" />
          </linearGradient>
          <linearGradient id="paint2_linear_96_566" x1="28.4391" y1="32.3722" x2="28.4391" y2="56.9934" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1E1822" />
            <stop offset="1" stopColor="#3EECB5" />
          </linearGradient>
          <linearGradient id="paint3_linear_96_566" x1="17.4183" y1="40.5826" x2="17.4183" y2="56.9967" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1E1822" />
            <stop offset="1" stopColor="#3EECB5" />
          </linearGradient>
          <linearGradient id="paint4_linear_96_566" x1="6.39781" y1="48.793" x2="6.39781" y2="57.0001" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1E1822" />
            <stop offset="1" stopColor="#3EECB5" />
          </linearGradient>
          <linearGradient id="paint5_linear_96_566" x1="25.3587" y1="4.98303" x2="25.3587" y2="45.892" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1E1822" />
            <stop offset="1" stopColor="#3EECB5" />
          </linearGradient>
          <linearGradient id="paint6_linear_96_566" x1="49.7036" y1="-2.90776e-08" x2="49.7036" y2="12.0572" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1E1822" />
            <stop offset="1" stopColor="#3EECB5" />
          </linearGradient>
        </defs>
      </svg>
      )
    },
  ];

  const Data2 = [
    {
      title: "DELEGATOR REWARD",
      amount: dashboardData?.daily_profit.toFixed(4),
      balanceRoi: dashboardData?.user_wallet?.roi_pending.toFixed(4),
      tag: (
        <div>
          Earn delegator rewards{" "}
          <span className="text-[#1FD022] font-semibold">10.8%</span> per month
        </div>
      ),
      showBtn: false,
    },
    {
      title: "DIRECT BONUS",
      amount: dashboardData?.direct_income.toFixed(4),
      tag: (
        <div>
          Earn direct bonus up to{" "}
          <span className="text-[#1FD022] font-semibold">10%</span> from team
        </div>
      ),
    },
    {
      title: "DELEGATOR LEVEL BONUS",
      amount: dashboardData?.level_profit.toFixed(4),
      tag: (
        <div>
          Earn passive delegator level rewards up to{" "}
          <span className="text-[#1FD022] font-semibold">20</span> level
        </div>
      ),
    },
    {
      title: "RANK & REWARD",
      amount: dashboardData?.rank_income.toFixed(4),
      tag: (
        <div>
          Qualify rank & earn up to{" "}
          <span className="text-[#1FD022] font-semibold">$ 20,00,000</span>
        </div>
      ),
    },
  ];

  return (
    <div className="flex-1 p-4 flex flex-col gap-3 max-w-screen">
      {showModal && (
        <div className="fixed z-30 bg-black/70 inset-0 pt-2">
          <div className="w-full max-w-md sm:max-w-lg mx-auto bg-gradient-to-br from-[#0D1B2A] to-[#09182C] text-gray-200 shadow-xl rounded-2xl p-5 sm:p-6 border border-gray-700">
            {/* Heading */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-7 bg-emerald-500 rounded-full"></div>
              <h2 className="text-lg sm:text-xl font-semibold text-white">
                Notice
              </h2>
            </div>

            {/* Message */}
            <div className="text-gray-300 leading-relaxed mb-5 text-sm sm:text-base">
              <span className="font-semibold text-emerald-400 block mb-2">
                Important Update – Changes Effective from November 1, 2025
              </span>
              <p>We would like to inform you about the following updates that will take effect from November 1, 2025:</p>
              <ol class="list-decimal list-inside">
                <li>Email & Wallet Address Update Policy.
                  <ul class="list-disc list-inside ml-5">
                    <li>Delegators will no longer be able to change their registered email or wallet address directly.</li>
                    <li>Any change requests must be sent to support from the same registered email address for verification.</li>
                  </ul>
                </li>
                <li>Delegator Capping Limit.
                  <ul class="list-disc list-inside ml-5">
                    <li>The new capping amount for delegators is 2.4X.</li>
                  </ul>
                </li>
                <li>Affiliate Capping Limit.
                  <ul class="list-disc list-inside ml-5">
                    <li>The new capping amount for affiliates is 5.4X.</li>
                    <li>After reaching this limit, the user account will become inactive.</li>
                  </ul>
                </li>
                <li>Inactive Accounts.
                  <ul class="list-disc list-inside ml-5">
                    <li>Inactive users will not receive daily income or new income.</li>
                  </ul>
                </li>
              </ol>
              <p >We appreciate your understanding and continued support.
                If you have any questions or need assistance, please contact our support team.</p>
              <p className="mt-2">Best Regards,</p>
              <p className="text-emerald-500">Team Asia Validator</p>
            </div>

            {/* Button */}
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white text-sm font-medium rounded-lg shadow-md cursor-pointer transition"
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      )}
      {showModal2 && (
        <div className="fixed z-30 bg-black/70 inset-0 pt-2">
          <div className="w-full max-w-md sm:max-w-lg mx-auto bg-gradient-to-br from-[#0D1B2A] to-[#09182C] text-gray-200 shadow-xl rounded-2xl p-5 sm:p-6 border border-gray-700">
            {/* Heading */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-7 bg-emerald-500 rounded-full"></div>
              <h2 className="text-lg sm:text-xl font-semibold text-white">
                Notice
              </h2>
            </div>

            {/* Message */}
            <div className="text-gray-300 leading-relaxed mb-5 text-sm sm:text-base">
              {/* <span className="font-semibold text-emerald-400 block mb-2">
                Important Update – Changes Effective from November 1, 2025
              </span> */}
              <p className="mt-2">Dear Delegator,</p>
              <p className="mt-2">Congratulations! 🎉</p>
              <p className="mt-2">You have reached 4.5× profit on your delegated amount.</p>
              <p className="mt-2">Please activate your delegation as soon as possible.
                If your account reaches 5.4× without activation, it may be deactivated and you could begin losing your accumulated income.</p>
              <p className="mt-2">Best Regards,</p>
              <p className="text-emerald-500">Team Asia Validator</p>
            </div>

            {/* Button */}
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal2(false)}
                className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white text-sm font-medium rounded-lg shadow-md cursor-pointer transition"
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      )}
      {showModal3 && (
        <div className="fixed z-30 bg-black/70 inset-0 pt-2">
          <div className="w-full max-w-md sm:max-w-lg mx-auto bg-gradient-to-br from-[#0D1B2A] to-[#09182C] text-gray-200 shadow-xl rounded-2xl p-5 sm:p-6 border border-gray-700">
            {/* Heading */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-7 bg-emerald-500 rounded-full"></div>
              <h2 className="text-lg sm:text-xl font-semibold text-white">
                Notice
              </h2>
            </div>

            {/* Message */}
            <div className="text-gray-300 leading-relaxed mb-5 text-sm sm:text-base">
              {/* <span className="font-semibold text-emerald-400 block mb-2">
                Important Update – Changes Effective from November 1, 2025
              </span> */}
              <p className="mt-2">Dear Delegator,</p>
              <p className="mt-2">Congratulations! 🎉</p>
              <p className="mt-2">You have reached 5.4× profit on your delegated amount.</p>
              <p>Please activate your delegation to continue earning daily rewards.</p>
              <p className="mt-2">Best Regards,</p>
              <p className="text-emerald-500">Team Asia Validator</p>
            </div>

            {/* Button */}
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal3(false)}
                className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white text-sm font-medium rounded-lg shadow-md cursor-pointer transition"
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      )}
      {showModal4 && (
        <div className="fixed z-30 bg-black/70 inset-0 pt-2">
          <div className="w-full max-w-md sm:max-w-lg mx-auto bg-gradient-to-br from-[#0D1B2A] to-[#09182C] text-gray-200 shadow-xl rounded-2xl p-5 sm:p-6 border border-gray-700">
            {/* Heading */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-7 bg-emerald-500 rounded-full"></div>
              <h2 className="text-lg sm:text-xl font-semibold text-white">
                Notice
              </h2>
            </div>

            {/* Message */}
            <div className="text-gray-300 leading-relaxed mb-5 text-sm sm:text-base">
              {/* <span className="font-semibold text-emerald-400 block mb-2">
                Important Update – Changes Effective from November 1, 2025
              </span> */}
              <p className="mt-2">Dear Delegator,</p>
              <p className="mt-2">We are upgrading our system.</p>
              <p className="mt-2">From Wednesday onwards, the following will be updated:</p>
              <ul>
                <li className="flex items-center gap-1"> <GoDotFill /> Re-staking</li>
                <li className="flex items-center gap-1"> <GoDotFill /> Rank</li>
                <li className="flex items-center gap-1"> <GoDotFill /> Salary</li>
              </ul>
              <p className="mt-2">Thank you for your continued support.</p>
              <p className="mt-2">Best Regards,</p>
              <p className="text-emerald-500">Team Asia Validator</p>
            </div>

            {/* Button */}
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal4(false)}
                className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white text-sm font-medium rounded-lg shadow-md cursor-pointer transition"
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      )}
      {/* <Marquee /> */}
      <Intro address={delegatorWalletAddress} />

      <Suspense fallback={<Loader />}>
        <div className="grid sm:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-5
      text-sm leading-4
        ">
          {Data.map((item, index) => (
            <Card
              key={index}
              icon={item.icon}
              title={item.title}
              balance={item.balance}
              show={item.show}
              footer={item.footer}
              svg={item.svg}
            />


          ))}


        </div>
      </Suspense>

      <Suspense fallback={<Loader />}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-8 text-sm leading-4  rounded-[10px] border border-[rgba(14,252,239,0.3)]
        bg-[rgba(0,0,0,0.001)]
        shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 m-4 ">

              {Data2.map((item, index) => (
                <DetailedCards
                  key={index}
                  title={item.title}
                  amount={item.amount}
                  show={item.showBtn}
                  balanceRoi={item.balanceRoi}
                >
                  {item.tag}
                </DetailedCards>
              ))}

            </div>

             <div className="grid grid-cols-1 md:grid-cols-1 gap-4 m-4">
              <ClaimReward
                balanceRoi={dashboardData?.user_wallet?.roi_pending.toFixed(4)}
              />
            </div>


          </div>
          <div className="md:col-span-4 p-4 rounded-[10px] border border-[rgba(14,252,239,0.3)]
        bg-[rgba(0,0,0,0.001)]
        shadow-[0px_4px_4px_rgba(0,0,0,0.25)]" >
            <DepinSection />
          </div>
        </div>


      </Suspense>


      <Suspense fallback={<Loader />}>
        <Graph />
      </Suspense>



      {/* <Suspense fallback={<Loader />}>
        <Link />
      </Suspense>

      <Suspense fallback={<Loader />}>
        <Img />
      </Suspense>

      <Suspense fallback={<Loader />}>
        <YouTube />
      </Suspense> */}

      <Suspense fallback={<Loader />}>
        <Transaction />
      </Suspense>

      <Suspense fallback={<Loader />}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default Dashboard;
