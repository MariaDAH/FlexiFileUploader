import { HiCloudUpload, HiOutlineHome, HiOutlineLogout } from "react-icons/hi";
import { IoMdAnalytics } from "react-icons/io";
import {Route} from 'next';
import {IconType} from 'react-icons';

interface MenuItem {
  name: string;
  href: Route;
  icon: IconType;
}

export const menuItems: MenuItem[] = [
  {
    name: "Home",
    href: "/",
    icon: HiOutlineHome,
  },
  {
    name: "Uploader",
    href: "/uploader",
    icon: HiCloudUpload,
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: IoMdAnalytics,
  },
  {
    name: "Logout",
    href: "/logout",
    icon: HiOutlineLogout,
  },
];
