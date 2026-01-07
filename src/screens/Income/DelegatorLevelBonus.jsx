import React, { Suspense, useEffect, useState } from "react";
import useUserStore from "../../store/userStore";
import useConstStore from "../../store/constStore";
import useDashboardStore from "../../store/dashboardStore";
import axios from "axios";
import Loader from "../../components/common/Loader";
import referralhubImg from "../../../public/level.png";
const Card2 = React.lazy(() => import("../../components/Dashboard/Card2"));
const Footer = React.lazy(() => import("../../components/common/Footer"));


function DelegatorLevelBonus() {
  const { user, isConnected, token } = useUserStore();
  const { baseUrl, setScreenLoading } = useConstStore();
  const { dashboardData, setDashBoardData } = useDashboardStore();
  const [title, setTitle] = useState("");
  const [msg, setMsg] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
    const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
 

  useEffect(() => {
    setScreenLoading(true);
    const fetchUserData = async () => {
      if (user && isConnected) {
        try {
          const response = await axios.post(
            `${baseUrl}delegator_level_bonus`,
            { user_id: user?.id },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          // console.log(response.data.data);
          if (response.data.status === 200) {
            setData(response.data.data.logs);
            setFilteredData(response.data.data.logs);
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

  const handleDateFilter = () => {
    let filtered = [...data];

    if (fromDate && toDate) {
      const from = new Date(fromDate);
      const to = new Date(toDate);
      filtered = filtered.filter((item) => {
        const created = new Date(item.created_at);
        return created >= from && created <= to;
      });
    }

    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIdx = (currentPage - 1) * rowsPerPage;
  const endIdx = startIdx + rowsPerPage;
  const currentRows = filteredData.slice(startIdx, endIdx);

  const getPageNumbers = () => {
    const maxVisible = 5;
    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages = [1];
    const left = Math.max(2, currentPage - 1);
    const right = Math.min(totalPages - 1, currentPage + 1);
    if (left > 2) pages.push("…");
    for (let i = left; i <= right; i++) pages.push(i);
    if (right < totalPages - 1) pages.push("…");
    pages.push(totalPages);
    return pages;
  };5


  return (
    <div className="min-h-screen text-white p-6">

      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

        {/* Title */}
        <div>
          <h1 className="text-xl font-semibold">Delegator Level Bonus</h1>
          <p className="text-sm text-gray-400">
        Earn progressive bonuses from your multi-level network
          </p>
        </div>

   
      </div>

      {/* Top Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-3">

        {/* Overview */}
        <div className="xl:col-span-2 rounded-xl border border-[rgba(14,252,239,0.3)]  p-4">
          <h2 className="font-semibold mb-4">Delegator Level Bonus</h2>
<div className="bg-white/[0.04] h-[2px] rounded-[10px] opacity-100 my-4">
 
</div>
          {/* 4 STAT CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4 mb-2">
            {[
              {
                label: "Total Bonus", value: "$"+dashboardData?.level_profit.toFixed(4), sub: "Total locked across all validators", svg: (
                 <svg className="absolute top-0 inset-y-0 right-0 my-auto h-16 w-auto px-5" width="47" height="45" viewBox="0 0 47 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g opacity="0.75">
                    <path d="M24.549 10.9993C36.5608 10.774 44.2592 3.32397 44.2592 3.32397C44.2592 3.32397 50.1344 6.71359 42.859 12.7285C35.5835 18.7434 23.1077 13.1943 23.1077 13.1943L24.549 10.9993Z" fill="url(#paint0_linear_125_1426)" />
                    <path d="M22.1179 10.6011C10.1089 10.9396 2.06915 3.85901 2.06915 3.85901C2.06915 3.85901 -3.64046 7.52066 3.90928 13.1875C11.459 18.8543 23.6606 12.7256 23.6606 12.7256L22.1179 10.6011Z" fill="url(#paint1_linear_125_1426)" />
                    <path d="M35.5637 1.31933C26.8402 1.93383 28.8482 10.783 28.8482 10.783C28.8482 10.783 22.7555 11.807 21.9095 9.98429C21.0635 8.16107 26.6768 2.87614 29.0526 1.68825C31.4295 0.499808 35.5637 1.31933 35.5637 1.31933Z" fill="url(#paint2_linear_125_1426)" />
                    <path d="M36.8986 0.499821C44.5398 3.42636 42.0015 10.3988 33.904 11.8534C31.6405 12.26 29.3459 13.1927 27.0471 13.2596C25.7054 13.2986 24.105 12.8359 22.5386 11.1519C18.7288 7.05487 29.7178 -2.24994 36.8986 0.499821ZM30.8566 9.83899C36.0937 8.94793 38.0853 0.991535 30.8747 2.17942C28.8469 2.51346 27.3279 3.24602 26.1921 4.13201C22.9739 6.64253 25.5655 10.5417 29.6143 10.0244C30.0112 9.97366 30.4254 9.91236 30.8566 9.83899Z" fill="url(#paint3_linear_125_1426)" />
                    <path d="M11.6392 1.31933C20.3627 1.93383 18.3547 10.783 18.3547 10.783C18.3547 10.783 24.4473 11.807 25.2933 9.98429C26.1393 8.16163 20.526 2.87614 18.1503 1.68825C15.7734 0.499808 11.6392 1.31933 11.6392 1.31933Z" fill="url(#paint4_linear_125_1426)" />
                    <path d="M10.3043 0.499821C2.66308 3.42636 5.20131 10.3988 13.2989 11.8534C15.5624 12.26 17.857 13.1927 20.1557 13.2596C21.4975 13.2986 23.0979 12.8359 24.6642 11.1519C28.474 7.05487 17.4851 -2.24994 10.3043 0.499821ZM16.3462 9.83899C11.1092 8.94793 9.11752 0.991535 16.3282 2.17942C18.3559 2.51346 19.875 3.24602 21.0107 4.13201C24.229 6.64253 21.6373 10.5417 17.5886 10.0244C17.1916 9.97366 16.7774 9.91236 16.3462 9.83899Z" fill="url(#paint5_linear_125_1426)" />
                    <path d="M43.4221 15.1178C42.8943 15.1178 32.6596 15.1178 26.3236 15.1178C26.3236 15.1178 24.2515 15.1178 21.3772 15.1178C15.0413 15.1178 4.80655 15.1178 4.27879 15.1178C3.51109 15.1178 10.163 44.7383 11.2715 44.7383C12.9156 44.7383 17.6514 44.7383 21.3772 44.7383C24.1242 44.7383 26.3236 44.7383 26.3236 44.7383C30.0495 44.7383 34.7847 44.7383 36.4294 44.7383C37.5378 44.7377 44.1898 15.1178 43.4221 15.1178Z" fill="url(#paint6_linear_125_1426)" />
                    <path d="M29.109 11.5209H18.4777H2.32218C1.60517 11.5209 1.08304 12.2002 1.26722 12.8929L2.95977 19.252C3.08707 19.7302 3.51964 20.0625 4.01473 20.0625H18.4777H29.109H43.572C44.0665 20.0625 44.4997 19.7296 44.6264 19.252L46.3189 12.8929C46.5031 12.2002 45.981 11.5209 45.264 11.5209H29.109Z" fill="url(#paint7_linear_125_1426)" />
                    <path d="M23.8466 9.98425C23.6647 9.98425 23.0682 9.98425 22.8863 9.98425C20.5347 9.98425 16.0198 10.1684 16.0198 11.5208C16.0198 12.6938 20.0538 36.8422 21.121 43.21C21.27 44.0992 22.0376 44.7382 22.9392 44.7382H23.7931C24.6947 44.7382 25.4624 44.0992 25.6114 43.21C26.6786 36.8422 30.7126 12.6938 30.7126 11.5208C30.7131 10.1684 26.1982 9.98425 23.8466 9.98425Z" fill="url(#paint8_linear_125_1426)" />
                  </g>
                  <defs>
                    <linearGradient id="paint0_linear_125_1426" x1="34.8039" y1="3.32397" x2="34.8039" y2="15.5281" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#1E1822" />
                      <stop offset="1" stopColor="#3EECB5" />
                    </linearGradient>
                    <linearGradient id="paint1_linear_125_1426" x1="11.8303" y1="3.85901" x2="11.8303" y2="15.5916" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#1E1822" />
                      <stop offset="1" stopColor="#3EECB5" />
                    </linearGradient>
                    <linearGradient id="paint2_linear_125_1426" x1="28.6936" y1="1.04395" x2="28.6936" y2="11.0696" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#1E1822" />
                      <stop offset="1" stopColor="#3EECB5" />
                    </linearGradient>
                    <linearGradient id="paint3_linear_125_1426" x1="31.6201" y1="0" x2="31.6201" y2="13.2618" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#1E1822" />
                      <stop offset="1" stopColor="#3EECB5" />
                    </linearGradient>
                    <linearGradient id="paint4_linear_125_1426" x1="18.5093" y1="1.04395" x2="18.5093" y2="11.0696" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#1E1822" />
                      <stop offset="1" stopColor="#3EECB5" />
                    </linearGradient>
                    <linearGradient id="paint5_linear_125_1426" x1="15.5827" y1="0" x2="15.5827" y2="13.2618" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#1E1822" />
                      <stop offset="1" stopColor="#3EECB5" />
                    </linearGradient>
                    <linearGradient id="paint6_linear_125_1426" x1="23.8504" y1="15.1178" x2="23.8504" y2="44.7383" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#1E1822" />
                      <stop offset="1" stopColor="#3EECB5" />
                    </linearGradient>
                    <linearGradient id="paint7_linear_125_1426" x1="23.7931" y1="11.5209" x2="23.7931" y2="20.0625" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#1E1822" />
                      <stop offset="1" stopColor="#3EECB5" />
                    </linearGradient>
                    <linearGradient id="paint8_linear_125_1426" x1="23.3662" y1="9.98425" x2="23.3662" y2="44.7382" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#1E1822" />
                      <stop offset="1" stopColor="#3EECB5" />
                    </linearGradient>
                  </defs>
                </svg>
                )
              },
              {
                label: "Current Level", value:dashboardData?.total_direct, sub: "Total locked across all validators", svg: (
                <svg  className="absolute top-0 inset-y-0 right-0 my-auto h-16 w-auto px-5"  viewBox="0 0 44 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g opacity="0.75">
                    <path d="M34.3605 19.0752H27.9443V44.9921H34.3605V19.0752Z" fill="url(#paint0_linear_125_1441)" />
                    <path d="M43.0612 12.6167H36.645V44.9896H43.0612V12.6167Z" fill="url(#paint1_linear_125_1441)" />
                    <path d="M25.6599 25.557H19.2437V44.9947H25.6599V25.557Z" fill="url(#paint2_linear_125_1441)" />
                    <path d="M16.9596 32.0389H10.5435V44.9974H16.9596V32.0389Z" fill="url(#paint3_linear_125_1441)" />
                    <path d="M8.25894 38.5208H1.84277V45.0001H8.25894V38.5208Z" fill="url(#paint4_linear_125_1441)" />
                    <path d="M0 36.2305L18.1821 17.2423L18.6969 16.7047L19.2283 17.2805L22.8115 21.163L21.5533 21.1189L37.9086 3.93396L40.04 6.0765L22.7703 22.3423L22.0832 22.9894L21.512 22.2982L18.1462 18.2258L19.1923 18.264L0 36.2305Z" fill="url(#paint5_linear_125_1441)" />
                    <path d="M41.4293 9.51881L44.0057 0L34.4736 2.52689L41.4293 9.51881Z" fill="url(#paint6_linear_125_1441)" />
                  </g>
                  <defs>
                    <linearGradient id="paint0_linear_125_1441" x1="30.5688" y1="-18.0723" x2="39.501" y2="43.7866" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#1E1822" />
                      <stop offset="1" stopColor="#3EECB5" />
                    </linearGradient>
                    <linearGradient id="paint1_linear_125_1441" x1="39.2695" y1="-33.7844" x2="53.0483" y2="42.6096" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#1E1822" />
                      <stop offset="1" stopColor="#3EECB5" />
                    </linearGradient>
                    <linearGradient id="paint2_linear_125_1441" x1="21.8681" y1="-2.30373" x2="26.9378" y2="44.5089" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#1E1822" />
                      <stop offset="1" stopColor="#3EECB5" />
                    </linearGradient>
                    <linearGradient id="paint3_linear_125_1441" x1="13.1679" y1="13.4651" x2="15.4357" y2="44.8758" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#1E1822" />
                      <stop offset="1" stopColor="#3EECB5" />
                    </linearGradient>
                    <linearGradient id="paint4_linear_125_1441" x1="4.46723" y1="29.2338" x2="5.03641" y2="45.0006" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#1E1822" />
                      <stop offset="1" stopColor="#3EECB5" />
                    </linearGradient>
                    <linearGradient id="paint5_linear_125_1441" x1="16.3779" y1="-42.3577" x2="18.6451" y2="36.2702" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#1E1822" />
                      <stop offset="1" stopColor="#3EECB5" />
                    </linearGradient>
                    <linearGradient id="paint6_linear_125_1441" x1="38.3726" y1="-13.6436" x2="39.1995" y2="9.52024" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#1E1822" />
                      <stop offset="1" stopColor="#3EECB5" />
                    </linearGradient>
                  </defs>
                </svg>
                )
              },
             
         
            ].map((item, index) => (
              <Card2
                key={index}
                icon=''
                title={item.label}
                balance={item.value}
                show=''
                footer={item.sub}
                svg={item.svg}
              />
            ))}
          </div>
        </div>

        {/* Referral Link Card */}
        <div className="flex justify-center box-border bg-[rgba(56,223,170,0.1)] p-2 flex flex-col gap-3 rounded-[10px] ">
          <div className="rounded-[10px] overflow-hidden border border-white/10 aspect-[16/10] ">
            <img
              src={referralhubImg}
              alt="Referral"
              className="rounded-[10px] w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      {/* Bottom Table */}
      <div className="flex-1 py-4 flex flex-col overflow-x-hidden">
      
      <div className="rounded-[10px] 
                  border border-[rgba(14,252,239,0.3)]
                bg-[rgba(0,0,0,0.001)]
                shadow-[0px_4px_4px_rgba(0,0,0,0.25)] px-5 py-2 my-5">
        <div className="font-semibold border-b border-gray-500 pb-3">
        Level Reward History
        </div>


    <div className="pt-3">
          <div className="mt-3 flex md:flex-row flex-col md:gap-5 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-sm">From Date</label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="md:w-50 rounded-lg px-3 rounded-[10px] 
                  border border-[rgba(14,252,239,0.3)]
                bg-[rgba(0,0,0,0.001)]
                shadow-[0px_4px_4px_rgba(0,0,0,0.25)]   text-sm py-1.5"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm">To Date</label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="md:w-50 rounded-lg px-3 rounded-[10px] 
                  border border-[rgba(14,252,239,0.3)]
                bg-[rgba(0,0,0,0.001)]
                shadow-[0px_4px_4px_rgba(0,0,0,0.25)] text-sm py-1.5"
              />
            </div>
            <button
              onClick={handleDateFilter}
              className=" text-[#3EECB5]
  bg-[rgba(255,255,255,0.1)]
  rounded-[8px]
    font-medium
  shadow-sm
  transition-all duration-200 ease-in-out
  hover:bg-[rgba(255,255,255,0.18)]
  hover:text-white
  hover:shadow-md
  focus:outline-none

                h-fit md:self-end px-5 py-1.5 rounded-lg cursor-pointer"
            >
              Search
            </button>
          </div>
        </div>

        {/* <div className="pt-3">
          <div className="mt-5 flex sm:flex-row flex-col items-center gap-3 justify-between">
         
            <div className="flex gap-2">
              Search:{" "}
              <input
                value={searchValue}
                onChange={handleSearch}
                placeholder="Type to search"
                className="bg-[rgba(255,255,255,0.1)] px-2 py-1 rounded-lg"
              />
            </div>
          </div>
        </div> */}

        <div className="overflow-x-auto w-full max-w-full mt-4 h-118">
          <table className="table w-full text-xs ">
            <thead className="text-gray-300">
               <tr className="bg-[rgba(255,255,255,0.1)]">
                 <th>#</th>
                <th>Date</th>
                <th>UserId</th>
                <th>Level</th>
                <th>Amount</th>
                <th>%</th>
                <th>Bonus</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center">
                    No Data Found
                  </td>
                </tr>
              ) : (
                currentRows.map((item, index) => (
                  <tr
                    key={index}
                    className={
                      (index + startIdx) % 2 === 0
                       ? "bg-[rgba(0,0,0,0.001)]"
                        : "bg-[rgba(0,0,0,0.001)]"
                    }
                  >
                    <td className="text-nowrap">{index + 1}</td>
                    <td className="text-nowrap">
                      {item.created_at != "-"
                        ? new Date(item.created_at).toLocaleString("en-GB", {
                            hour12: false,
                          })
                        : "-"}
                    </td>

                    <td className="text-nowrap">{item.username}</td>
                    <td className="text-nowrap">{item.level}</td>
                    <td className="text-nowrap">$ {item.net_amount}</td>
                    <td className="text-nowrap">{item.perc}</td>
                    <td className="text-nowrap">$ {item.amount}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-3 flex justify-between items-center">
          <div className="text-gray-400 text-sm hidden sm:block">
            Showing {filteredData.length ? startIdx + 1 : 0} to{" "}
            {Math.min(endIdx, filteredData.length)} of {filteredData.length}{" "}
            entries
          </div>
          <div className="flex gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-2 py-1 cursor-pointer bg-[#26362C] rounded hover:bg-[#1F2C24] disabled:opacity-50"
            >
              Prev
            </button>
            {getPageNumbers().map((p, i) =>
              p === "…" ? (
                <span key={`ellipsis-${i}`} className="px-2 py-1 text-gray-400">
                  …
                </span>
              ) : (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  className={`px-2 py-1 cursor-pointer rounded ${
                    currentPage === p
                    ? "bg-[rgba(255,255,255,0.5)] text-white"
                    : "bg-[rgba(255,255,255,0.1)] text-gray-200 hover:bg-[#1F2C24]"
                  }`}
                >
                  {p}
                </button>
              )
            )}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-2 py-1 cursor-pointer bg-[#26362C] rounded hover:bg-[#1F2C24] disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>

    </div>
  );
}

export default DelegatorLevelBonus;
