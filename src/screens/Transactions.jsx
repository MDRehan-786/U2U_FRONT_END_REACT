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
 const [data, setData] = useState([]);


  useEffect(() => {
    // console.log(user?.id);
    setScreenLoading(true);
    const fetchUserData = async () => {
      if (user && isConnected) {
        try {
          const response = await axios.post(
            `${baseUrl}transactions`,
          { user_id: user?.id },
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
                shadow-[0px_4px_4px_rgba(0,0,0,0.25)]  p-3">
        <div className="overflow-x-auto w-full   
                 
                bg-[rgba(0,0,0,0.001)]
                shadow-[0px_4px_4px_rgba(0,0,0,0.25)] ">
          <table className="table w-full text-xs">
            <thead className="text-gray-300 ">
              <tr className="bg-[rgba(255,255,255,0.1)]">
                <th>S.no</th>
                <th className=' '>Transaction Id</th>
                <th>Amount</th>
                <th>Mode</th>
                <th>Description</th>
                  <th>Date&Time</th>
              </tr>
            </thead>
            <tbody>
              {data?.transaction?.length == 0 ? (
                <tr>
                  <td className="text-center" colSpan={4}>
                    Data Not Found
                  </td>
                </tr>
              ) : (
                data?.map((item, index) => (
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{item.trans_id}</td>
                    <td>$ {item.amount}</td>
                    <td>
                      {item.transaction_type
                        ? item.transaction_type[0].toUpperCase() +
                          item.transaction_type.slice(1)
                        : "Credit"}
                    </td>
                    <td>{item.description}</td>
                      <td>
                       
                        <br/>
                       { new Date(item.created_at).toLocaleString("en-GB", {
                          hour12: false,
                        }) }




                         
                      </td>
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
