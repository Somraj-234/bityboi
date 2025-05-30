import React from "react";
import Nav from "../components/Nav";
import { GridPattern } from "../components/magicui/grid-pattern";
import { cn } from "@/lib/utils";
import { ChevronRight, Github } from "lucide-react";
import { useNavigate } from "react-router-dom";

function home() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-screen bg-gradient-to-b from-[#0A0A0B] to-[#141415] overflow-hidden">
      <Nav />
      <div className="relative flex h-full w-full flex-col items-center justify-center rounded-lg">
        <GridPattern
          squares={[
            [4, 4],
            [5, 1],
            [8, 2],
            [5, 3],
            [5, 5],
            [10, 10],
            [12, 15],
            [15, 10],
            [10, 15],
            [15, 10],
            [10, 15],
            [15, 10],
          ]}
          className={cn(
            "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
            "inset-x-0 h-[120%]"
          )}
        />
        <div className="flex flex-col items-center justify-center gap-4">
          <button className="relative flex items-center justify-center w-60 h-14 overflow-hidden rounded-full bg-[#0E0E10] hover:bg-[#121214] transition-all duration-300">
            <div className="flex items-center gap-3">
              <Github className="text-[#83F180]" size={20} />
              <span className="text-white font-bold text-base">
                Proudly Open Source
              </span>
            </div>
            <div
              className="absolute inline-flex items-center justify-center rounded-full p-[1.4px] w-60 h-14"
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

          <h1 className="relative text-white text-6xl font-bold capitalize w-2/3 text-center">
            <span className="absolute top-0 left-0 text-base">Link's</span> Size🔗Does Matter because, Smaller🤏🏼is better
          </h1>
          <p
            className="text-white text-center text-xl w-1/3 pt-4 first-letter:uppercase
        "
          >
            our links are shorter than your attention span. track clicks easily
            as they are built to be shared.
          </p>

          <button className="relative flex items-center justify-center w-60 h-14 overflow-hidden rounded-full bg-gradient-to-b from-[#F6935D] to-[#EF6318] hover:from-[#F58C54] hover:to-[#E55000] transition-all duration-300 cursor-pointer"
          onClick={() => navigate("/dashboard")}>
            <div className="flex items-center justify-center gap-2 cursor-pointer">
              <span className="text-white font-bold text-lg">
                Let's Make it Short
              </span>
              <ChevronRight className="text-white" strokeWidth={2.5} size={22} strokeLinecap="square" strokeLinejoin="miter" />
            </div>
            <div
              className="absolute inline-flex items-center justify-center rounded-full p-[1px] w-60 h-14"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(255, 255, 255, 0.24), rgba(0, 0, 0, 0.24))",
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
        </div>
        <div className="absolute bottom-4 left-4 right-0 flex justify-start">
          <p className="text-white text-sm">Built with 🤍 by <span className="font-bold">Somraj</span></p>
        </div>
      </div>
    </div>
  );
}

export default home;
