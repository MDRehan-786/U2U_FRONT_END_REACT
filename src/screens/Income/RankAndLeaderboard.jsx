import React, { Suspense, useEffect, useState } from "react";
import useUserStore from "../../store/userStore";
import useConstStore from "../../store/constStore";
import useDashboardStore from "../../store/dashboardStore";
import axios from "axios";
import Loader from "../../components/common/Loader";
import referralhubImg from "../../../public/referralhub.jpg";
import uphoneImg from "../../../public/uphone.png";
import vintageImg from "../../../public/vintage.png";
const Card2 = React.lazy(() => import("../../components/Dashboard/Card2"));
const Footer = React.lazy(() => import("../../components/common/Footer"));
import { TfiWallet } from "react-icons/tfi";

function RankAndLeaderboard() {
  const { user, isConnected, token } = useUserStore();
  const { baseUrl, setScreenLoading } = useConstStore();
  const { dashboardData, setDashBoardData } = useDashboardStore();
  const [title, setTitle] = useState("");
  const [msg, setMsg] = useState("");

  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);


  


  useEffect(() => {
    // console.log(user?.id);
    setScreenLoading(true);
    const fetchUserData = async () => {
      if (user && isConnected) {
        try {

             const [rankRes,rankRes2] = await Promise.all([
            axios.get(
            `${baseUrl}rank_setting`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          ),
            axios.post(`${baseUrl}rankandleaderboard`,
                { user_id: user?.id },
              {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }),
          ]);
       
          
          
          ;
          // console.log(response.data.data);
          if (rankRes.data.status === 200) {
            setData(rankRes.data.data);
          }

           // console.log(response.data.data);
          if (rankRes2.data.status === 200) {
            setData2(rankRes2.data.data);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setScreenLoading(false);
        }
      }
    };
    fetchUserData();
  }, []);



 
  const target = data?.[user.rank_id]?.strong_lag;
  const strongLeg = data2?.strong_leg_business>target ?target:data2?.strong_leg_business;
  const jointLeg =  data2?.other_leg_business>target ?target:data2?.other_leg_business ;
 const powerLegRestake =  data2?.power_leg_restake;
 const otherLegRestake =  data2?.other_leg_restake;




  return (
    <div className="min-h-screen text-white p-6">

      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

        {/* Title */}
        <div>
          <h1 className="text-xl font-semibold">Ranks & Leaderboard</h1>
          <p className="text-sm text-gray-400">
            Track your progress and compete with top performers
          </p>
        </div>


      </div>

      {/* Top Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-3">

        {/* Overview */}
        <div className="xl:col-span-2 rounded-xl border border-[rgba(14,252,239,0.3)]  p-4">
          <h2 className="font-semibold mb-4">Your Rank</h2>
          <div className="bg-white/[0.04] h-[2px] rounded-[10px] opacity-100 my-4">

          </div>
          {/* 4 STAT CARDS */}
          <div className="xl:col-span-2 rounded-xl p-4">



            {/* Rank Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4 mb-4">
              {[
                {
                  label: "Level",
                  value: user?.rank_id,
                  sub: "Your Current Rank",
                  svg: (
                    <svg
                      className="absolute top-0 inset-y-0 right-0 my-auto h-20 w-auto px-5"
                      viewBox="0 0 92 91"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        opacity="0.75"
                        d="M42.167 37.9167H49.8337..."
                        fill="url(#paint0_linear)"
                      />
                    </svg>
                  ),
                },
                {
                  label: "Monthly Reward",
                  value: `$${data2?.monthly_reward?.toFixed(4) ?? "0.0000"}`,
                  sub: "Total locked across all validators",
                  svg: (
                    <svg
                      className="absolute top-0 inset-y-0 right-0 my-auto h-16 w-auto px-5"
                      viewBox="0 0 47 45"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.75">
                        <path d="M24.549 10.9993..." fill="url(#paint1_linear)" />
                      </g>
                    </svg>
                  ),
                },
              ].map((item, index) => (
                <Card2
                  key={index}
                  title={item.label}
                  balance={item.value}
                  footer={item.sub}
                  svg={item.svg}
                />
              ))}
            </div>

            {/* Divider */}
            <div className=" h-[2px] rounded-[10px] my-4" />

            {/* Progress Section */}
            <div className="rounded-xl ">
              <h3 className="font-semibold mb-4">Progress to {user?.rank_id+1}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Strong Leg */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="opacity-80 tracking-tighter">Strong Leg</span>
                    <span className="font-semibold ">
                      ${strongLeg}<i class='text-[10px] md:text-xs font-normal'> ( Restake : ${powerLegRestake} ) </i>
                     <span className="tracking-tighter"> / ${target}</span> 
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/20">
                    <div
                      className="h-2 rounded-full bg-[#19f5c4]"
                      style={{ width: `${(strongLeg / target) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Joint Leg */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="opacity-80 tracking-tighter">Joint Leg</span>
                    <span className="font-semibold">
                      ${jointLeg}<i class='text-[10px] md:text-xs font-normal'> ( Restake : ${otherLegRestake} )</i>  
                        <span className="tracking-tighter"> / ${target}</span> 
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/20">
                    <div
                      className="h-2 rounded-full bg-[#19f5c4]"
                      style={{ width: `${(jointLeg / target) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Referral Link Card */}
        <div className="box-border bg-[rgba(56,223,170,0.1)] px-4 py-6 flex flex-col gap-3 rounded-[10px]">
          <div className="rounded-lg overflow-hidden border border-white/10">
            <img
              src={referralhubImg}
              alt="Referral"
              className="w-full h-full object-cover"
            />
          </div>
        </div>


      </div>
      {/* Bottom Table */}
  <div className="rounded-[10px] my-3 border border-[rgba(14,252,239,0.3)] p-4">
  {/* Header */}
  <div className="flex items-center gap-2 border-b border-white/20 pb-3 mb-4 text-lg font-semibold">
    <TfiWallet />
    Ranks & History
  </div>

  {/* Table */}
  <div className="overflow-hidden  bg-white/10 rounded-[10px]">
    {data.map((item, index) => (
      <div
        key={index}
        className="grid grid-cols-1 gap-4 p-4 border-b border-white/10 last:border-b-0
                   md:grid-cols-2
                   xl:grid-cols-2 xl:items-start"
      >
        {/* Level */}
        <div className="flex gap-3">
          <svg
            className="w-5 h-5 mt-1 shrink-0 text-white/80"
            viewBox="0 0 20 19"
            fill="none"
          >
            <path
              d="M9.56 1L7.21 6.76L1 7.22L5.76 11.24L4.27 17.28L9.56 14M9.56 1L11.91 6.76L18.12 7.22L13.36 11.24L14.85 17.28L9.56 14"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <div>
            <p className="text-sm font-semibold text-white">
              Rank {item.id}
            </p>
            <p className="text-xs text-white/60 leading-relaxed">
           Power Leg : ${item.strong_lag} | Other leg : ${item.other_lag} |&nbsp;   
              <br className="md:hidden" />
              {item.duration!=0? item.duration+" Months Salary":"One Time Income"} | ${item.reward_amount} Reward
            </p>
          </div>
        </div>

        {/* Phone */}
        {/* <div className="flex items-center justify-center  rounded-lg">
          <div className="flex items-center justify-center  rounded-lg bg-white/5 p-5">
          <span className="text-sm text-white"> phone</span>
          <img
            src={uphoneImg}
            alt="phone"
            className="w-15 h-10 object-contain"
          />
          </div>

          
        </div> */}
     
        {/* Country */}
        {/* <div className="flex items-center justify-center  rounded-lg">
          <div className="flex items-center justify-center  rounded-lg bg-white/5 p-5">
          <div>
            <p className="text-sm text-white">{item.country}</p>
            <p className="text-xs text-white/60">({item.speed})</p>
          </div>
          <img
            src={vintageImg}
            alt="country"
            className="w-15 h-10 rounded object-cover"
          />
          </div>
        </div> */}

        {/* Price */}
        <div className="text-left items-center justify-between md:text-center xl:text-left">
          <span className="text-sm  text-white/70">
            {item.description??'--'}
          </span>
        </div>
      </div>
    ))}
  </div>
</div>


    </div>
  );
}

export default RankAndLeaderboard;
