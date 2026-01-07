import React, { Suspense, useEffect, useState } from "react";
import useUserStore from "../store/userStore";
import useConstStore from "../store/constStore";
import useDashboardStore from "../store/dashboardStore";
import axios from "axios";
import Loader from "../components/common/Loader";
import { TfiWallet } from "react-icons/tfi";
const Footer = React.lazy(() => import("../components/common/Footer"));


function Transactions() {
  const { user, isConnected, token } = useUserStore();
  const { baseUrl, setScreenLoading } = useConstStore();
  const { dashboardData, setDashBoardData } = useDashboardStore();

  return (
    <div className="min-h-screen text-white p-6">

      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

        {/* Title */}
        <div>
          <h1 className="text-xl font-semibold">My Transaction History</h1>
          <p className="text-sm text-gray-400">
          Complete record of all your platform activities
          </p>
        </div>

      
      </div>

     
 <div className="rounded-[10px] 
                  border border-[rgba(14,252,239,0.3)]
                bg-[rgba(0,0,0,0.001)]
                shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
      <div className="flex gap-3 items-center  
                  p-3 text-lg font-semibold">
  
<TfiWallet /> Transaction History
      </div>
      <div className="flex gap-3 pb-50 items-center  
                bg-[rgba(0,0,0,0.001)]
                shadow-[0px_4px_4px_rgba(0,0,0,0.25)]  p-3 text-lg font-semibold">
        <div className="overflow-x-auto w-full   
                 
                bg-[rgba(0,0,0,0.001)]
                shadow-[0px_4px_4px_rgba(0,0,0,0.25)] ">
          <table className="table w-full">
            <thead className="text-white ">
              <tr className="bg-[rgba(255,255,255,0.1)]">
                <th className=' '>Transaction Id</th>
                <th>Amount</th>
                <th>Mode</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData?.transaction?.length == 0 ? (
                <tr>
                  <td className="text-center" colSpan={4}>
                    Data Not Found
                  </td>
                </tr>
              ) : (
                dashboardData?.transaction?.map((item, index) => (
                  <tr key={index}>
                    <td>{item.trans_id}</td>
                    <td>$ {item.amount}</td>
                    <td>
                      {item.transaction_type
                        ? item.transaction_type[0].toUpperCase() +
                          item.transaction_type.slice(1)
                        : "Credit"}
                    </td>
                    <td>{item.description}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  
    </div>
  );
}

export default Transactions;
