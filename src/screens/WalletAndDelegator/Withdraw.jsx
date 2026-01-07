import { useState } from "react";
import axios from "axios";
import useConstStore from "../../store/constStore";
import useUserStore from "../../store/userStore";
import useDashboardStore from "../../store/dashboardStore";
// import { useNavigate } from "react-router";

function Withdraw() {
  const { baseUrl, setMsg, setShowError, setShowSuccess } = useConstStore();
  const { user, token } = useUserStore();
  const { dashboardData } = useDashboardStore();

  const options = ["USDT"];

  // const navigate = useNavigate();
  const [option, setOption] = useState("USDT");
  const [amount, setAmount] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [disableSubmit, setDisableSubmit] = useState(false);
  // const [receivedOtp, setReceivedOtp] = useState("");
  const [checked, setChecked] = useState(false);
  const [disableOtp, setDisableOtp] = useState("");

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

  async function handleSubmit() {
    //showError("Withdrawals are temporarily disabled due to maintenance");
   // return
    if (otp == "") {
      showError("Otp Feild Is Empty.");
      return;
    }
    // if (!checked && otp != receivedOtp) {
    //   showError("Otp Did Not Match.");
    //   return;
    // }

    console.log({
      user_id: user?.id,
      amount,
      transaction_password: currentPassword,
      otp, token
    });
    try {
      setDisableSubmit(true);
      const response = await axios.post(
        `${baseUrl}storeWithdrawUsdt`,
        {
          user_id: user?.id,
          amount,
          transaction_password: currentPassword,
          otp,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.status == 200) {
        showSuccess("Withdraw Request Sent.");
        navigate("/withdrawreport");
      } else {
        showError(response.data.msg);
      }
      console.log(response.data);
    } catch (error) {
      console.error(error);
      showError(error.response.data.msg);
    } finally {
      setDisableSubmit(false);
    }
  }

  async function handleOtp() {
    setDisableOtp(true);
    try {
      await axios.post(
        `${baseUrl}sendOtp`,
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
      // console.log(response);
      showSuccess(`Otp sent to your email.`);

      // setReceivedOtp(response.data.data.otp);
    } catch (error) {
      console.error(error);
    } finally {
      setDisableOtp(false);
    }
  }

  return (
    <div className="flex-1 flex justify-center p-4">
      <div className="border border-[rgba(14,252,239,0.3)] mt-5 rounded-lg w-full sm:w-10/12 md:w-9/12 h-fit">
        <div className="text-lg font-semibold border-b py-3 px-5  border-[rgba(14,252,239,0.3)]">
          Withdraw Balance : ${dashboardData?.user_wallet?.balance.toFixed(4)}
        </div>
        <div className="py-5 px-5 flex flex-col gap-3 text-sm">
          <div className="flex flex-col relative">
            <span>Wallet Address</span>
            <input
              value={user?.wallet_address}
              disabled
              placeholder="Wallet Address"
              className="border border-[rgba(14,252,239,0.3)] rounded px-3 py-0.5 pr-10"
            />
          </div>

          <div className="flex flex-col relative">
            <span>Enter Amount</span>
            <input
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
              type="number"
              placeholder="Enter Amount"
              className="border border-[rgba(14,252,239,0.3)] rounded px-3 py-0.5 pr-10"
            />
          </div>

          <div className="flex flex-col">
            <span className="">Payment Mode</span>
            <select
              value={option}
              onChange={(e) => setOption(e.target.value)}
              required
              className="rounded border border-[rgba(14,252,239,0.3)] px-3 py-0.5"
            >
              {options?.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col relative">
            <span>Account Password</span>
            <input
              onChange={(e) => setCurrentPassword(e.target.value)}
              value={currentPassword}
              type="password"
              placeholder="Enter Account Password"
              className="border border-[rgba(14,252,239,0.3)] rounded px-3 py-0.5 pr-10"
            />
          </div>

          {user.status_2fa == "disable" && (
            <div className="flex flex-col">
              <span className="">One Time Password</span>
              <input
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
                type="text"
                className="border border-[rgba(14,252,239,0.3)]  rounded px-3 py-0.5"
              />
              <button
                onClick={handleOtp}
                disabled={disableOtp || disableSubmit}
                className="border border-[rgba(14,252,239,0.3)] disabled:cursor-not-allowed hover:bg-[#56CF82] transition ease-in-out duration-300 cursor-pointer px-3 py-0.5 rounded w-fit mt-3"
              >
                {disableOtp
                  ? "Sending OTP..."
                  : disableSubmit
                    ? "Please Wait..."
                    : "Send Otp"}
              </button>
            </div>
          )}

          {user.status_2fa == "enable" && (
            <div className="flex gap-2 items-center">
              <input
                id="check"
                type="checkbox"
                checked={checked}
                onChange={() => {
                  setChecked((prev) => !prev);
                  setOtp("");
                }}
                className="toggle border-gray-600 bg-gray-500 checked:border-emerald-500 checked:bg-emerald-400 checked:text-emerald-800"
              />
              <label>{!checked ? "OTP" : "Two Factor Authentication"}</label>
            </div>
          )}

          {user?.status_2fa === "enable" &&
            (!checked ? (
              <div className="flex flex-col">
                <span className="">One Time Password</span>
                <input
                  onChange={(e) => setOtp(e.target.value)}
                  value={otp}
                  type="text"
                  className="border border-[rgba(14,252,239,0.3)] rounded px-3 py-0.5"
                />
                <button
                  onClick={handleOtp}
                  disabled={disableOtp || disableSubmit}
                  className="border border-[rgba(14,252,239,0.3)]  disabled:cursor-not-allowed hover:bg-[#56CF82] transition ease-in-out duration-300 cursor-pointer px-3 py-0.5 rounded w-fit mt-3"
                >
                  {disableOtp
                    ? "Sending OTP..."
                    : disableSubmit
                      ? "Please Wait..."
                      : "Send Otp"}
                </button>
              </div>
            ) : (
              <div className="flex flex-col">
                <span className="">Two Factor Authentication Passkey</span>
                <input
                  onChange={(e) => setOtp(e.target.value)}
                  value={otp}
                  type="text"
                  className="border border-[rgba(14,252,239,0.3)] rounded px-3 py-0.5"
                />
              </div>
            ))}

          <div className="flex gap-5 mt-5">
            <button
              onClick={handleSubmit}
              disabled={disableSubmit}
              // disabled
              className=" text-black  
  bg-[#3EECB5]
  rounded-[8px]
  px-4 py-3 text-sm font-medium
  shadow-sm
  transition-all duration-200 ease-in-out
  hover:bg-[rgba(255,255,255,0.18)]
  hover:text-white
  hover:shadow-md
  focus:outline-none w-fit mt-3  disabled:cursor-not-allowed"
            >
              {disableSubmit ? "Withdrawing..." : "Submit"}
            </button>
            <button
              onClick={() => {
                setAmount("");
                setCurrentPassword("");
                setOtp("");
              }}
              className="bg-gray-500 hover:bg-gray-400 transition ease-in-out duration-300 cursor-pointer px-3 py-0.5 rounded w-fit mt-3"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Withdraw;
