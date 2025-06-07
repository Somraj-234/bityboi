import React, { useState, useRef, useEffect, use } from "react";
import { Link } from "react-router-dom";
import { LogOut, Plus, Star, UserRound } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getUser } from "@/api/api";

function Nav() {
  const {logout} = useAuth();
  const location = useLocation();
  const dataPaths = ['/dashboard', '/create-link'];
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState('');

  useEffect(()=>{
    const handleClickOutside = (event)=>{
      if(dropdownRef.current && !dropdownRef.current.contains(event.target)){
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return ()=>{
      document.removeEventListener('mousedown', handleClickOutside);
    }
    
  },[])

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUser();
        setUser(user.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="nav w-full h-20 sm:h-20 pt-4 bg-[#0D0D0D] border-b border-white/10">
        <div className="flex items-center justify-between gap-4 bg-transparent border-white/10 text-white pb-4 sm:px-16 px-4">
      <div className="logo">
        <Link to="/">
          <div className="cursor-pointer flex items-end text-2xl sm:text-4xl font-bold gap-1 font-quanty">
            BityBoi
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#FF6E20] rounded-full mb-1.5" />
          </div>
        </Link>
      </div>
      <div>
        {dataPaths.includes(location.pathname) ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-[#1a1a1b] hover:bg-[#161616] transition-all duration-300 px-4 py-3 rounded-lg cursor-pointer text-sm sm:text-base" onClick={()=>navigate('/create-link')}>
              Create New <Plus className="w-4 h-4 sm:w-5 sm:h-5"/>
            </div>
            <div className="relative">
              <div
                className="w-11 sm:w-12 h-11 sm:h-12 rounded-full bg-[#1a1a1b] hover:bg-[#161616] flex items-center justify-center cursor-pointer"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <UserRound className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              {showDropdown && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 mt-2 w-80 bg-[#1a1a1b]  border border-white/10 rounded-xl shadow-lg z-50 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col items-center justify-start"
                >
                  <div className="flex items-center justify-start gap-2 w-full text-left px-4 py-2 hover:bg-[#161616]">
                    <UserRound className="w-5 h-5 sm:w-8 sm:h-8" strokeWidth={1.5}/>      
                    <div>
                      <p className="text-white/70 text-sm sm:text-base font-bold">
                        {user.username}
                      </p>
                      <p className="text-white/50 text-xs sm:text-sm truncate max-w-[100px] sm:max-w-60">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <button
                    className="flex items-center justify-start gap-2 w-full text-left px-4 py-2 text-red-400 cursor-pointer hover:bg-[#161616]"
                    onClick={logout}
                  >
                    Logout <LogOut size={20}/>
                  </button>
                </div>
              )}
            </div>
          </div>
        ):(
          <div className="flex items-center gap-4">
            <Link to="https://x.com/somrajjj" target="_blank">
        <button className="relative flex items-center justify-center w-10 sm:w-12 h-10 sm:h-12 overflow-hidden rounded-lg sm:rounded-lg bg-[#0E0E10]/60 hover:bg-[#121214] transition-all duration-300 cursor-pointer">
        <img src="./x.svg" alt="" className="w-4 h-4 sm:w-5 sm:h-5" />
          <div
            className="absolute inline-flex items-center justify-center rounded-lg sm:rounded-lg p-[1.4px] w-10 sm:w-12 h-10 sm:h-12"
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
        <button className="relative flex items-center justify-center w-44 sm:w-48 h-10 sm:h-12 overflow-hidden rounded-lg sm:rounded-lg bg-[#0E0E10]/60 hover:bg-[#121214] transition-all duration-300 cursor-pointer">
        <div className="flex items-center gap-3">
            <Star fill="white" className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-white font-bold text-sm sm:text-base">
              Star This Project
            </span>
          </div>
          <div
              className="absolute inline-flex items-center justify-center rounded-lg sm:rounded-lg p-[1.4px] w-44 sm:w-48 h-10 sm:h-12"
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
        )}
      </div>
      </div>
    </div>
  );
}

export default Nav;
