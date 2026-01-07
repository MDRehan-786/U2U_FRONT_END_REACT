import { useState } from "react";
import { RiMoneyDollarBoxFill } from "react-icons/ri";
import { FaCaretUp } from "react-icons/fa";
import axios from "axios";
import useConstStore from "../../store/constStore";
import useUserStore from "../../store/userStore";
import { useNavigate } from "react-router";
// import useDashboardStore from "../../store/dashboardStore";
import depinImg from "../../../public/depin.png";
import chartImg from "../../../public/chart.png";
function DepinSection() {
  const navigate = useNavigate();
  return (
  <div className="box-border flex flex-col gap-3">
      <div className="flex flex-col gap-3 justify-between">
     <div className="grid grid-cols-1 md:grid-rows-2 gap-4">
         
          <div>
           <img src={depinImg} className='h-[200px] w-full rounded-[10px]'  />
          </div>
            <div >
             <img src={chartImg} className='h-[200px] w-full rounded-[10px]'  />
            </div>
        </div>

      </div>
    </div>
  );
}

export default DepinSection;
