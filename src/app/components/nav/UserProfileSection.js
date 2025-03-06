"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaRegBell } from "react-icons/fa";
import { CgShoppingCart } from "react-icons/cg";
import profile from "@/images/profile.svg";
import DotsLoader from "../shared/DotsLoader";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Import shadcn/ui dropdown components
import { IoIosArrowDown } from "react-icons/io";
import { useTranslation } from "react-i18next";

export default function UserProfileSection({ userData, isLoading, isError }) {
  const router = useRouter();
  const { t } = useTranslation();

  // Handle logout
  const handleLogout = () => {
    Cookies.remove("elmy_token"); // Remove the token
    router.push("/login"); // Redirect to login page
  };

  return (
    <div className="hidden lg:flex items-center gap-4 relative">
      {/* Cart Icon */}
      <Link href="/cart" className="text-black hover:text-purple-600 transition-colors">
        <CgShoppingCart className="text-lg" />
      </Link>

      {/* Notification Bell Icon */}
      <Link href="/notifications" className="text-black hover:text-purple-600 transition-colors">
        <FaRegBell className="text-lg" />
      </Link>

      {/* User Profile */}
      {isLoading ? (
        <DotsLoader />
      ) : isError ? (
        <span className="text-black">{t("loadingError")}</span>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 hover:text-purple-600 transition-colors">
              <Image
                src={userData?.data?.user?.image ? userData.data.user.image : profile}
                alt="Profile"
                width={32}
                height={32}
                className="rounded-full"
                quality={80}
              />
              <span>{userData?.data?.user?.name || t("user")}</span>
              <IoIosArrowDown />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 bg-white border border-gray-200 rounded-lg shadow-lg text-right">
            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer text-sm text-gray-700 hover:bg-gray-100 hover:text-purple-600 flex justify-end"
            >
              {t("navbar.logout")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}