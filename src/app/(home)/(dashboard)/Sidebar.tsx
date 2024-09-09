"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { SidebarContext } from "./SidebarContext";
import { Navigation } from "./Navigation";
import { useSession } from "next-auth/react";

export const Sidebar = () => {
  const { toggleSidebar, isCollapsed } = useContext(SidebarContext);
  const [isInitialized, setIsInitialized] = useState(false);

  const session = useSession();

  useEffect(() => {
    setIsInitialized(true);
  }, []);

  if (!isInitialized) {
    return null;
  }

  return (
    <>
      <div className="relative border-r z-10 ">
        <button
          className="absolute right-0 top-[4.7rem] border-black bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] w-6 h-6 border rounded-full flex justify-center items-center cursor-pointer transform translate-x-1/2 text-[1.5rem]"
          onClick={toggleSidebar}
        >
          {isCollapsed ? (
            <MdOutlineKeyboardArrowRight />
          ) : (
            <MdOutlineKeyboardArrowLeft />
          )}
        </button>
        <aside
          className={`h-full bg-[var(--color-bg-secondary)] p-4 transition-all duration-400 ease-[cubic-bezier(0.175, 0.885, 0.32, 1.1)] overflow-hidden dark:bg-black ${
            isCollapsed ? "w-[5.3rem]" : "w-[19rem]"
          }`}
        >
          <div className="w-max flex items-center gap-4 pb-4 mb-4 border-b ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 394 80"
              className={`w-[3.5rem] h-[3.5rem] object-contain rounded-2xl fill-[var(--color-text-primary)]
              `}
            >
              <path d="M262 0h68.5v12.7h-27.2v66.6h-13.6V12.7H262V0ZM149 0v12.7H94v20.4h44.3v12.6H94v21h55v12.6H80.5V0h68.7zm34.3 0h-17.8l63.8 79.4h17.9l-32-39.7 32-39.6h-17.9l-23 28.6-23-28.6zm18.3 56.7-9-11-27.1 33.7h17.8l18.3-22.7z" />
              <path d="M81 79.3 17 0H0v79.3h13.6V17l50.2 62.3H81Zm252.6-.4c-1 0-1.8-.4-2.5-1s-1.1-1.6-1.1-2.6.3-1.8 1-2.5 1.6-1 2.6-1 1.8.3 2.5 1a3.4 3.4 0 0 1 .6 4.3 3.7 3.7 0 0 1-3 1.8zm23.2-33.5h6v23.3c0 2.1-.4 4-1.3 5.5a9.1 9.1 0 0 1-3.8 3.5c-1.6.8-3.5 1.3-5.7 1.3-2 0-3.7-.4-5.3-1s-2.8-1.8-3.7-3.2c-.9-1.3-1.4-3-1.4-5h6c.1.8.3 1.6.7 2.2s1 1.2 1.6 1.5c.7.4 1.5.5 2.4.5 1 0 1.8-.2 2.4-.6a4 4 0 0 0 1.6-1.8c.3-.8.5-1.8.5-3V45.5zm30.9 9.1a4.4 4.4 0 0 0-2-3.3 7.5 7.5 0 0 0-4.3-1.1c-1.3 0-2.4.2-3.3.5-.9.4-1.6 1-2 1.6a3.5 3.5 0 0 0-.3 4c.3.5.7.9 1.3 1.2l1.8 1 2 .5 3.2.8c1.3.3 2.5.7 3.7 1.2a13 13 0 0 1 3.2 1.8 8.1 8.1 0 0 1 3 6.5c0 2-.5 3.7-1.5 5.1a10 10 0 0 1-4.4 3.5c-1.8.8-4.1 1.2-6.8 1.2-2.6 0-4.9-.4-6.8-1.2-2-.8-3.4-2-4.5-3.5a10 10 0 0 1-1.7-5.6h6a5 5 0 0 0 3.5 4.6c1 .4 2.2.6 3.4.6 1.3 0 2.5-.2 3.5-.6 1-.4 1.8-1 2.4-1.7a4 4 0 0 0 .8-2.4c0-.9-.2-1.6-.7-2.2a11 11 0 0 0-2.1-1.4l-3.2-1-3.8-1c-2.8-.7-5-1.7-6.6-3.2a7.2 7.2 0 0 1-2.4-5.7 8 8 0 0 1 1.7-5 10 10 0 0 1 4.3-3.5c2-.8 4-1.2 6.4-1.2 2.3 0 4.4.4 6.2 1.2 1.8.8 3.2 2 4.3 3.4 1 1.4 1.5 3 1.5 5h-5.8z" />
            </svg>
            {!isCollapsed ? (
              <p className="text-lg font-semibold text-[var(--color-text-secondary)]">
                {session.data?.user?.name}
              </p>
            ) : (
              ""
            )}
          </div>
          <Navigation isCollapsed={isCollapsed}></Navigation>
        </aside>
      </div>
    </>
  );
};
