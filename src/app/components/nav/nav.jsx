"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import { SlGlobe } from "react-icons/sl";
import { HiMenu } from "react-icons/hi";
import Logo from "@/images/logo.svg";
import { usePathname, useRouter } from "next/navigation";
import MobileNav from "./MobileNav";
import SearchModal from "./SearchModal";
import CategoriesMenu from "./CategoriesMenu";
import { useLogo } from "@/app/customKooks/logo";
import Cookies from "js-cookie";
import { useAuthProfile } from "@/app/customKooks/authProfile";
import UserProfileSection from "./UserProfileSection"; // Import the new component
import { useTranslation } from "next-i18next";
import LanguageSwitcher from "./LanguageSwithcer";

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { t, i18n } = useTranslation();

  console.log("Current Language:", i18n.language);
  console.log("Available Languages:", i18n.languages);
  console.log("Translation Output:", t("navbar.home"));
  const { data: logoData } = useLogo();
  const { data: userData, isLoading, isError } = useAuthProfile();

  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const tokenValue = Cookies.get("elmy_token");
    setToken(tokenValue);
    setIsLoggedIn(!!tokenValue);
  }, []);

  const isActiveLink = (path) => {
    return pathname === path;
  };

  // Debug user data
  useEffect(() => {
    if (userData) {
      console.log("User Data:", userData);
      console.log("User Name:", userData?.data?.user?.name);
    }
  }, [userData]);

  // console.log(t("navbar.home"));

  if (!isClient) {
    return (
      <div className="w-full px-4 sm:px-6 lg:px-8 py-3 bg-transparent mt-8 sm:mt-11 overflow-hidden">
        <div className="flex items-center justify-between max-w-[1400px] mx-auto">
          <div className="flex items-center sm:gap-4">
            <Link href="/">
              <Image src={Logo} alt="Elmy Logo" width={122} height={50} />
            </Link>
            {logoData?.data?.logo && (
              <Image
                src={logoData.data.logo}
                alt="Logo"
                width={122}
                height={50}
              />
            )}
            <CategoriesMenu />
          </div>
          <ul className="hidden lg:flex items-center gap-6 text-black text-[16px] font-medium">
            {[
              { href: "/", label: t("navbar.home") },
              { href: "/how-we-work", label: t("navbar.howItWorks") },
              {
                href: "/register-trainer",
                label: t("navbar.registerAsInstructor"),
              },
              { href: "/contact", label: t("navbar.contactUs") },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`transition-all ${
                    isActiveLink(link.href)
                      ? "text-purple-600 bg-purple-100 px-3 py-1 rounded-lg"
                      : "hover:text-purple-600 hover:bg-purple-100 px-3 py-1 rounded-lg"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex gap-4 mt-2 items-center">
            <Link
              href="#"
              className="flex gap-1 hover:text-purple-600 transition-colors"
            >
              EN <SlGlobe className="text-lg" />
            </Link>
            <button className="flex gap-1 hover:text-purple-600 transition-colors">
              <FaSearch />
            </button>
            <Link
              href="/login"
              className="text-black hover:text-purple-600 transition-colors hidden lg:flex"
            >
              {t("navbar.login")}
            </Link>
            <button className="lg:hidden text-2xl">
              <HiMenu />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={`${isSearchOpen ? "backdrop-blur-sm" : ""}`}>
        <nav className="w-full px-4 sm:px-6 lg:px-8 py-3 bg-transparent mt-8 sm:mt-11">
          <div className="flex items-center justify-between max-w-[1400px] mx-auto">
            {/* Left Side: Logo and Vision */}
            <div className="flex items-center sm:gap-4">
              <Link href="/">
                <Image src={Logo} alt="Elmy Logo" width={122} height={50} />
              </Link>
              {logoData?.data?.logo && (
                <Image
                  src={logoData.data.logo}
                  alt="Logo"
                  width={122}
                  height={50}
                />
              )}
              <CategoriesMenu />
            </div>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center gap-6 text-black text-[16px] font-medium">
              {[
                { href: "/", label: t("navbar.home") },
                { href: "/how-we-work", label: t("navbar.howItWorks") },
                {
                  href: "/register-trainer",
                  label: t("navbar.registerAsInstructor"),
                },
                { href: "/contact", label: t("navbar.contactUs") },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`transition-all ${
                      isActiveLink(link.href)
                        ? "text-purple-600 bg-purple-100 px-3 py-1 rounded-lg"
                        : "hover:text-purple-600 hover:bg-purple-100 px-3 py-1 rounded-lg"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Right Side: Language, Search, and User Section */}
            <div className="flex gap-4 mt-2 items-center">
              {/* Language Switch */}
              <LanguageSwitcher />

              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex gap-1 hover:text-purple-600 transition-colors"
              >
                <FaSearch />
              </button>

              {/* Conditional Rendering Based on Login Status */}
              {isLoggedIn ? (
                <UserProfileSection
                  userData={userData}
                  isLoading={isLoading}
                  isError={isError}
                />
              ) : (
                <Link
                  href="/login"
                  className="text-black hover:text-purple-600 transition-colors hidden lg:flex"
                >
                  تسجيل دخول
                </Link>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden text-2xl"
              >
                <HiMenu />
              </button>
            </div>
          </div>

          {/* Mobile Navigation Component */}
          <MobileNav isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </nav>
      </div>

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
