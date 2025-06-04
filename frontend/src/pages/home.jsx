import React from "react";
import Nav from "../components/Nav";
import { GridPattern } from "../components/magicui/grid-pattern";
import { cn } from "@/lib/utils";
import { ChevronRight, Github, Link } from "lucide-react";
import { useNavigate } from "react-router-dom";
import OrangeButton from "../components/OrangeButton";
function home() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center gap-2 w-full h-full">
      <button className="relative flex items-center justify-center w-52  h-12  overflow-hidden rounded-full bg-[#0E0E10] hover:bg-[#121214] transition-all duration-300">
        <div className="flex items-center gap-2">
          <Github className="text-[#83F180] w-4 h-4 " />
          <span className="text-white font-bold text-sm">
            Proudly Open Source
          </span>
        </div>
        <div
          className="absolute inline-flex items-center justify-center rounded-full p-[1.4px] w-52  h-12 "
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

      {/* <div className="flex flex-col items-center justify-center">
            <div className="flex items-start justify-center">
              <p className="sm:flex hidden text-white text-sm sm:text-base font-bold mr-2">Link's</p>
              <h1 className="relative text-white text-5xl sm:text-6xl font-bold capitalize text-center">
                Size🔗Does Matter Because, 
              </h1>
            </div>
            <h1 className="text-white text-5xl sm:text-6xl font-bold capitalize text-center">
           Smaller🤏🏼is better
            </h1>
          </div> */} 

      <h1 className="relative text-white text-6xl sm:text-8xl font-bold capitalize text-center w-full">
        Link's Size <br /> Does Matter
      </h1>

      <p className="text-white text-center text-sm sm:text-lg w-2/3 sm:w-3/4 md:w-2/4 lg:w-2/5 xl:w-1/3 2xl:w-2/7 pt-4 pb-2 first-letter:uppercase">
        our links are shorter than your attention span. track clicks easily as
        they are built to be shared.
      </p>

      <OrangeButton
        text="Let's Make it Short"
        to="/dashboard"
        isIcon={true}
        Icon={Link}
      />
    </div>
  );
}

export default home;
