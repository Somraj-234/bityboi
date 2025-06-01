import React from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

function Nav() {
  return (
    <div className="nav w-full h-20 sm:h-24 pt-5 bg-[#0D0D0D] border-b border-white/10">
        <div className="flex items-center justify-between gap-4 bg-transparent border-white/10 text-white pb-4 sm:px-16 px-4">
      <div className="logo">
        <Link to="/">
          <div className="cursor-pointer flex items-end text-2xl sm:text-4xl font-bold gap-1 font-quanty">
            BityBoi
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#FF6E20] rounded-full mb-1.5" />
          </div>
        </Link>
      </div>
      <div className="flex items-end gap-4">
        {/* <div className="relative inline-flex items-center justify-center rounded-[28px] px-[1px] py-[1px] bg-transparent overflow-hidden">
          <div className="absolute inset-0 rounded-[28px] bg-gradient-to-r from-[#A3A3A3]/45 to-[#3D3D3D]/20 pointer-events-none z-0"></div>

          <div className="relative z-10 flex items-center gap-2 px-6 py-3 rounded-[26px] bg-[#0E0E10]">
            <span role="img" aria-label="star">
              ⭐
            </span>
            <span className="text-white font-semibold text-lg">
              Star This Project
            </span>
          </div>
        </div> */}
        <Link to="https://x.com/somrajjj" target="_blank">
        <button className="relative flex items-center justify-center w-10 sm:w-14 h-10 sm:h-14 overflow-hidden rounded-lg sm:rounded-xl bg-[#0E0E10]/60 hover:bg-[#121214] transition-all duration-300 cursor-pointer">
        <img src="./x.svg" alt="" className="w-4 h-4 sm:w-7 sm:h-7" />
          <div
            className="absolute inline-flex items-center justify-center rounded-lg sm:rounded-xl p-[1.4px] w-10 sm:w-14 h-10 sm:h-14"
            style={{
              background:
                "linear-gradient(107deg, rgba(163, 163, 163, 0.45), rgba(61, 61, 61, 0.2))",
              mask: `
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0)
    `,
              maskComposite: "xor",
              WebkitMask: `
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0)
    `,
              WebkitMaskComposite: "xor",
            }}
          ></div>
        </button>
        </Link>
        <Link to="https://github.com/Somraj-234/bityboi" target="_blank">
        <button className="relative flex items-center justify-center w-44 sm:w-52 h-10 sm:h-14 overflow-hidden rounded-lg sm:rounded-xl bg-[#0E0E10]/60 hover:bg-[#121214] transition-all duration-300 cursor-pointer">
        <div className="flex items-center gap-3">
            <Star fill="white" className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-white font-bold text-sm sm:text-base">
              Star This Project
            </span>
          </div>
          <div
            className="absolute inline-flex items-center justify-center rounded-lg sm:rounded-xl p-[1.4px] w-44 sm:w-52 h-10 sm:h-14"
            style={{
              background:
                "linear-gradient(107deg, rgba(163, 163, 163, 0.45), rgba(61, 61, 61, 0.2))",
              mask: `
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0)
    `,
              maskComposite: "xor",
              WebkitMask: `
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0)
    `,
              WebkitMaskComposite: "xor",
            }}
          ></div>
        </button>
        </Link>
      </div>
      </div>
      {/* <div className="border-b border-white/10"/> */}
    </div>
  );
}

export default Nav;
