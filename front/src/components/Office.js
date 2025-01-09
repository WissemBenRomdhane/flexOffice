import React from "react";

const Office = ({ status, isSelected, equipment, onClick }) => {
  return (
    <div
      className={`relative w-full h-[200px] rounded-lg shadow-lg bg-[#c69c6d] 
        ${isSelected ? "border-4 border-blue-500" : ""}
        ${status === "full" ? "bg-red-500 cursor-not-allowed" : ""}
        ${status !== "booked" ? "hover:bg-green-200 cursor-pointer" : "bg-[#c69c6d]" }`}
      onClick={status !== "full" ? onClick : undefined}
    >
      {/* Overlay for morning */}
      {status === "morning" && (
        <div className="absolute top-0 left-0 w-1/2 h-full bg-red-500"></div>
      )}

      {/* Overlay for afternoon */}
      {status === "afternoon" && (
        <div className="relative float-right w-1/2 h-full bg-red-500"></div>
      )}

      {/* Equipment rendering */}
      {/* Monitor */}
      {equipment.includes("monitor") && (
        <div className="absolute top-[30px] left-[150px] w-[150px] h-[80px] bg-[#333] rounded-md">
          <div className="absolute top-[2px] left-[2px] w-[36px] h-[12px] bg-[#222] rounded-sm"></div>
        </div>
      )}

      {/* Coffee */}
      <div className="absolute top-[10px] left-[10px] w-[10px] h-[10px] bg-[#6f4e37] rounded-full shadow-inner">
        <div className="absolute top-[2px] left-[2px] w-[6px] h-[6px] bg-[#d3a87c] rounded-full"></div>
      </div>

      {/* Paper */}
      <div className="absolute top-[100px] left-[20px] w-[50px] h-[80px] bg-white shadow-md rotate-[-10deg]">
        <div className="absolute top-[4px] left-[4px] w-[20px] h-[1px] bg-[#ccc]"></div>
        <div className="absolute top-[10px] left-[4px] w-[18px] h-[1px] bg-[#ccc]"></div>
      </div>

      {/* Keyboard */}
      {equipment.includes("keyboard") && (
        <div className="absolute bottom-[60px] left-[180px] w-[80px] h-[10px] bg-[#444] rounded-md shadow-inner">
          <div className="absolute top-[2px] left-[2px] w-[76px] h-[6px] bg-[#666] rounded-sm"></div>
        </div>
      )}

      {/* Mouse */}
      {equipment.includes("mouse") && (
        <div className="absolute bottom-[60px] right-[150px] w-[10px] h-[15px] bg-[#333] rounded-[10px] shadow-inner"></div>
      )}
    </div>
  );
};

export default Office;
