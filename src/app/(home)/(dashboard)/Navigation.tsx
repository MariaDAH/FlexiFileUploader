import Link from "next/link";
import { menuItems } from "@/context/interfaces/menu-items";
import { useState } from "react";
import { Tooltip } from "./Tooltip";

interface INavigationProps {
  isCollapsed: boolean;
}

export const Navigation = ({ isCollapsed }: INavigationProps) => {
  const [hoveredItemIndex, setHoveredItemIndex] = useState<number | null>(null);

  return (
    <>
      <ul className="list-none">
        {menuItems.map((item, index) => (
          <>
            <li
              key={index}
              onMouseEnter={() => setHoveredItemIndex(index)}
              onKeyUp={() => setHoveredItemIndex(index)}
              onMouseLeave={() => setHoveredItemIndex(null)}
              onKeyDown={() => setHoveredItemIndex(null)}
            >
              <Link
                href={item.href}
                className=" text-base no-underline text-black p-3.5 pl-3.5 pr-4 flex items-center bg-gray-200 mb-4 rounded-lg active:text-slate-900 active:bg-slate-200 hover:bg-slate-900 hover:text-slate-50 "
              >
                <div className="inline-block text-2xl mr-2">{item.icon}</div>
                {!isCollapsed ? (
                  <span className="ml-2 dark:bg-red-300">{item.name}</span>
                ) : (
                  ""
                )}
              </Link>{" "}
            </li>
            {isCollapsed && hoveredItemIndex === index && (
              <Tooltip name={item.name} arrow={"arrow-left"}></Tooltip>
            )}
          </>
        ))}
      </ul>
    </>
  );
};
