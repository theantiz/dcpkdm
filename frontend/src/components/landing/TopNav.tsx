import React from "react";
import { Button } from "../ui/button";

export default function TopNav({ isNavScrolled, onLaunchBuilder }) {
  return (
    <nav
      className={`sticky top-0 z-40 page-shell transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isNavScrolled ? "pt-2" : "pt-3"
      }`}
    >
      <div
        className={`content-shell flex items-center justify-between backdrop-saturate-150 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isNavScrolled
            ? "rounded-[18px] py-2 px-3 sm:px-4 backdrop-blur-2xl bg-[#0b0a08]/84 shadow-[0_14px_36px_rgba(0,0,0,0.42)]"
            : "rounded-[22px] py-3 px-4 sm:px-5 backdrop-blur-xl bg-[#0a0908]/52 shadow-[0_8px_22px_rgba(0,0,0,0.28)]"
        }`}
      >
        <div
          className={`flex items-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isNavScrolled ? "gap-2.5" : "gap-3"
          }`}
        >
          <div
            className={`rounded-full bg-gradient-to-br from-[#caa86b] to-[#9c7b43] flex items-center justify-center text-[#0b0906] font-black transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isNavScrolled ? "h-8 w-8 text-sm" : "h-9 w-9 text-lg"
            }`}
          >
            DK
          </div>
          <div className="leading-tight">
            <p
              className={`font-semibold text-[#f5e8cf] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isNavScrolled ? "text-[13px]" : "text-sm"
              }`}
            >
              DCP-KDM
            </p>
            <p
              className={`text-[#caa86b]/70 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isNavScrolled ? "text-[10px] opacity-85" : "text-[11px]"
              }`}
            >
              Secure cinema delivery
            </p>
          </div>
        </div>
        <div className="transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
          <Button
            size={isNavScrolled ? "sm" : "default"}
            className={`rounded-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isNavScrolled ? "text-[11px] px-3" : "text-xs"
            }`}
            onClick={onLaunchBuilder}
          >
            Launch Builder
          </Button>
        </div>
      </div>
    </nav>
  );
}
