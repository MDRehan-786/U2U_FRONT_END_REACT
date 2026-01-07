import React, { Suspense } from "react";
import { RiCoinFill } from "react-icons/ri";
import { IoIosSettings } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { GiChessQueen } from "react-icons/gi";
import { FaBuilding } from "react-icons/fa";
import { SiLevelsdotfyi } from "react-icons/si";
import { SiVirustotal } from "react-icons/si";
import { GrStakeholder } from "react-icons/gr";
import Loader from "../common/Loader";
import useDashboardStore from "../../store/dashboardStore";
import stakePng from "../../../public/stake.png";
import teamPng from "../../../public/team.png";
import useUserStore from "../../store/userStore";
const Chart = React.lazy(() => import("react-apexcharts"));

function Graph() {
  const { dashboardData } = useDashboardStore();
  const { user } = useUserStore();
  if (!dashboardData) {
    return <Loader />;
  }

  //const series = [dashboardData?.daily_profit, dashboardData?.pending_roi];
  const total_income_2x = (parseFloat(dashboardData?.daily_profit) + parseFloat(dashboardData?.level_profit)).toFixed(4)
  const total_principle = dashboardData?.total_investment.toFixed(4);
  const total_capping_2x = dashboardData?.total_capping_2x.toFixed(4);

  const series = [parseFloat(total_principle), parseFloat(total_income_2x), parseFloat(total_capping_2x)];

  const options = {
    chart: {
      type: "donut",
      toolbar: { show: false },
    },
    labels: ["Principle", "Total Earned", "Max Earnings Cap"],
    legend: { show: false },
    dataLabels: { enabled: false },
    tooltip: {
      enabled: true,
      custom: function ({ series, seriesIndex, w }) {
        // pick your own color based on the slice
        const colors = ["#FEBC1D", "#A0FE1D", "#FEBC1D"]; // one color per slice
        const bg = colors[seriesIndex] || "#FEBC1D";
        const label = w.globals.labels[seriesIndex];

        return `
      <div style="
        background:${bg};
        color:#fff;
        padding:6px 10px;
        border-radius:6px;
        font-size:14px;">
        <strong>${label}</strong>: ${series[seriesIndex]}
      </div>
    `;
      },
    },
    stroke: {
      show: false,
      width: 6,
      colors: "#1F2C24",
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "radial",
        shadeIntensity: 0.5,
        gradientToColors: ["#71D2FF", "#A0FE1D", "#FEBC1D"],
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
      colors: ["#7EDA9F", "#fff"],
    },
  plotOptions: {
  pie: {
    donut: {
      labels: {
        show: true,
        name: { show: true },
        value: { show: true },
        total: {
          show: true,
          showAlways: true,
          label: "",
          formatter: function (w) {
            const earned = w.globals.series[1];
            const cap = w.globals.series[2];
            return `${((earned / cap) * 100).toFixed(1)}%`;
          }
        }
      }
    }
  }
}

  };

  const options1 = {
    chart: {
      type: "donut",
      toolbar: { show: false },
    },

    labels: ["Principle", "Total Earned", "Max Earnings Cap"],
    legend: { show: false },
    dataLabels: { enabled: false },
    tooltip: {
      enabled: true,
      custom: function ({ series, seriesIndex, w }) {
        // pick your own color based on the slice
        const colors = ["#38C66C", "#4CC9B0", "#FFD166", "#828985"]; // one color per slice
        const bg = colors[seriesIndex] || "#333";
        const label = w.globals.labels[seriesIndex];

        return `
      <div style="
        background:${bg};
        color:#fff;
        padding:6px 10px;
        border-radius:6px;
        font-size:14px;">
        <strong>${label}</strong>: ${series[seriesIndex]}
      </div>
    `;
      },
    },
    stroke: {
      show: false,
      width: 6,
      colors: "#1F2C24",
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "radial",
        shadeIntensity: 0.5,
        gradientToColors: ["#71D2FF", "#A0FE1D", "#FEBC1D"],
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
      colors: ["#7EDA9F", "#84D8C7", "#fff", "#fff"],
    },
    plotOptions: {
  pie: {
    donut: {
      labels: {
        show: true,
        name: { show: true },
        value: { show: true },
        total: {
          show: true,
          showAlways: true,
          label: "",
          formatter: function (w) {
            const earned = w.globals.series[1];
            const cap = w.globals.series[2];
            return `${((earned / cap) * 100).toFixed(1)}%`;
          }
        }
      }
    }
  }
}
  };

  const series1 = [
    dashboardData?.total_investment,
    dashboardData?._4x_income,
    dashboardData?.total_capping_4x,

  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-5">
      <div className="md:col-span-12 text-sm leading-4 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <div className="rounded-lg bg-[#1F2C24] p-3  rounded-[10px] 
          border border-[rgba(14,252,239,0.3)]
        bg-[rgba(0,0,0,0.001)]
        shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
            <div className="flex items-center gap-2 border-b border-[#334038] pb-2 font-bold">
              <span className='p-2 bg-[#38DFAA] shadow-[0px_9px_21px_rgba(0,0,0,0.25)] rounded-[4px]
' > <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.5 11C0.367927 10.9983 0.241753 10.9451 0.148353 10.8517C0.0549599 10.7583 0.00172667 10.6321 0 10.5V0.5C0 0.367393 0.05268 0.240213 0.146447 0.146447C0.240213 0.05268 0.367393 0 0.5 0C0.632607 0 0.759787 0.05268 0.853553 0.146447C0.94732 0.240213 1 0.367393 1 0.5V10.5C0.998273 10.6321 0.94504 10.7583 0.851647 10.8517C0.758247 10.9451 0.632073 10.9983 0.5 11Z" fill="white" />
                  <path d="M10.5 11H0.5C0.367393 11 0.240213 10.9473 0.146447 10.8535C0.05268 10.7598 0 10.6326 0 10.5C0 10.3674 0.05268 10.2402 0.146447 10.1465C0.240213 10.0527 0.367393 10 0.5 10H10.5C10.6326 10 10.7598 10.0527 10.8535 10.1465C10.9473 10.2402 11 10.3674 11 10.5C11 10.6326 10.9473 10.7598 10.8535 10.8535C10.7598 10.9473 10.6326 11 10.5 11Z" fill="white" />
                  <path d="M6.83323 7.3339C6.76757 7.33417 6.70243 7.32137 6.64177 7.29617C6.5811 7.27104 6.52603 7.23397 6.4799 7.18724L4.83323 5.54057L3.18657 7.18724C3.09178 7.2755 2.96642 7.32364 2.83689 7.32131C2.70735 7.31904 2.58376 7.26657 2.49215 7.17497C2.40054 7.08337 2.34807 6.95977 2.34578 6.83024C2.3435 6.70071 2.39158 6.57531 2.4799 6.48057L4.4799 4.48057C4.57363 4.38691 4.7007 4.3343 4.83323 4.3343C4.9657 4.3343 5.09283 4.38691 5.18657 4.48057L6.83323 6.12724L9.14657 3.81388C9.24137 3.72556 9.3667 3.67749 9.49623 3.67977C9.62577 3.68205 9.74937 3.73452 9.84097 3.82614C9.93257 3.91774 9.98503 4.04134 9.98737 4.17084C9.98963 4.30037 9.94157 4.42577 9.85323 4.52057L7.18657 7.18724C7.14043 7.23397 7.08537 7.27104 7.0247 7.29617C6.96403 7.32137 6.8989 7.33417 6.83323 7.3339Z" fill="white" />
                  <path d="M9.83333 6.72634C9.70127 6.72461 9.57507 6.67141 9.48167 6.57801C9.38827 6.48461 9.33507 6.35841 9.33333 6.22634V4.33301H7.5C7.3674 4.33301 7.2402 4.28034 7.14647 4.18654C7.05267 4.09279 7 3.96561 7 3.83301C7 3.7004 7.05267 3.57322 7.14647 3.47945C7.2402 3.38569 7.3674 3.33301 7.5 3.33301H9.83333C9.9654 3.33473 10.0916 3.38797 10.185 3.48136C10.2784 3.57476 10.3316 3.70093 10.3333 3.83301V6.22634C10.3316 6.35841 10.2784 6.48461 10.185 6.57801C10.0916 6.67141 9.9654 6.72461 9.83333 6.72634Z" fill="white" />
                </svg>
              </span>
              2X Earnings Progress
            </div>


            <div className="py-3 flex-col gap-6 items-center">
              <div className="flex-1 flex items-center justify-center">
                <Suspense fallback={<Loader />}>
                  <Chart
                    options={options}
                    series={series}
                    type="donut"
                    width="280"
                  />
                </Suspense>
              </div>

              <div className="text-sm flex flex-col">

                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#71D2FF]"></span>
                    <span className="text-gray-300">Total Principal:</span>
                  </div>
                  <span className="text-gray-300" > {dashboardData?.total_investment.toFixed(4)} USD</span>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#A0FE1D]"></span>
                    <span className="text-gray-300">Total Earned:</span>
                  </div>
                  <span className="text-gray-300" > {(parseFloat(dashboardData?.daily_profit) + parseFloat(dashboardData?.level_profit)).toFixed(4)} USD</span>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">


                    <span className="w-2 h-2 rounded-full  bg-[#FEBC1D]"></span>
                    <span className="text-gray-300">Max Earnings Cap:</span>
                  </div>
                  <span className="text-gray-300" >   {dashboardData?.total_capping_2x.toFixed(4)}  USD</span>
                </div>





              </div>

            </div>
          </div>

          <div className="rounded-lg bg-[#1F2C24] p-3  
          rounded-[10px] 
          border border-[rgba(14,252,239,0.3)]
        bg-[rgba(0,0,0,0.001)]
        shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
            <div className="flex items-center gap-2 border-b border-[#334038] pb-2 font-bold">
              <span className='p-2 bg-[#38DFAA] shadow-[0px_9px_21px_rgba(0,0,0,0.25)] rounded-[4px]
' > <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.5 11C0.367927 10.9983 0.241753 10.9451 0.148353 10.8517C0.0549599 10.7583 0.00172667 10.6321 0 10.5V0.5C0 0.367393 0.05268 0.240213 0.146447 0.146447C0.240213 0.05268 0.367393 0 0.5 0C0.632607 0 0.759787 0.05268 0.853553 0.146447C0.94732 0.240213 1 0.367393 1 0.5V10.5C0.998273 10.6321 0.94504 10.7583 0.851647 10.8517C0.758247 10.9451 0.632073 10.9983 0.5 11Z" fill="white" />
                  <path d="M10.5 11H0.5C0.367393 11 0.240213 10.9473 0.146447 10.8535C0.05268 10.7598 0 10.6326 0 10.5C0 10.3674 0.05268 10.2402 0.146447 10.1465C0.240213 10.0527 0.367393 10 0.5 10H10.5C10.6326 10 10.7598 10.0527 10.8535 10.1465C10.9473 10.2402 11 10.3674 11 10.5C11 10.6326 10.9473 10.7598 10.8535 10.8535C10.7598 10.9473 10.6326 11 10.5 11Z" fill="white" />
                  <path d="M6.83323 7.3339C6.76757 7.33417 6.70243 7.32137 6.64177 7.29617C6.5811 7.27104 6.52603 7.23397 6.4799 7.18724L4.83323 5.54057L3.18657 7.18724C3.09178 7.2755 2.96642 7.32364 2.83689 7.32131C2.70735 7.31904 2.58376 7.26657 2.49215 7.17497C2.40054 7.08337 2.34807 6.95977 2.34578 6.83024C2.3435 6.70071 2.39158 6.57531 2.4799 6.48057L4.4799 4.48057C4.57363 4.38691 4.7007 4.3343 4.83323 4.3343C4.9657 4.3343 5.09283 4.38691 5.18657 4.48057L6.83323 6.12724L9.14657 3.81388C9.24137 3.72556 9.3667 3.67749 9.49623 3.67977C9.62577 3.68205 9.74937 3.73452 9.84097 3.82614C9.93257 3.91774 9.98503 4.04134 9.98737 4.17084C9.98963 4.30037 9.94157 4.42577 9.85323 4.52057L7.18657 7.18724C7.14043 7.23397 7.08537 7.27104 7.0247 7.29617C6.96403 7.32137 6.8989 7.33417 6.83323 7.3339Z" fill="white" />
                  <path d="M9.83333 6.72634C9.70127 6.72461 9.57507 6.67141 9.48167 6.57801C9.38827 6.48461 9.33507 6.35841 9.33333 6.22634V4.33301H7.5C7.3674 4.33301 7.2402 4.28034 7.14647 4.18654C7.05267 4.09279 7 3.96561 7 3.83301C7 3.7004 7.05267 3.57322 7.14647 3.47945C7.2402 3.38569 7.3674 3.33301 7.5 3.33301H9.83333C9.9654 3.33473 10.0916 3.38797 10.185 3.48136C10.2784 3.57476 10.3316 3.70093 10.3333 3.83301V6.22634C10.3316 6.35841 10.2784 6.48461 10.185 6.57801C10.0916 6.67141 9.9654 6.72461 9.83333 6.72634Z" fill="white" />
                </svg>
              </span>
              5X Earnings Progress
            </div>

            <div className="py-3 flex-col gap-6 items-center">
              <div className="flex-1 flex items-center justify-center">
                <Suspense fallback={<Loader />}>
                  <Chart
                    options={options1}
                    series={series1}
                    type="donut"
                    width="280"
                  />
                </Suspense>
              </div>

              <div className="text-sm flex flex-col">


                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#71D2FF]"></span>
                    <span className="text-gray-300">Total Principal:</span>
                  </div>
                  <span className="text-gray-300" > {dashboardData?.total_investment.toFixed(4)} USD</span>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#A0FE1D]"></span>
                    <span className="text-gray-300">Total Earned:</span>
                  </div>
                  <span className="text-gray-300" >  {dashboardData?._4x_income.toFixed(4)} USD</span>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full  bg-[#FEBC1D]"></span>
                    <span className="text-gray-300">Max Earnings Cap:</span>
                  </div>
                  <span className="text-gray-300" >   {dashboardData?.total_capping_4x.toFixed(4)}  USD</span>
                </div>


              </div>

            </div>
          </div>


          <div className="rounded-lg">

            <div className="grid grid-cols-1 md:grid-rows-[45%_55%] gap-1">
              <div className="  rounded-[10px] 
                              border border-[rgba(14,252,239,0.3)]
                            bg-[rgba(0,0,0,0.001)]
                            shadow-[0px_4px_4px_rgba(0,0,0,0.25)] p-3">
                <div className="flex items-center gap-2 pb-2 text-gray-300">
                  My Portfolio
                </div>

                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">

                    <span className="font-black text-[20px] leading-[23px]"> ${dashboardData?.total_investment.toFixed(4)} </span>
                  </div>
                  <span className="text-gray-300 rotate-[30deg] rounded-[10px] " >   <img src={stakePng} width="74" height="74" />   </span>
                </div>


                <div className="flex items-center justify-between my-2 p-4
                  rounded-[10px] 
                    border border-[rgba(14,252,239,0.3)]
                  bg-[rgba(0,0,0,0.001)]
                  shadow-[0px_4px_4px_rgba(0,0,0,0.25)]
                  ">
                  <div className="flex items-center gap-2">

                    <span> Total Staked </span>
                  </div>
                  <span className="font-extrabold text-[12px] leading-[14px]" >   ${dashboardData?.total_investment.toFixed(4)}   </span>
                </div>


              </div>


              <div className="  rounded-[10px] 
                  border border-[rgba(14,252,239,0.3)]
                bg-[rgba(0,0,0,0.001)]
                shadow-[0px_4px_4px_rgba(0,0,0,0.25)] p-3">
                <div className="flex items-center gap-2 pb-2 text-gray-300 mb-3">
                  My Referral Team
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 ">

                  <div className="  rounded-[10px] 
                    border border-[rgba(56,223,170,0.1)] flex justify-center flex-col items-center bg-[rgba(56,223,170,0.1)]">
                    <span className="text-center  font-normal text-[10px] leading-[14px] text-[#C7C7C7] py-1">Downline Volume </span>
                    <span className="font-extrabold text-[15px] py-2">  ${user?.all_business.toFixed(2)} </span>
                  </div>

                  <div className="  rounded-[10px] 
                    border border-[rgba(56,223,170,0.1)] flex  justify-center flex-col items-center bg-[rgba(56,223,170,0.1)]">
                    <span className="text-center  font-normal text-[10px] leading-[14px] text-[#C7C7C7] py-1">Team </span>
                    <span className="font-extrabold text-[15px] py-2">  {dashboardData?.all_team} </span>
                  </div>

                  <div className=" rounded-[10px] 
                    border border-[rgba(56,223,170,0.1)] mx-auto  justify-center text-center bg-[rgba(56,223,170,0.1)] font-normal text-[10px] leading-[14px] text-[#C7C7C7]">
                    <img src={teamPng} width="80" height="80" />
                  </div>

                </div>

                <a
                  href="referralhub"
                  className="mt-3 inline-flex items-center justify-center gap-2
                box-border
  bg-[#38DFAA]
  border
  border-[#3EECB5]
  shadow-[0_0_26px_rgba(62,236,181,0.5)]
  rounded-[10px]
              text-black
              px-4 py-3 text-sm font-medium
              shadow-sm
              transition-all duration-200 ease-in-out
              hover:bg-[rgba(255,255,255,0.18)]
              hover:text-white
              hover:shadow-md
              focus:outline-none w-full"

                >
                  View Referral Hub


                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Graph;
