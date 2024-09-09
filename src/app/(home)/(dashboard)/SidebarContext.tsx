"use client";

import { createContext, ReactNode, useState } from "react";

const initialValue = { isCollapsed: false, toggleSidebar: () => {} };

export const SidebarContext = createContext(initialValue);

interface Props {
  children: ReactNode | ReactNode[];
}

const SidebarProvider = ({ children }: Props) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const storedValue = localStorage.getItem("isSidebarCollapsed");
      return storedValue === "true";
    }
    return false;
  });

  const toggleSidebar = () => {
    setIsCollapsed((prev) => {
      const newValue = !prev;
      if (typeof window !== "undefined") {
        localStorage.setItem("isSidebarCollapsed", newValue.toString());
      }
      return newValue;
    });
  };

  return (
    <SidebarContext.Provider value={{ isCollapsed, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarProvider;
