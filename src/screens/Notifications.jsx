import React, { Suspense, useEffect, useState } from "react";
import useUserStore from "../store/userStore";
import useConstStore from "../store/constStore";
import useDashboardStore from "../store/dashboardStore";
import axios from "axios";
import Loader from "../components/common/Loader";
import { TfiWallet } from "react-icons/tfi";
const Footer = React.lazy(() => import("../components/common/Footer"));


function Notifications() {
  const { user, isConnected, token } = useUserStore();
  const { baseUrl, setScreenLoading } = useConstStore();
  const notifications = Array.from({ length: 9 }, (_, i) => ({
    id: i,
    title: i === 0 ? "268 × 20" : "Asia Validator",
    message:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s.",
    time: "24 Jun 2025 12:35 PM",
  }));


  return (
    <div className="min-h-screen text-white p-6">

      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

        {/* Title */}
        <div>
          <h1 className="text-xl font-semibold">Notifications</h1>
          <p className="text-sm text-gray-400">
            Complete record of all your platform activities
          </p>
        </div>


      </div>


    <div className="w-full rounded-xl border border-cyan-400/60 p-3 bg-[#0a2a2f]">
      <div className="flex flex-col gap-2">
        {notifications.map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-3 p-3 rounded-lg
                       bg-white/10 border border-white/10"
          >
            {/* Icon */}
            <div className="mt-1 shrink-0">
              <div className="w-8 h-8 rounded-md   flex items-center justify-center">
                <svg width="28" height="34" viewBox="0 0 28 34" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.7" fill-rule="evenodd" clip-rule="evenodd" d="M13.875 2.74152e-08C13.4331 -5.89027e-05 12.9963 0.0948875 12.5942 0.278405C12.1922 0.461922 11.8343 0.729721 11.5448 1.06365C11.2553 1.39759 11.041 1.78985 10.9164 2.21385C10.7026 2.94136 10.2773 3.66957 9.58165 3.97124C7.86355 4.71626 6.36141 5.89906 5.23117 7.41114C3.83621 9.27739 3.08271 11.545 3.08333 13.875V24.6667C3.08333 25.5181 2.39311 26.2083 1.54167 26.2083C1.13279 26.2083 0.740662 26.3708 0.451544 26.6599C0.162425 26.949 0 27.3411 0 27.75C0 28.1589 0.162425 28.551 0.451544 28.8401C0.740662 29.1292 1.13279 29.2917 1.54167 29.2917H26.2083C26.6172 29.2917 27.0093 29.1292 27.2985 28.8401C27.5876 28.551 27.75 28.1589 27.75 27.75C27.75 27.3411 27.5876 26.949 27.2985 26.6599C27.0093 26.3708 26.6172 26.2083 26.2083 26.2083C25.3569 26.2083 24.6667 25.5181 24.6667 24.6667V13.875C24.6673 11.545 23.9138 9.27739 22.5188 7.41114C21.2117 5.66235 19.407 4.35401 17.3462 3.65396C17.1074 3.57283 16.9583 3.33558 16.9583 3.08333C16.9583 2.26558 16.6335 1.48132 16.0552 0.903087C15.477 0.32485 14.6928 2.74152e-08 13.875 2.74152e-08ZM16.9583 32.375C16.9583 32.7839 16.7959 33.176 16.5068 33.4651C16.2177 33.7542 15.8255 33.9167 15.4167 33.9167H12.3333C11.9245 33.9167 11.5323 33.7542 11.2432 33.4651C10.9541 33.176 10.7917 32.7839 10.7917 32.375C10.7917 31.9661 10.9541 31.574 11.2432 31.2849C11.5323 30.9958 11.9245 30.8333 12.3333 30.8333H15.4167C15.8255 30.8333 16.2177 30.9958 16.5068 31.2849C16.7959 31.574 16.9583 31.9661 16.9583 32.375Z" fill="url(#paint0_linear_160_2833)"/>
<defs>
<linearGradient id="paint0_linear_160_2833" x1="14.375" y1="-31.5416" x2="13.875" y2="33.9167" gradientUnits="userSpaceOnUse">
<stop stop-color="#1E1822"/>
<stop offset="1" stop-color="#3EECB5"/>
</linearGradient>
</defs>
</svg>

              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              <p className="text-sm font-semibold text-emerald-400">
                {item.title}
              </p>
              <p className="text-xs text-white/70 leading-relaxed">
                {item.message}
              </p>
            </div>

            {/* Time */}
            <div className="text-xs text-white/50 whitespace-nowrap">
              {item.time}
            </div>
          </div>
        ))}
      </div>
    </div>

    </div>
  );
}

export default Notifications;
