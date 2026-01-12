import FooterTwo from "../../components/common/FooterTwo";
import { GoGraph } from "react-icons/go";
import useUserStore from "../../store/userStore";
import axios from "axios";
import { useEffect, useState } from "react";
import useConstStore from "../../store/constStore";
import { useNavigate } from "react-router";

function Delegate() {
  const { user, isConnected, token } = useUserStore();
  const { baseUrl, setScreenLoading, setMsg, setShowError, setShowSuccess } =
    useConstStore();

  const [balance, setBalance] = useState(null);
  const [checked, setChecked] = useState(false);
  const [userId, setUserId] = useState("");
  const [amount, setAmount] = useState("");
  const [platformFee, setPlatformFee] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [remark, setRemark] = useState("");
  const [password, setPassword] = useState("");
  const [refreshed, setRefreshed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userFound, setUserFound] = useState(false);
  const [name, setName] = useState("");
  const [debouncedUsername, setDebouncedUserame] = useState("");

const [days30, setdays30] = useState(0);
const [days90, setdays90] = useState(0);
const [days180, setdays180] = useState(0);
const [days365, setdays365] = useState(0);

const daysMap = {
  "30 days": days30,
  "90 days": days90,
  "180 days": days180,
  "365 days": days365,
};


    const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const handlePercentage = (percent) => {
    const calculatedAmount = (parseFloat(amount) * parseFloat(percent)) / 100;

    const tenPerc = calculatedAmount / 10;
    const total = parseFloat(calculatedAmount) + parseFloat(tenPerc);
    
    
    setAmount(calculatedAmount.toFixed(2));
    setPlatformFee(tenPerc.toFixed(2));
    setTotalAmount(total.toFixed(2));
  };


  function showError(msg) {
    setMsg(msg);
    setShowError(true);
    setTimeout(() => {
      setMsg("");
      setShowError(false);
    }, 7000);
  }

  function showSuccess(msg) {
    setMsg(msg);
    setShowSuccess(true);
    setTimeout(() => {
      setMsg("");
      setShowSuccess(false);
    }, 7000);
  }

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedUserame(userId);
    }, 500);

    return () => clearTimeout(handler);
  }, [userId]);

  async function fetchUser() {
    const res = await axios.post(`${baseUrl}getuser`, {
      username: debouncedUsername,
    });

    if (res.data.status == 200) {
      setName(res.data.data.first_name);
      setUserFound(true);
      showSuccess("User Found!");
    } else {
      setUserFound(false);
    }
  }

  useEffect(() => {
    if (debouncedUsername) {
      fetchUser();
    }
  }, [debouncedUsername]);

  async function handleSubmit() {
    if (amount == "" || password == "" || remark == "") {
      showError("Feilds can not be empty!");
      return;
    }
    if (!checked && userId == "") {
      showError("UserId Feilds can not be empty!");
      return;
    }
    // console.log({
    //   user_id: user?.id,
    //   username: !checked ? userId : user?.username,
    //   pay_amount: amount,
    //   password,
    //   self: checked,
    //   remark,
    // });
    try {
      setLoading(true);
      const response = await axios.post(
        `${baseUrl}investmentSave`,
        {
          user_id: user?.id,
          username: !checked ? userId : user?.username,
          pay_amount: amount,
          password,
          self: checked,
          remark,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response);
      if (response.data.status == 200) {
        setChecked(false);
        setUserId("");
        setAmount("");
        setPlatformFee("");
        setTotalAmount("");
        setRemark("");
        setPassword("");
        setRefreshed(!refreshed);
        showSuccess("Activation Successfull");
      } else {
        showError(response.data.msg);
      }
    } catch (err) {
      console.log(err);
      showError(err.response.data.msg);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function fetchCountries() {
      try {
        
        const response = await axios.post(
          `${baseUrl}user_wallet`,
          {
            user_id: user?.id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBalance(response.data.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      } finally {
      
      }
    }

    fetchCountries();

    return () => {
      console.log("Component unmounted — canceling request");
    };
  }, [refreshed]);


//for delegator report 

  useEffect(() => {
    // console.log(user?.id);
    setScreenLoading(true);
    const fetchUserData = async () => {
      if (user && isConnected) {
        try {
          const response = await axios.post(
            `${baseUrl}delegatorReport`,
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
            setFilteredData(response.data.data);
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

  useEffect(() => {
    let filtered = [...data];

    if (searchValue.trim() !== "") {
      const search = searchValue.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.transaction_id?.toLowerCase().includes(search) ||
          item.user_username?.toLowerCase().includes(search) ||
          item.activated_by_name?.toLowerCase().includes(search) ||
          item.package_name?.toLowerCase().includes(search)
      );
    }

    setFilteredData(filtered);
    setCurrentPage(1);
  }, [searchValue, data]);

  const handleChangeRows = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
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
  };

//for delegator report 

  return (
    <div className="min-h-screen   text-white p-6">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Staking</h1>
        <p className="text-sm text-gray-400">
          Stake Your Assets And Earn Competitive Returns
        </p>
      </div>

      {/* Main Card */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-2 box-border
        bg-[rgba(0,0,0,0.001)]
        ">

        {/* Left Panel */}
        <div className="p-6 rounded-[10px] border border-[rgba(14,252,239,0.3)]
        bg-[rgba(0,0,0,0.001)]
        shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
          <h2 className="text-lg font-semibold mb-4">Stake</h2>

          <div className="mb-4">

            <input
              id="check"
              type="checkbox"
              checked={checked}
              onChange={() => setChecked((prev) => !prev)}
              className="toggle border-gray-600 bg-gray-500 checked:border-emerald-500 checked:bg-emerald-400 checked:text-emerald-800"
            />
            <label>   Activation for Self</label>
          </div>


          {!checked && (
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Enter Userid</span>

              </div>
              <input
                placeholder="Enter UserId"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                type="text"
                className="w-full   px-4 py-2    rounded-[10px] border border-[rgba(14,252,239,0.3)] bg-[rgba(0,0,0,0.2)] "

              />
              {userFound && <span className="text-green-500 italic">{name}</span>}
            </div>
          )}



          {/* Amount */}
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Staking amount</span>
              <span className="text-cyan-400">
                Available : ${balance?.deposit_balance.toFixed(2)}
              </span>
            </div>
            <input
              type="number"
              placeholder="Ex: 10000"
              value={amount}
              onChange={(e) => {
                const val = e.target.value;
                const tenPerc = val / 10;
                const total = parseFloat(val) + parseFloat(tenPerc);
               setdays30((val*0.36/100)*30);
                setdays90((val*0.36/100)*60);
                setdays180((val*0.36/100)*90);
                setdays365((val*0.36/100)*365);
    
                setAmount(val);
                setPlatformFee(tenPerc ? tenPerc : "");
                setTotalAmount(total ? total : "");
              }}
              className="w-full   px-4 py-2    rounded-[10px] border border-[rgba(14,252,239,0.3)] bg-[rgba(0,0,0,0.2)] "

            />
          </div>

          <div className="grid grid-cols-4 gap-2 mb-6">
            {["25%", "50%", "75%", "100%"].map(p => (
              <button
                key={p}

                className="w-full   px-4 py-2    rounded-[10px] border border-[rgba(14,252,239,0.3)] bg-[rgba(0,0,0,0.2)] "

                onClick={() => handlePercentage(p)}

              >
                {p}
              </button>
            ))}
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Password</span>
            </div>
            <input

              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"

              className="w-full   px-4 py-2    rounded-[10px] border border-[rgba(14,252,239,0.3)] bg-[rgba(0,0,0,0.2)] "

            />
          </div>



          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Remark</span>
            </div>
            <input
              type="text"
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              placeholder="Enter Remark"
              className="w-full   px-4 py-2    rounded-[10px] border border-[rgba(14,252,239,0.3)] bg-[rgba(0,0,0,0.2)] "
         
         />
          </div>

          {/* Percentage Buttons */}


          {/* Validators */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <select
              className="w-full   px-4 py-2    rounded-[10px] border border-[rgba(14,252,239,0.3)] bg-[rgba(0,0,0,0.2)] "

            >
              <option>Asia Validator 1</option>
            </select>
            <select

              className="w-full   px-4 py-2    rounded-[10px] border border-[rgba(14,252,239,0.3)] bg-[rgba(0,0,0,0.2)] "

            >

              <option>Africa Validator 1</option>
            </select>
          </div>


          <div className="text-sm mb-6 space-y-1">
            <p className="text-gray-400">Current estimated APR(%)</p>
            {["30 days", "90 days", "180 days", "365 days"].map(label => (
              <div key={label} className="flex justify-between">
                <span>{label}</span>
                 <span>{daysMap[label].toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="text-sm mb-6 space-y-1">
            <p className="text-gray-400">Charges & Total Amount </p>

            <div className="flex justify-between">
              <span>Charge</span>
              <span> ${platformFee}</span>
            </div>

            <div className="flex justify-between">
              <span>Total Amount</span>
              <span> ${totalAmount} </span>
            </div>

          </div>

          {/* Connect Wallet */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full
                 bg-cyan-400 text-black font-semibold hover:bg-cyan-300 
                  rounded-[8px]
                  px-4 py-3 text-sm 
                  shadow-sm
                  transition-all duration-200 ease-in-out
                  hover:shadow-md
                  focus:outline-none
              ">


            {loading ? "Activating..." : "Stake"}
          </button>
        </div>

        {/* Right Panel */}
        <div className="py-3 rounded-[10px] border border-[rgba(14,252,239,0.3)]
        bg-[rgba(0,0,0,0.001)]
        shadow-[0px_4px_4px_rgba(0,0,0,0.25)] flex flex-col items-center justify-center text-center">

          <div className="w-50 h-50 rounded-full border-4 border-cyan-400/30 flex items-center justify-center mb-6">
            <span className="text-3xl text-cyan-400">${balance?.total_investment.toFixed(2)}</span>
          </div>

          {/* <p className="text-gray-400 mb-4">
            You have no active U2U stakes yet.
          </p> */}

          <button className="px-8 py-3 rounded-full bg-cyan-400 text-black font-semibold hover:bg-cyan-300 transition">
            Stake U2U Now
          </button>
        </div>
      </div>


   <div className="flex-1 p-4 flex flex-col overflow-x-hidden">
    
     
      <div className="rounded-[10px] 
                  border border-[rgba(14,252,239,0.3)]
                bg-[rgba(0,0,0,0.001)]
                shadow-[0px_4px_4px_rgba(0,0,0,0.25)] px-5 py-2 my-5">
        <div className="font-semibold border-b border-gray-500 pb-3">
          Delegator Report
        </div>

        <div className="pt-3">
          <div className="mt-5 flex sm:flex-row flex-col items-center gap-3 justify-between">
            <div>
              Show{" "}
            <select
  value={rowsPerPage}
  onChange={handleChangeRows}
  className="bg-[rgba(255,255,255,0.1)] text-white p-1 rounded-lg border border-white/20 focus:outline-none"
>
  <option className="bg-[#0f172a] text-white" value={10}>10</option>
  <option className="bg-[#0f172a] text-white" value={25}>25</option>
  <option className="bg-[#0f172a] text-white" value={50}>50</option>
  <option className="bg-[#0f172a] text-white" value={100}>100</option>
</select>{" "}
              entries
            </div>
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
        </div>

        <div className="overflow-x-auto w-full max-w-full mt-4 h-118">
          <table className="table w-full text-xs ">
            <thead className="text-[#9E9E9E]">
              <tr className="bg-[rgba(255,255,255,0.1)]">
                <th>#</th>
                <th>Date</th>
                <th>Transaction Id</th>
                <th>UserId</th>
                <th>Activated By</th>
                <th>Type</th>
                <th>Package</th>
                <th>Delegator Amount</th>
                <th>Validator Platform Fee</th>
                <th>Total Amount</th>
                <th>Remark</th>
                <th>Invoice</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.length === 0 ? (
                <tr>
                  <td colSpan={10} className="text-center">
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
                    <td>{index + 1}</td>
                    <td className="flex gap-2 items-center text-nowrap">
                      {item.date != "-"
                        ? new Date(item.date).toLocaleString("en-GB", {
                          hour12: false,
                        })
                        : "-"}
                    </td>
                    <td className="text-nowrap">{item?.transaction_id ?? "-"}</td>
                    <td className="text-nowrap">{item?.user_username ?? "-"}</td>
                    <td className="text-nowrap">{item?.activated_by_name ?? "-"}</td>
                    <td className="text-nowrap">{item?.type ? (item?.type[0].toUpperCase() + item?.type.slice(1,)) : "-"}</td>
                    <td className="text-nowrap">{item?.package_name ?? "-"}</td>
                    <td className="text-nowrap">{item?.delegator_amount ?? "-"}</td>
                    <td className="text-nowrap">{item?.validator_fee ?? "-"}</td>
                    <td className="text-nowrap">{item?.total_amount ?? "-"}</td>
                    <td className="text-nowrap">{item?.remark ?? "-"}</td>
                    <td className="text-nowrap">
                      {item?.type != "reinvest" &&<span
                        onClick={() =>
                          navigate("/invoice", { state: { invoice: item } })
                        }
                        className="text-green-400 cursor-pointer hover:text-green-300 transition ease-in-out duration-300"
                      >
                        Invoice
                      </span>}
                    </td>
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
                  className={`px-2 cursor-pointer py-1 rounded ${currentPage === p
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
              className="px-2 cursor-pointer py-1 bg-[#26362C] rounded hover:bg-[#1F2C24] disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
     
    </div>




    </div>
  )
}

export default Delegate;
