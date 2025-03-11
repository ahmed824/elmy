"use client";
import React from "react";
import Link from "next/link";
import { FaHome, FaList, FaEnvelope, FaUser, FaSignInAlt } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function MobileFooterNav() {
  const pathname = usePathname();
  const { t } = useTranslation();

  const navLinksLeft = [
    { href: "/categories", label: t("navbar.categories"), icon: FaList },
    { href: "/contact", label: t("navbar.contactUs"), icon: FaEnvelope },
  ];

  const navLinksRight = [
    { href: "/profile", label: t("navbar.profile"), icon: FaUser },
    { href: "/signin", label: "تسجيل الدخول", icon: FaSignInAlt },
  ];

  const isActiveLink = (path) => pathname === path;

  return (
    <div className="flex md:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[90%] bg-white/10 backdrop-blur-lg text-white py-2 shadow-xl rounded-2xl justify-between items-center z-[1000] border border-gray-300">
      <div className="container mx-auto">
        <div className="flex relative">
          {/* Left Side Links */}
          {navLinksLeft.map((link) => (
            <div className="flex-1" key={link.href}>
              <Link
                href={link.href}
                className={`flex flex-col items-center text-purple-800 transition-colors duration-300 hover:text-purple-400 ${
                  isActiveLink(link.href) ? "text-purple-400" : ""
                }`}
              >
                <link.icon className="text-xl mb-1" />
                <span className="text-xs text-center">{link.label}</span>
              </Link>
            </div>
          ))}

          {/* Home Link (Centered & Elevated) */}
          <div className="flex-1 relative flex justify-center">
            <Link
              href="/"
              className="absolute -top-6 bg-gradient-to-br from-purple-500 to-purple-700 w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <FaHome className="text-white text-2xl" />
            </Link>
          </div>

          {/* Right Side Links */}
          {navLinksRight.map((link) => (
            <div className="flex-1" key={link.href}>
              <Link
                href={link.href}
                className={`flex flex-col items-center text-purple-800 transition-colors duration-300 hover:text-purple-400 ${
                  isActiveLink(link.href) ? "text-purple-400" : ""
                }`}
              >
                <link.icon className="text-xl mb-1" />
                <span className="text-xs text-center">{link.label}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
