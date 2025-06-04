import React from "react";
import Nav from "../components/Nav";
import { GridPattern } from "../components/magicui/grid-pattern";
import { cn } from "@/lib/utils";
import { ChevronRight, Github } from "lucide-react";
import { useNavigate, Outlet,useLocation  } from "react-router-dom";

function Layout() {
    const location = useLocation();
    const hscreenPaths = ['/','/login', '/forgot-password','/create-link'];
    const dataPaths = ['/dashboard', '/create-link'];


  return (
    <div className={`w-full ${hscreenPaths.includes(location.pathname) ? 'h-screen' : 'min-h-screen'} bg-gradient-to-b from-[#0A0A0B] to-[#141415] flex flex-col relative`}>
      <Nav />
      <div className="flex flex-col items-center relative justify-center w-full h-screen  overflow-y-hidden ">
        {!dataPaths.includes(location.pathname) && (
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
            "inset-x-0 h-[100%] scale-90"
          )}
        />
        )}
          <Outlet />
        
      </div>
        {!dataPaths.includes(location.pathname) && (
        <div className="w-full absolute bottom-4 left-0 right-0 flex justify-center sm:justify-start px-4">
          <p className="text-white text-sm">
            Built with 🤍 by <span className="font-bold">Somraj</span>
          </p>
        </div>
        )}
    </div>
  );
}

export default Layout;
