"use client";
import React from "react";
import Link from "next/link";
import { FaHome, FaList, FaEnvelope, FaUser, FaSearch } from "react-icons/fa"; // Icons for navigation
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function MobileFooterNav() {
  const pathname = usePathname();
  const { t } = useTranslation();

  const navLinks = [
    { href: "/", label: t("navbar.home"), icon: FaHome },
    { href: "/categories", label: t("navbar.categories"), icon: FaList }, // Assuming a categories page
    { href: "/contact", label: t("navbar.contactUs"), icon: FaEnvelope },
    { href: "/register", label: t("navbar.login"), icon: FaUser },
    // Optionally add search if you want a search icon in the footer
    // { href: "#", label: t("navbar.search"), icon: FaSearch },
  ];

  const isActiveLink = (path) => {
    return pathname === path;
  };

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-background text-white p-2 shadow-lg lg:hidden z-50">
      <ul className="flex justify-around items-center">
        {navLinks.map((link) => (
          <li key={link.href} className="flex flex-col items-center">
            <Link
              href={link.href}
              className={`flex flex-col items-center p-2 rounded-lg transition-all ${
                isActiveLink(link.href)
                  ? "text-purple-600 bg-purple-100"
                  : "text-gray-300 hover:text-purple-600 hover:bg-purple-100"
              }`}
              aria-label={link.label}
            >
              <link.icon className="text-xl mb-1" />
              <span className="text-xs text-center">{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
