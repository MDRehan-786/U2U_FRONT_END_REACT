import { useState } from "react";
import { RiMoneyDollarBoxFill } from "react-icons/ri";
import { FaCaretUp } from "react-icons/fa";
import axios from "axios";
import useConstStore from "../../store/constStore";
import useUserStore from "../../store/userStore";
import { useNavigate } from "react-router";
// import useDashboardStore from "../../store/dashboardStore";

function DetailedCards({ amount, title, children, show, balanceRoi }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);
  const [reinvestmentModel, setReinvestmentModel] = useState(false);
  const [load, setLoad] = useState(false);
  const [loadTow, setLoadTwo] = useState(false);
  const { baseUrl, setMsg, setShowError, setShowSuccess } = useConstStore();
  const { user, token } = useUserStore();
  const [reinvestAmount, setReinvestAmount] = useState("");
  // const { dashboardData } = useDashboardStore();

  const navigate = useNavigate();

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

  const handleSubmit2 = async () => {
    setLoad(true);
    try {
      const response = await axios.post(
        `${baseUrl}re_investment`,
        {
          user_id: user?.id,
          invest_amount: reinvestAmount
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response.data);
      if (response.data.status == 200) {
        showSuccess("Reinvestment Successfull!");
        navigate("/delegateusdtbep20")
      } else {
        showError(response.data.msg);
      }
    } catch (err) {
      console.log(err);
      alert("Transfer Failed!");
    } finally {
      setTimeout(() => {
        setIsModalOpen(false);
        setLoad(false);
      }, 500);
    }
  };

  const handleSubmit = async () => {
    setLoad(true);
    try {
      const response = await axios.post(
        `${baseUrl}storeTransfer`,
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
      // console.log(response.data);
      if (response.data.status == 200) {
        showSuccess("Transfer Successfull!");
      } else {
        showError(response.data.msg);
      }
    } catch (err) {
      console.log(err);
      alert("Transfer Failed!");
    } finally {
      setTimeout(() => {
        setIsModalOpen(false);
        setLoad(false);
      }, 500);
    }
  };

  const handleClaimReward = async () => {
    setLoadTwo(true);
    try {
      const response = await axios.post(
        `${baseUrl}dailyRoiSingleUser`,
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

      if (response.data.status == 200) {
        showSuccess("Claim Successfull!");
        window.location.reload();
      } else {
        showError(response.data.msg);
      }
    } catch (err) {
      console.log(err);
      alert("Claim Failed!");
    } finally {
      setTimeout(() => {
        setIsModal2Open(false);
        setLoadTwo(false);
      }, 500);
    }
  };




return (
  <div className="box-border bg-[rgba(56,223,170,0.1)] px-4 py-6 flex flex-col gap-3">
    <div className="flex flex-col gap-3 justify-between">
      <div className="flex flex-row items-center gap-5">
        <div>
          <div className="text-md">{title}</div>
          <div className="text-xl font-bold">
            <span className="font-semibold text-xl">$</span>{" "}
            {amount ? amount : "0.0000"}
          </div>
        </div>

        <div className="ml-auto">
          <svg
            width="45"
            height="45"
            viewBox="0 0 45 45"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="22.5"
              cy="22.5"
              r="22.25"
              fill="#38DFAA"
              fillOpacity="0.1"
              stroke="#114434"
              strokeWidth="0.5"
            />
            <path
              d="M22.4999 17.8339V33.0005M11.9999 19.0005C11.9999 18.6911 12.1229 18.3944 12.3416 18.1756C12.5604 17.9568 12.8572 17.8339 13.1666 17.8339H31.8333C32.1427 17.8339 32.4394 17.9568 32.6582 18.1756C32.877 18.3944 32.9999 18.6911 32.9999 19.0005V21.3339C32.9999 21.6433 32.877 21.94 32.6582 22.1588C32.4394 22.3776 32.1427 22.5005 31.8333 22.5005H13.1666C12.8572 22.5005 12.5604 22.3776 12.3416 22.1588C12.1229 21.94 11.9999 21.6433 11.9999 21.3339V19.0005Z"
              stroke="#38DFAA"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M30.6666 22.5005V30.6672C30.6666 31.286 30.4208 31.8795 29.9832 32.3171C29.5456 32.7547 28.9522 33.0005 28.3333 33.0005H16.6666C16.0478 33.0005 15.4543 32.7547 15.0167 32.3171C14.5791 31.8795 14.3333 31.286 14.3333 30.6672V22.5005M17.25 17.8338C16.4764 17.8338 15.7346 17.5266 15.1876 16.9796C14.6406 16.4326 14.3333 15.6907 14.3333 14.9172C14.3333 14.1436 14.6406 13.4018 15.1876 12.8548C15.7346 12.3078 16.4764 12.0005 17.25 12.0005C18.3754 11.9809 19.4783 12.527 20.4148 13.5675C21.3513 14.6081 22.078 16.0948 22.5 17.8338C22.922 16.0948 23.6486 14.6081 24.5851 13.5675C25.5216 12.527 26.6245 11.9809 27.75 12.0005C28.5235 12.0005 29.2654 12.3078 29.8124 12.8548C30.3594 13.4018 30.6666 14.1436 30.6666 14.9172C30.6666 15.6907 30.3594 16.4326 29.8124 16.9796C29.2654 17.5266 28.5235 17.8338 27.75 17.8338"
              stroke="#38DFAA"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div className="flex gap-2 items-center font-normal text-[12px] leading-[14px] text-[#9EB4AF] mt-auto">
        {children}
      </div>

      {show && (
        <div className="flex flex-col sm:hidden gap-3 justify-center items-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-3/4 bg-gradient-to-r font-semibold hover:text-black from-[#00D8FA] to-[#00FFA5] px-3 py-1.5 rounded-full transition"
          >
            Transfer ${balanceRoi}
          </button>

          <input
            type="number"
            value={reinvestAmount}
            onChange={(e) => setReinvestAmount(e.target.value)}
            placeholder="Enter amount..."
            className="w-3/4 px-3 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />

          <button
            onClick={() => setReinvestmentModel(true)}
            className="w-3/4 bg-gradient-to-r font-semibold hover:text-black from-[#00D8FA] to-[#00FFA5] px-3 py-1.5 rounded-full transition"
          >
            Reinvest
          </button>
        </div>
      )}
    </div>

    {reinvestmentModel && (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-40">
        <div className="bg-[#0F0F1D] rounded-2xl p-6 w-96 flex flex-col gap-6 border border-[#1A1A2E]">
          <h2 className="text-xl font-bold text-white text-center">
            Confirm Reinvestment
          </h2>

          <p className="text-gray-300 text-center">
            Reinvest <span className="text-[#1FD022] font-semibold">${reinvestAmount}</span>?
          </p>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => setReinvestmentModel(false)}
              className="px-5 py-2 bg-gray-700 text-white rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit2}
              className="px-5 py-2 bg-gradient-to-r from-[#00D8FA] to-[#00FFA5] font-semibold rounded-lg"
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
);

}

export default DetailedCards;
