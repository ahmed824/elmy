"use client";
import Link from "next/link";
import Image from "next/image";
import { FaShoppingCart, FaBell } from "react-icons/fa"; // Added icons for cart and notifications
import { HiX } from "react-icons/hi";
import { usePathname } from "next/navigation";
import Logo from "@/images/logo.svg";
import Cookies from "js-cookie"; // Import js-cookie to check token
import { useAuthProfile } from "@/app/customKooks/authProfile"; // Import useAuthProfile

export default function MobileNav({ isOpen, onClose }) {
  const pathname = usePathname();
  const token = Cookies.get("elmy_token"); // Check if user is logged in
  const isLoggedIn = !!token; // Boolean to determine login status

  // Fetch user data using useAuthProfile
  const { data: userData, isLoading } = useAuthProfile();

  const isActiveLink = (path) => {
    return pathname === path;
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Side Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-[80%] max-w-[400px] bg-white z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <button
            onClick={onClose}
            className="p-2 text-gray-600 hover:text-purple-600"
          >
            <HiX className="text-2xl" />
          </button>
          <Image src={Logo} alt="Elmy Logo" width={100} height={40} />
        </div>

        <div className="pt-6 px-6">
          {/* User Info Section (if logged in) */}
          {isLoggedIn && (
            <div className="mb-6 border-b pb-4">
              {isLoading ? (
                <span className="text-black">جاري التحميل...</span>
              ) : (
                <Link
                  href="/profile"
                  onClick={onClose}
                  className="flex items-center gap-3 hover:text-purple-600 transition-colors"
                >
                  {userData?.data?.image && (
                    <Image
                      src={userData.data.image} // Assuming API returns image URL
                      alt="Profile"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  )}
                  <span className="text-[16px] font-medium">
                    {userData?.data?.name || "المستخدم"}
                  </span>
                </Link>
              )}
            </div>
          )}

          {/* Navigation Links */}
          <ul className="flex flex-col items-start gap-6 text-black text-[16px] font-medium">
            {[
              { href: "/", label: "الرئيسية" },
              { href: "/how-we-work", label: "كيف نعمل" },
              { href: "/register-trainer", label: "التسجيل كمدرب" },
              { href: "/contact", label: "تواصل معنا" },
              { href: "/categories", label: "فئات الدورات" },
            ].map((link) => (
              <li key={link.href} className="w-full">
                <Link
                  href={link.href}
                  onClick={onClose}
                  className={`block w-full transition-all ${
                    isActiveLink(link.href)
                      ? "text-purple-600 bg-purple-100 px-4 py-2 rounded-lg"
                      : "hover:text-purple-600 hover:bg-purple-100 px-4 py-2 rounded-lg"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}

            {/* Conditional Links Based on Login Status */}
            {isLoggedIn ? (
              <>
                <li className="w-full">
                  <Link
                    href="/cart"
                    onClick={onClose}
                    className="flex items-center gap-2 w-full hover:text-purple-600 hover:bg-purple-100 px-4 py-2 rounded-lg transition-all"
                  >
                    <FaShoppingCart /> السلة
                  </Link>
                </li>
                <li className="w-full">
                  <Link
                    href="/notifications"
                    onClick={onClose}
                    className="flex items-center gap-2 w-full hover:text-purple-600 hover:bg-purple-100 px-4 py-2 rounded-lg transition-all"
                  >
                    <FaBell /> الإشعارات
                  </Link>
                </li>
              </>
            ) : (
              <li className="w-full">
                <Link
                  href="/login"
                  onClick={onClose}
                  className="block w-full hover:text-purple-600 hover:bg-purple-100 px-4 py-2 rounded-lg transition-all"
                >
                  تسجيل دخول
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}