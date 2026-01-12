import { TfiReload } from "react-icons/tfi";
import useDashboardStore from "../../store/dashboardStore";

function Transaction() {
  const { dashboardData } = useDashboardStore();

  // console.log("transation")

  return (
    <div className="rounded-[10px] 
                  border border-[rgba(14,252,239,0.3)]
                bg-[rgba(0,0,0,0.001)]
                shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
      <div className="flex gap-3 items-center  
                  p-3 text-lg font-semibold">
        <TfiReload /> Transaction History
      </div>
      <div className="flex gap-3 pb-50 items-center  
                bg-[rgba(0,0,0,0.001)]
                shadow-[0px_4px_4px_rgba(0,0,0,0.25)]  p-3  ">
        <div className="overflow-x-auto w-full   
                 
                bg-[rgba(0,0,0,0.001)]
                shadow-[0px_4px_4px_rgba(0,0,0,0.25)] ">
          <table className="table w-full text-xs">
            <thead className="text-gray-300 ">
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
  );
}

export default Transaction;


