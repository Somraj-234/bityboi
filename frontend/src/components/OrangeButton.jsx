import { ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import React from 'react'

function OrangeButton({ 
  isIcon = true,
  Icon = "ChevronRight",
  width = "w-60",
  type = "button",
  text = "Let's Make it Short",
  loadingText = "Loading...",
  isLoading = false,
  to = "/dashboard",
  fromGradient = "#F6935D",
  toGradient = "#EF6318", 
  hoverFromGradient = "#F58C54",
  hoverToGradient = "#E55000",
  textColor = "white",
  rounded = "rounded-full"
}) {
  const navigate = useNavigate();
    
  return (
    <div>
        <button
            type={type}
            className={`relative flex items-center justify-center ${width} h-14 overflow-hidden ${rounded} transition-all duration-300 cursor-pointer`}
            style={{
              background: `linear-gradient(to bottom, ${fromGradient}, ${toGradient})`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = `linear-gradient(to bottom, ${hoverFromGradient}, ${hoverToGradient})`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = `linear-gradient(to bottom, ${fromGradient}, ${toGradient})`;
            }}
            onClick={() => type !== "submit" && navigate(to)}
          >
            <div className="flex items-center justify-center gap-2 cursor-pointer">
              <span className={`text-${textColor} font-bold text-base`}>
                {isLoading ? loadingText : text }
              </span>

                {isIcon && <Icon
                    className={`text-${textColor}`}
                    strokeWidth={2.5}
                    size={22}
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                />}
            </div>
            <div
              className={`absolute inline-flex items-center justify-center ${rounded} p-[1px] ${width} h-14`}
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
  )
}

export default OrangeButton