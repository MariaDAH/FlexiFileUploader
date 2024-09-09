import { HiCloudUpload, HiOutlineHome, HiOutlineLogout } from "react-icons/hi";
import { IoMdAnalytics } from "react-icons/io";

export const menuItems = [
  {
    name: "Home",
    href: "/",
    icon: <HiOutlineHome />,
  },
  {
    name: "Uploader",
    href: "/uploader",
    icon: <HiCloudUpload />,
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: <IoMdAnalytics />,
  },
  {
    name: "Logout",
    href: "/logout",
    icon: <HiOutlineLogout />,
  },
];
