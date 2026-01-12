import React, { Suspense, useEffect, useState } from "react";
import useUserStore from "../store/userStore";
import useConstStore from "../store/constStore";
import useDashboardStore from "../store/dashboardStore";
import axios from "axios";
import Loader from "../components/common/Loader";
import referralhubImg from "../../public/referralhub.jpg";
import twitterImg from "../../public/twitter.png";
import telegramImg from "../../public/telegram.png";
import whatsappImg from "../../public/whatsapp.png";
const Card2 = React.lazy(() => import("../components/Dashboard/Card2"));
const Footer = React.lazy(() => import("../components/common/Footer"));


function ReferralHub() {
  const { user, isConnected, token } = useUserStore();
  const { baseUrl, setScreenLoading } = useConstStore();
  const { dashboardData, setDashBoardData } = useDashboardStore();
  const [data, setData] = useState([]); // ✅ MUST be array

  const [msg, setMsg] = useState("");
  const text = `https://u2uglobal.xyz/register/${user?.username}`;

  const shareText = encodeURIComponent(
    "Join me on U2U Global and earn rewards! 🚀"
  );

  const twitterUrl = `https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(
    text
  )}`;


   const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(
    text
  )}&text=${shareText}`;

  const whatsappUrl = `https://wa.me/?text=${shareText}%20${encodeURIComponent(
    text
  )}`;

  useEffect(() => {
    // console.log(user?.id);
    setScreenLoading(true);
    const fetchUserData = async () => {
      if (user && isConnected) {
        try {
          const response = await axios.get(
            `${baseUrl}level_commission`,
            // { user_id: user?.id },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(response.data.data);
          if (response.data.status === 200) {
            setData(response.data.data);
            // setFilteredData(response.data.data);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setScreenLoading(false);
        }
      }
    };
    fetchUserData();
  }, [user, isConnected, token, baseUrl]);



 const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        text
      );
      alert("Copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };




  return (
    <div className="min-h-screen text-white p-6">

      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

        {/* Title */}
        <div>
          <h1 className="text-xl font-semibold">Referral Hub</h1>
          <p className="text-sm text-gray-400">
            Build Your Network And Earn Commissions
          </p>
        </div>

        {/* Referral Link Box */}
        <div    
          className="   px-4 py-2    rounded-[10px] border border-[rgba(14,252,239,0.3)] bg-[rgba(0,0,0,0.2)] flex items-center gap-3    max-w-full xl:max-w-md">
          <span className="text-sm text-gray-300 truncate">
           {text.slice(0, 15) + "......" + text.slice(-6)}

          </span>

          <svg onClick={handleCopy} className='inline-block ms-2' width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.66669 6.44469C4.66669 5.97313 4.85401 5.52089 5.18745 5.18745C5.52089 4.85401 5.97313 4.66669 6.44469 4.66669H12.222C12.4555 4.66669 12.6867 4.71268 12.9024 4.80203C13.1181 4.89138 13.3142 5.02235 13.4793 5.18745C13.6444 5.35255 13.7753 5.54856 13.8647 5.76428C13.954 5.97999 14 6.2112 14 6.44469V12.222C14 12.4555 13.954 12.6867 13.8647 12.9024C13.7753 13.1181 13.6444 13.3142 13.4793 13.4793C13.3142 13.6444 13.1181 13.7753 12.9024 13.8647C12.6867 13.954 12.4555 14 12.222 14H6.44469C6.2112 14 5.97999 13.954 5.76428 13.8647C5.54856 13.7753 5.35255 13.6444 5.18745 13.4793C5.02235 13.3142 4.89138 13.1181 4.80203 12.9024C4.71268 12.6867 4.66669 12.4555 4.66669 12.222V6.44469Z" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M2.67467 11.158C2.47 11.0417 2.29977 10.8733 2.18127 10.6699C2.06277 10.4665 2.00023 10.2354 2 10V3.33333C2 2.6 2.6 2 3.33333 2H10C10.5 2 10.772 2.25667 11 2.66667" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

        </div>
      </div>

      {/* Top Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-3">

        {/* Overview */}
        <div className="xl:col-span-2 rounded-xl border border-[rgba(14,252,239,0.3)]  p-4">
          <h2 className="font-semibold mb-4">Overview</h2>

          {/* 4 STAT CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4 mb-2">
            {[
              {
                label: "Total Downline Volume", value: "$"+user.total_team_business, sub: "Total downline commissions", svg: (
                <svg  className="absolute top-0 inset-y-0 right-0 my-auto h-16 w-auto px-5"   viewBox="0 0 51 63" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path opacity="0.75" d="M14.3082 56.4696L32.8398 5.16862L36.1262 6.35579L17.5947 57.6568L14.3082 56.4696ZM36.3898 25.0049C36.8349 23.1872 36.539 21.5398 35.5019 20.0627C34.4781 18.5904 32.8641 17.4561 30.6597 16.6598C29.11 16.1 27.6963 15.8536 26.4185 15.9206C25.1408 15.9877 24.0632 16.3158 23.1858 16.905C22.3084 17.4943 21.6773 18.3008 21.2923 19.3247C20.9835 20.1797 20.9093 20.9911 21.0699 21.759C21.2439 22.5317 21.5919 23.2615 22.114 23.9485C22.6409 24.6221 23.2655 25.2555 23.9876 25.8486C24.7097 26.4417 25.4554 26.9905 26.2247 27.4949L29.7248 29.8467C31.1442 30.7672 32.4577 31.7929 33.6651 32.9238C34.886 34.0596 35.8953 35.3001 36.693 36.6455C37.5042 37.9957 38.0048 39.4528 38.195 41.0167C38.3853 42.5806 38.1594 44.2509 37.5176 46.0278C36.6489 48.4325 35.2695 50.328 33.3792 51.7143C31.4938 53.0872 29.203 53.8682 26.5069 54.0572C23.8289 54.2376 20.8467 53.7342 17.5602 52.5471C14.3672 51.3937 11.7737 49.898 9.7795 48.06C7.79868 46.2269 6.48961 44.1229 5.85229 41.748C5.22832 39.378 5.35515 36.811 6.23276 34.0471L13.5472 36.6893C13.1377 38.1574 13.149 39.5056 13.5812 40.734C14.0135 41.9625 14.7663 43.0349 15.8399 43.9513C16.9268 44.8725 18.2451 45.613 19.7948 46.1728C21.4113 46.7568 22.9143 47.0279 24.3038 46.9861C25.7114 46.9357 26.9194 46.6019 27.9278 45.9844C28.941 45.3537 29.6666 44.4528 30.1047 43.282C30.4774 42.2084 30.482 41.2133 30.1184 40.2966C29.7596 39.3665 29.1102 38.4674 28.1703 37.5993C27.2485 36.7226 26.1204 35.8318 24.786 34.9269L20.5511 32.0379C17.4848 29.9486 15.2883 27.6675 13.9614 25.1946C12.6528 22.7132 12.5293 20.0029 13.591 17.0638C14.4645 14.6457 15.884 12.7647 17.8496 11.4207C19.8285 10.0815 22.1345 9.32119 24.7676 9.13962C27.4055 8.94469 30.1606 9.36602 33.0329 10.4036C35.9453 11.4556 38.3136 12.8851 40.1378 14.6918C41.9802 16.4901 43.206 18.5111 43.8151 20.7549C44.4291 22.9854 44.3387 25.2635 43.5439 27.5892L36.3898 25.0049Z" fill="url(#paint0_linear_125_1424)" />
                  <defs>
                    <linearGradient id="paint0_linear_125_1424" x1="47.8262" y1="-30.2561" x2="17.735" y2="49.4796" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#1E1822" />
                      <stop offset="1" stop-color="#3EECB5" />
                    </linearGradient>
                  </defs>
                </svg>
                )
              },
              {
                label: "Total Team Size", value:user.team_size, sub: "Team Size", svg: (
                <svg className="absolute top-0 inset-y-0 right-0 my-auto h-16 w-auto px-5"  viewBox="0 0 72 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g opacity="0.75">
                    <path d="M30.2796 20.7668C31.3783 25.3584 32.4668 29.9073 33.5553 34.4562C33.6 34.4518 33.6447 34.4472 33.6895 34.4428C33.8348 33.4848 33.9734 32.5258 34.1271 31.5692C34.4045 29.8431 34.6804 28.1167 34.9825 26.3949C35.0402 26.0665 35.0023 25.8324 34.7706 25.5847C34.4541 25.2464 34.183 24.8657 33.8695 24.4746C34.6019 23.6897 35.3217 22.9182 36.0805 22.1049C36.826 22.933 37.5248 23.7093 38.2498 24.5146C37.9531 24.8499 37.7121 25.1655 37.4261 25.4329C37.1487 25.6924 37.0944 25.9784 37.1495 26.3319C37.5549 28.9308 37.9522 31.531 38.3546 34.1304C38.3693 34.225 38.4113 34.3154 38.486 34.5514C39.6212 29.8814 40.7225 25.3509 41.8467 20.7263C42.7161 21.0457 43.5526 21.3065 44.3512 21.6542C47.7856 23.1498 50.5325 25.4321 52.3279 28.7667C53.5365 31.0115 54.0649 33.4368 54.1432 35.9659C54.1757 37.0148 54.1252 38.0661 54.1416 39.1159C54.1468 39.4443 54.0061 39.5819 53.7294 39.6982C50.7515 40.9494 47.6625 41.8074 44.4735 42.2998C40.8567 42.8584 37.2199 43.0954 33.5601 42.911C28.35 42.6484 23.2816 41.7095 18.4156 39.7791C18.0164 39.6208 17.8726 39.4194 17.8711 38.9792C17.8644 37.1146 17.7502 35.2539 18.1093 33.3985C18.9129 29.2476 20.9731 25.9149 24.4308 23.4598C26.0631 22.3008 27.85 21.4656 29.7646 20.8952C29.9202 20.8488 30.0799 20.8162 30.2796 20.7668Z" fill="url(#paint0_linear_125_788)" />
                    <path d="M35.973 4.18412e-06C41.2831 -0.0048374 45.454 4.19268 45.44 9.55316C45.4252 15.189 40.8815 18.8343 36.1924 18.8877C30.8394 18.9487 26.6313 14.8221 26.6367 9.62358C26.6423 4.21825 30.73 0.00479877 35.973 4.18412e-06Z" fill="url(#paint1_linear_125_788)" />
                    <path d="M16.0396 36.9376C13.5423 37.0299 11.1361 36.8742 8.74552 36.4886C5.92738 36.0341 3.18206 35.314 0.527179 34.2491C0.105819 34.0801 -0.0202035 33.8812 0.00254725 33.4521C0.0808118 31.9736 -0.056304 30.4587 0.217504 29.0203C1.08044 24.4876 3.76874 21.3754 8.01881 19.6064C8.65964 19.3397 9.32105 19.1223 10.0403 18.8573C10.9271 22.6413 11.7972 26.3548 12.6674 30.0683C12.7198 30.0671 12.7721 30.0659 12.8244 30.0647C12.9573 29.3159 13.0877 28.5666 13.2237 27.8183C13.4704 26.4598 13.7065 25.099 13.9775 23.7453C14.0628 23.3191 14.0196 22.9935 13.7162 22.6523C13.0869 21.9445 13.1069 21.8626 13.7561 21.1266C14.1037 20.7325 14.4586 20.3447 14.8491 19.9109C15.4185 20.5472 15.9401 21.1049 16.4231 21.6942C16.5047 21.7937 16.4899 22.1195 16.4014 22.1879C15.6229 22.7892 15.7128 23.5496 15.8745 24.3854C16.2308 26.2277 16.5294 28.081 16.8516 29.9299C16.902 29.9379 16.9524 29.9459 17.0029 29.9538C17.8958 26.2804 18.7888 22.6071 19.7011 18.8542C21.4623 19.3992 23.0679 20.0834 24.6773 21.0676C18.6569 24.6636 16.0503 30.0825 16.0396 36.9376Z" fill="url(#paint2_linear_125_788)" />
                    <path d="M55.9134 37.1044C55.8589 36.0477 55.8757 35.1608 55.7528 34.2936C55.5945 33.1774 55.4544 32.0288 55.0667 30.983C54.6552 29.8727 54.6657 28.8343 54.8929 27.7201C55.182 26.3023 55.4147 24.8719 55.6233 23.4399C55.6568 23.2102 55.4814 22.9124 55.3279 22.7C54.7239 21.864 54.7109 21.8703 55.3893 21.1216C55.7443 20.7299 56.1074 20.3456 56.4914 19.9315C57.0144 20.5203 57.5053 21.0832 58.0086 21.6348C58.2184 21.8648 58.2365 22.0876 57.9956 22.2756C57.3635 22.7688 57.2849 23.379 57.4314 24.1363C57.8072 26.0791 58.1162 28.0347 58.5627 30.0074C59.0215 28.1745 59.4825 26.3422 59.9384 24.5086C60.3992 22.6547 60.8549 20.7995 61.323 18.9041C62.8917 19.331 64.2962 19.9648 65.6014 20.796C69.4127 23.2232 71.2105 26.7661 71.2975 31.2322C71.3127 32.0152 71.2934 32.7991 71.3231 33.5814C71.3356 33.9091 71.1984 34.0521 70.918 34.1687C68.2305 35.2863 65.4557 36.1162 62.5704 36.4888C60.3785 36.7719 58.1669 36.9018 55.9134 37.1044Z" fill="url(#paint3_linear_125_788)" />
                    <path d="M14.7719 2.15975C19.16 2.20845 22.3878 5.5522 22.3439 10.0037C22.3042 14.0241 18.8359 17.3656 14.7528 17.3172C10.486 17.2666 7.2718 13.9984 7.31687 9.75616C7.36205 5.50063 10.6853 2.11439 14.7719 2.15975Z" fill="url(#paint4_linear_125_788)" />
                    <path d="M56.475 17.3206C52.19 17.2541 48.9092 13.9081 48.9837 9.68049C49.0582 5.45063 52.5016 2.05235 56.6332 2.13123C60.8528 2.2118 64.0827 5.66112 64.0226 10.0225C63.9672 14.0399 60.5096 17.3832 56.475 17.3206Z" fill="url(#paint5_linear_125_788)" />
                    <path d="M53.6514 27.3746C51.9621 24.6187 49.7594 22.4612 46.8633 20.9472C48.3505 19.9836 49.9321 19.3924 51.65 18.7808C52.3237 21.6738 52.9876 24.5242 53.6514 27.3746Z" fill="url(#paint6_linear_125_788)" />
                  </g>
                  <defs>
                    <linearGradient id="paint0_linear_125_788" x1="36.0015" y1="20.7263" x2="35.3897" y2="49.1986" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#3EECB5" />
                      <stop offset="1" stop-color="#1E1822" />
                    </linearGradient>
                    <linearGradient id="paint1_linear_125_788" x1="36.0384" y1="-4.50294e-08" x2="35.1875" y2="24.1558" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#3EECB5" />
                      <stop offset="1" stop-color="#1E1822" />
                    </linearGradient>
                    <linearGradient id="paint2_linear_125_788" x1="12.3386" y1="18.8542" x2="11.7423" y2="42.0269" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#3EECB5" />
                      <stop offset="1" stop-color="#1E1822" />
                    </linearGradient>
                    <linearGradient id="paint3_linear_125_788" x1="63.0301" y1="18.9041" x2="62.1348" y2="42.1744" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#3EECB5" />
                      <stop offset="1" stop-color="#1E1822" />
                    </linearGradient>
                    <linearGradient id="paint4_linear_125_788" x1="14.8304" y1="2.1593" x2="14.1447" y2="21.5448" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#3EECB5" />
                      <stop offset="1" stop-color="#1E1822" />
                    </linearGradient>
                    <linearGradient id="paint5_linear_125_788" x1="56.5029" y1="2.12988" x2="55.8149" y2="21.5577" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#3EECB5" />
                      <stop offset="1" stop-color="#1E1822" />
                    </linearGradient>
                    <linearGradient id="paint6_linear_125_788" x1="50.2574" y1="18.7808" x2="49.7698" y2="29.7632" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#3EECB5" />
                      <stop offset="1" stop-color="#1E1822" />
                    </linearGradient>
                  </defs>
                </svg>
                )
              },
              {
                label: "Total Commission Earned", value: "$"+dashboardData?._4x_income.toFixed(4) , sub: "Total lifetime earnings", svg: (
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
                      <stop stop-color="#1E1822" />
                      <stop offset="1" stop-color="#3EECB5" />
                    </linearGradient>
                    <linearGradient id="paint1_linear_125_1426" x1="11.8303" y1="3.85901" x2="11.8303" y2="15.5916" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#1E1822" />
                      <stop offset="1" stop-color="#3EECB5" />
                    </linearGradient>
                    <linearGradient id="paint2_linear_125_1426" x1="28.6936" y1="1.04395" x2="28.6936" y2="11.0696" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#1E1822" />
                      <stop offset="1" stop-color="#3EECB5" />
                    </linearGradient>
                    <linearGradient id="paint3_linear_125_1426" x1="31.6201" y1="0" x2="31.6201" y2="13.2618" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#1E1822" />
                      <stop offset="1" stop-color="#3EECB5" />
                    </linearGradient>
                    <linearGradient id="paint4_linear_125_1426" x1="18.5093" y1="1.04395" x2="18.5093" y2="11.0696" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#1E1822" />
                      <stop offset="1" stop-color="#3EECB5" />
                    </linearGradient>
                    <linearGradient id="paint5_linear_125_1426" x1="15.5827" y1="0" x2="15.5827" y2="13.2618" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#1E1822" />
                      <stop offset="1" stop-color="#3EECB5" />
                    </linearGradient>
                    <linearGradient id="paint6_linear_125_1426" x1="23.8504" y1="15.1178" x2="23.8504" y2="44.7383" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#1E1822" />
                      <stop offset="1" stop-color="#3EECB5" />
                    </linearGradient>
                    <linearGradient id="paint7_linear_125_1426" x1="23.7931" y1="11.5209" x2="23.7931" y2="20.0625" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#1E1822" />
                      <stop offset="1" stop-color="#3EECB5" />
                    </linearGradient>
                    <linearGradient id="paint8_linear_125_1426" x1="23.3662" y1="9.98425" x2="23.3662" y2="44.7382" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#1E1822" />
                      <stop offset="1" stop-color="#3EECB5" />
                    </linearGradient>
                  </defs>
                </svg>
                )
              },
              {
                label: "Direct Referral Bonus", value: "$"+dashboardData?.direct_income.toFixed(4), sub: "Total bonus from referrals", svg: (
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
                      <stop stop-color="#1E1822" />
                      <stop offset="1" stop-color="#3EECB5" />
                    </linearGradient>
                    <linearGradient id="paint1_linear_125_1441" x1="39.2695" y1="-33.7844" x2="53.0483" y2="42.6096" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#1E1822" />
                      <stop offset="1" stop-color="#3EECB5" />
                    </linearGradient>
                    <linearGradient id="paint2_linear_125_1441" x1="21.8681" y1="-2.30373" x2="26.9378" y2="44.5089" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#1E1822" />
                      <stop offset="1" stop-color="#3EECB5" />
                    </linearGradient>
                    <linearGradient id="paint3_linear_125_1441" x1="13.1679" y1="13.4651" x2="15.4357" y2="44.8758" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#1E1822" />
                      <stop offset="1" stop-color="#3EECB5" />
                    </linearGradient>
                    <linearGradient id="paint4_linear_125_1441" x1="4.46723" y1="29.2338" x2="5.03641" y2="45.0006" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#1E1822" />
                      <stop offset="1" stop-color="#3EECB5" />
                    </linearGradient>
                    <linearGradient id="paint5_linear_125_1441" x1="16.3779" y1="-42.3577" x2="18.6451" y2="36.2702" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#1E1822" />
                      <stop offset="1" stop-color="#3EECB5" />
                    </linearGradient>
                    <linearGradient id="paint6_linear_125_1441" x1="38.3726" y1="-13.6436" x2="39.1995" y2="9.52024" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#1E1822" />
                      <stop offset="1" stop-color="#3EECB5" />
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


          {/* LEVEL PROGRESS */}
          <div className="w-full">
            <p className="text-sm text-white-600 mb-3">Your Level Progress</p>

            <div className="flex items-end justify-between w-full h-36 md:h-30">

              {/* Levels 1–10 */}
              {[...Array(10)].map((_, i) => {
                const barHeight = 10 + i * 8; // px (visible + scalable)

                return (
                  <div key={i} className="flex flex-col items-center flex-1">
                    <span className="mt-1 text-[8px] sm:text-[10px] md:text-[12px] text-white font-bold">
                      {i+1}
                    </span>
                    <div
                      className={`w-5 md:w-8  border border-[#72AF9C] rounded-md bg-white/10`}
                      style={{ height: `${barHeight}px` }}
                    />
                    <span className="mt-1 text-[8px] text-gray-400">
                      Level {i + 1}
                    </span>
                  </div>
                );
              })}

              {/* Level 11–15 */}
              <div className="flex flex-col items-center flex-1">
                <span className="mt-1 text-[8px] sm:text-[10px] md:text-[12px] text-white font-bold">
                  11-15
                </span>
                <div className="border border-[#72AF9C] w-5 md:w-8 h-24 rounded-md bg-white/10" />
                <span className="mt-1 text-[8px] text-gray-400">Level 11–15</span>
              </div>

              {/* Level 16–20 */}
              <div className="flex flex-col items-center flex-1">
                <span className="mt-1 text-[8px] sm:text-[10px] md:text-[12px] text-white font-bold">
                  16–20
                </span>
                <div className="border border-[#72AF9C] w-5 md:w-8 h-28 rounded-md bg-white/10" />
                <span className="mt-1 text-[8px] text-gray-400">Level 16–20</span>
              </div>
            </div>
          </div>


        </div>

        {/* Referral Link Card */}
        <div className="rounded-xl border border-[rgba(14,252,239,0.3)] p-6">
          <h2 className="font-semibold mb-3">Your Unique Referral Link</h2>

          <div className="flex items-center gap-3    px-4 py-4    rounded-[10px] border border-[rgba(14,252,239,0.3)] bg-[rgba(0,0,0,0.2)]  text-sm my-10">
            <span className="truncate">
               {text}

            </span>
          <svg onClick={handleCopy} className='inline-block ms-2' width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.66669 6.44469C4.66669 5.97313 4.85401 5.52089 5.18745 5.18745C5.52089 4.85401 5.97313 4.66669 6.44469 4.66669H12.222C12.4555 4.66669 12.6867 4.71268 12.9024 4.80203C13.1181 4.89138 13.3142 5.02235 13.4793 5.18745C13.6444 5.35255 13.7753 5.54856 13.8647 5.76428C13.954 5.97999 14 6.2112 14 6.44469V12.222C14 12.4555 13.954 12.6867 13.8647 12.9024C13.7753 13.1181 13.6444 13.3142 13.4793 13.4793C13.3142 13.6444 13.1181 13.7753 12.9024 13.8647C12.6867 13.954 12.4555 14 12.222 14H6.44469C6.2112 14 5.97999 13.954 5.76428 13.8647C5.54856 13.7753 5.35255 13.6444 5.18745 13.4793C5.02235 13.3142 4.89138 13.1181 4.80203 12.9024C4.71268 12.6867 4.66669 12.4555 4.66669 12.222V6.44469Z" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M2.67467 11.158C2.47 11.0417 2.29977 10.8733 2.18127 10.6699C2.06277 10.4665 2.00023 10.2354 2 10V3.33333C2 2.6 2.6 2 3.33333 2H10C10.5 2 10.772 2.25667 11 2.66667" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

          
          </div>

          <div className="flex gap-3 my-10">

           <a   target="_blank" href={twitterUrl} className="flex flex-1 items-center justify-center gap-2 text-xs py-2">
  <img
    src={twitterImg}
    alt="Twitter"
    className="w-7 h-7 rounded-full object-contain"
  />
  <span>Share on Twitter</span>
