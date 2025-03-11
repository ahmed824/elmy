"use client";
import React, { useState } from 'react';
import { FaShoppingCart, FaPlay, FaUndoAlt, FaHourglassHalf } from 'react-icons/fa';
import { FiBookmark } from 'react-icons/fi';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import Image from 'next/image';
import SocialShare from '../shared/SocialShare/SocialShare';
import Table from './Table';
import { useAddToCart } from '@/app/customKooks/addToCart';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import AddToFav from '../shared/addToFav/AddToFav';


export default function CardDetails({ courseId, course }) {
    const [isVideoDialogOpen, setIsVideoDialogOpen] = useState(false);
    const { mutate: addToCart, isLoading } = useAddToCart();
    const router = useRouter();

    // Construct absolute URL for video
    const videoUrl = course.video_intro
        ? `${course.video_intro}`
        : '';


    const handleAddToCart = () => {
        addToCart(
            { courseId, lang: "ar" },
            {
                onSuccess: (data) => {
                    toast.success(data.message || "تمت إضافة الدورة إلى السلة بنجاح");
                },
                onError: (error) => {
                    toast.error(error.message || "حدث خطأ أثناء إضافة الدورة إلى السلة");
                },
            }
        );
    };

    const handleSubscribe = () => {
        addToCart(
            { courseId, lang: "ar" },
            {
                onSuccess: (data) => {
                    toast.success(data.message || "تمت إضافة الدورة إلى السلة بنجاح");
                    router.push("/cart");
                },
                onError: (error) => {
                    toast.error(error.message || "حدث خطأ أثناء إضافة الدورة إلى السلة");
                },
            }
        );
    };

    console.log("videoUrl", videoUrl);

    return (
        <div className="bg-white rounded-2xl shadow-lg p-4 max-w-sm mx-auto border-2 border-mainColor relative transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            {/* Bookmark Icon */}
            <AddToFav courseId={courseId} />

            <Dialog open={isVideoDialogOpen} onOpenChange={setIsVideoDialogOpen}>
                <div className="relative group">
                    <Image
                        src={course.image} 
                        alt="Course Preview"
                        width={300}
                        height={180}
                        className="rounded-lg w-full transition-opacity duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex flex-col items-center justify-between py-4 opacity-100 transition-opacity duration-300">
                        <div className="flex-grow flex items-center justify-center">
                            <DialogTrigger asChild>
                                <div
                                    className="bg-white p-5 rounded-full shadow-lg cursor-pointer transform transition-transform duration-200 hover:scale-110 animate-pulse-slow"
                                    onClick={() => setIsVideoDialogOpen(true)}
                                >
                                    <FaPlay className="text-purple-500 text-xl hover:text-purple-700" />
                                </div>
                            </DialogTrigger>
                        </div>
                        <DialogTrigger asChild>
                            <p
                                className="text-white text-center text-base font-medium transition-colors duration-200 hover:text-purple-300 cursor-pointer"
                                onClick={() => setIsVideoDialogOpen(true)}
                            >
                                معاينة هذه الدورة
                            </p>
                        </DialogTrigger>
                    </div>
                </div>

                <DialogContent className="sm:max-w-[625px]">
                    <DialogHeader>
                        <DialogTitle className="text-white">{course.title} - معاينة الدورة</DialogTitle>
                    </DialogHeader>
                    <div className="w-full">
                        {videoUrl && (
                            <video
                                controls
                                className="w-full rounded-lg"
                                src={videoUrl}
                            >
                                Your browser does not support the video tag.
                            </video>
                        )}
                    </div>
                </DialogContent>
            </Dialog>

            {/* Rest of the component remains the same as previous code */}
            <p className="text-right text-xl font-semibold text-purple-600 mt-3 transform transition-transform duration-200 hover:scale-105">
                {course.discount_price !== null ? (
                    <>
                        <span className="text-purple-600">
                            {course.discount_price} ريال
                        </span>
                        <span className="text-gray-500 line-through mx-2">
                            {course.price} ريال
                        </span>
                    </>
                ) : (
                    `${course.price} ريال`
                )}
            </p>

            <button
                onClick={handleAddToCart}
                disabled={isLoading}
                className="bg-gradient-to-r from-[#A436F0] via-[#637FEA] to-[#A436F0] text-white px-4 md:px-6 py-2 rounded-full flex justify-center items-center mt-4 gap-2 w-full transform transition-transform duration-200 hover:scale-105 hover:shadow-lg disabled:opacity-50"
            >
                {isLoading ? "جاري الإضافة..." : "الاضافة إلى السلة"}
                <FaShoppingCart className="text-sm text-white" />
            </button>

            <button
                onClick={handleSubscribe}
                disabled={isLoading}
                className="border border-gray-300 text-gray-700 text-xl font-medium w-full py-2 rounded-full mt-2 flex items-center justify-center transform transition-transform duration-200 hover:scale-105 hover:bg-purple-500 hover:text-white disabled:opacity-50"
            >
                {isLoading ? "جاري الاشتراك..." : "إشترك الآن"}
            </button>

            <p className="text-sm text-[#6B7385] text-[14px] font-medium flex items-center justify-center gap-1 mt-2 transform transition-transform duration-200 hover:scale-105">
                <FaUndoAlt className="text-gray-400" />
                ضمان استعادة الأموال لمدة 10 يومًا
            </p>

            <div className="mt-4">
                <Table course={course} />
            </div>

            <p className="text-center text-[#FF8F3C] mt-3 flex items-center justify-center gap-1 transform transition-transform duration-200 hover:scale-105">
                <FaHourglassHalf className="text-[#FF8F3C] text-xl animate-sand-fall" />
                مدة مشاهدة الدورة {course.duration}
            </p>

            <div className="mt-4">
                <SocialShare />
            </div>
        </div>
    );
}