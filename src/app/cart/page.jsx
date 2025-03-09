"use client";
import React, { useState } from "react";
import BreadCramp from "../components/shared/breadCramp/BreadCramp";
import Image from "next/image";
import { FaTrashAlt, FaShoppingCart } from "react-icons/fa";
// import { IoPlayOutline } from "react-icons/io5";
// import { BiBookAlt } from "react-icons/bi";
import { useGetCart } from "@/app/customKooks/getCart"; // Adjust path
import { useDeleteCourse } from "@/app/customKooks/deleteCourse"; // Adjust path
import { useCheckout } from "../customKooks/cartCheckout";
import { toast } from "react-toastify";
import Link from "next/link";
import DotsLoader from "../components/shared/DotsLoader";

export default function Page() {
    const [coupon, setCoupon] = useState(""); // State to hold the coupon code
    const { data, isLoading, isError } = useGetCart("ar");
    const cartData = data?.data || { items: [], total_items: 0, total_price: 0 };
    const { items, total_price } = cartData;

    const { mutate: deleteCourse, isLoading: isDeleting } = useDeleteCourse();
    const { mutate: checkout, isLoading: isCheckingOut } = useCheckout();

    const handleRemoveItem = (cartItemId) => {
        deleteCourse(
            { cartItemId },
            {
                onSuccess: (data) => {
                    toast.success(data.message || "تم إزالة الدورة من السلة بنجاح");
                },
                onError: (error) => {
                    toast.error(error.message || "حدث خطأ أثناء إزالة الدورة");
                },
            }
        );
    };

    const handleCheckout = () => {
        checkout({ coupon });
    };

    return (
        <div>
            <BreadCramp title="السلة" />

            <div className="container mx-auto px-4 py-8">
                {isLoading ? (
                    <DotsLoader />
                ) : isError ? (
                    <div className="text-center text-red-500">حدث خطأ أثناء جلب السلة</div>
                ) : items.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="flex justify-center mb-6">
                            <FaShoppingCart className="text-mainColor text-6xl opacity-70 animate-bounce-slow" />
                        </div>
                        <p className="text-[#121D2F] text-xl font-medium mb-4">
                            السلة فارغة
                        </p>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 bg-mainColor text-white px-6 py-3 rounded-full hover:bg-purple-700 transition-colors duration-300 shadow-md"
                        >
                            العودة إلى الرئيسية
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 12h18m-6-6l6 6-6 6"
                                />
                            </svg>
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
                        {/* Cart Items */}
                        <div className="w-full max-w-3xl">
                            {items.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center justify-between w-full p-4 bg-white hover:shadow-lg transition-shadow duration-300 border-b-2 border-gray-200 hover:border-purple-500 transform hover:-translate-y-1 transition-transform duration-300 flex-row-reverse"
                                >
                                    <button
                                        onClick={() => handleRemoveItem(item.id)}
                                        disabled={isDeleting}
                                        className="text-red-500 hover:text-red-700 text-2xl transition-colors duration-300 disabled:opacity-50"
                                    >
                                        <FaTrashAlt />
                                    </button>
                                    <div className="flex-grow px-4 text-right">
                                        <h2 className="text-lg font-semibold text-gray-900 hover:text-purple-600 transition-colors duration-300">
                                            {item.course.title}
                                        </h2>
                                        {/* <div className="flex items-center text-sm text-gray-500 mt-2">
                                            <IoPlayOutline className="text-mainColor ml-1" />
                                            <span className="ml-2 text-mainColor">
                                                فيديوهات: <span className="text-gray-500">33</span>
                                            </span>
                                            <span className="ml-2">|</span>
                                            <BiBookAlt className="text-mainColor ml-1" />
                                            <span className="text-mainColor">
                                                دروس: <span className="text-gray-500">14</span>
                                            </span>
                                        </div> */}
                                        <p className="mt-2 text-purple-600 font-bold hover:text-purple-700 transition-colors duration-300">
                                            {item.course.price} ريال
                                        </p>
                                    </div>
                                    <div className="w-24 h-16 relative overflow-hidden rounded-lg">
                                        <Image
                                            src={item.course.image || "/image.png"}
                                            alt={item.course.title}
                                            width={96}
                                            height={64}
                                            className="rounded-lg object-cover transform hover:scale-110 transition-transform duration-300"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Total Cost Card */}
                        <div className="max-w-sm w-full bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 transition-transform duration-300">
                            <h2 className="text-lg font-semibold text-gray-800 text-right hover:text-purple-600 transition-colors duration-300">
                                التكلفة الإجمالية
                            </h2>

                            <div className="mt-4 space-y-3">
                                <div className="flex justify-between items-center text-right">
                                    <span className="text-gray-500">إجمالي سعر الدورات</span>
                                    <span className="text-gray-800 font-bold">{total_price} ريال</span>
                                </div>

                                <div className="relative flex items-center bg-gray-100 px-2 py-1 rounded-full hover:bg-gray-200 transition-colors duration-300">
                                    <input
                                        type="text"
                                        placeholder="ادخل كود الخصم"
                                        value={coupon}
                                        onChange={(e) => setCoupon(e.target.value)} // Update coupon state
                                        className="bg-transparent flex-1 p-2 text-right text-gray-600 outline-none"
                                    />
                                    <button
                                        onClick={() => toast.info("تم تطبيق كود الخصم")} // Placeholder for applying coupon
                                        className="bg-gradient-to-r from-[#A436F0] via-[#637FEA] to-[#A436F0] text-white px-4 py-1 rounded-full hover:opacity-90 transition-opacity duration-300"
                                    >
                                        إرسال
                                    </button>
                                </div>

                                <div className="flex justify-between items-center text-right mt-2">
                                    <span className="text-gray-800 font-semibold">الإجمالي</span>
                                    <span className="text-gray-800 font-bold">{total_price} ريال</span>
                                </div>
                            </div>

                            <button
                                onClick={handleCheckout}
                                disabled={isCheckingOut || isLoading || items.length === 0}
                                className="w-full mt-4 bg-gradient-to-r from-[#A436F0] via-[#637FEA] to-[#A436F0] text-white text-lg font-semibold py-2 rounded-full hover:opacity-90 transition-opacity duration-300 disabled:opacity-50"
                            >
                                {isCheckingOut ? "جاري إتمام الشراء..." : "تأكيد الشراء"}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}