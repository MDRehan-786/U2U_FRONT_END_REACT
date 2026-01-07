function Card2({ title, balance, icon: Icon, show, footer,svg }) {
  return (
    <div className="relative font-sans rounded-[10px]  box-border bg-[rgba(56,223,170,0.1)] px-4 flex flex-col gap-3 overflow-hidden flex flex-col">
      
      {/* Main content */}
      <div className="flex flex-col p-3 flex-1">
        {/* Title and optional icon */}
        <div className="flex justify-between items-center gap-3">
          <span>{title}</span>
        
        </div>

        {/* Balance */}
        <div className="text-2xl font-semibold leading-[22px] mt-2 py-3">
          {show && "$"}{balance ? balance : "0.0000"}
        </div>

        {/* Footer */}
        <div className="font-normal text-[12px] leading-[14px] text-[#9EB4AF] mt-auto">
          {footer}
        </div>
      </div>
    
 {svg} 
    

    </div>
  );
}

export default Card2;