</a>

  <a  target="_blank" href={telegramUrl} className="flex flex-1 items-center justify-center gap-2 text-xs py-2">
  <img
    src={telegramImg}
    alt="Telegram"
    className="w-7 h-7 rounded-full object-contain"
  />
  <span>Share on Telegram</span>
</a>

  <a  target="_blank" href={whatsappUrl}className="flex flex-1 items-center justify-center gap-2 text-xs py-2">
  <img
    src={whatsappImg}
    alt="Discord"
    className="w-7 h-7 rounded-full object-contain"
  />
  <span>Share on Whatsapp</span>
</a>

          </div>

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
      <div className="mt-6 rounded-xl  border border-[rgba(14,252,239,0.3)] p-6">
        <div className="flex gap-3 mb-4">
          {[
            "Level Commission Structure",
            // "My Downline",
            // "Commission History",
            // "Referral Tree",
          ].map((tab, i) => (
            <button
              key={i}
              className={`px-4 py-2 rounded-full text-sm ${i === 0
                ? "bg-cyan-400 text-black"
                : "bg-white/10 text-gray-300"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <table className="w-full text-sm">
          <thead className="text-gray-400 border-b border-white/10">
            <tr>
              <th className="py-3 text-center">Level</th>
              <th className="py-3 text-center">Commission(%)</th>
              <th className="py-3 text-center">Direct Referrals(ID)</th>
           
            </tr>
          </thead>
       
           <tbody>
  {Array.isArray(data) && data.length > 0 ? (
    data.map((item, i) => (
      <tr key={i} className="border-b border-white/5">
        <td className="py-3 text-center">Level {item.id}</td>
        <td className="py-3 text-center">{item.commission}</td>
        <td className="py-3 text-center">{item.direct_referrals}</td>
        
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="4" className="py-4 text-center text-gray-400">
        No data found
      </td>
    </tr>
  )}
</tbody>

       
        </table>
      </div>
    </div>
  );
}

export default ReferralHub;
