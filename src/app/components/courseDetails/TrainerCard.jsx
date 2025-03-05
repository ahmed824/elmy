"use client";
import React from "react";
import Image from "next/image";
import { IoVideocamOutline } from "react-icons/io5";
import teacher from "@/images/teacher.svg";
import { MdPeopleOutline } from "react-icons/md";

export default function TrainerCard() {
    return (
        <div className="bg-white shadow-md rounded-lg p-6 w-full  ">
            {/* Title */}
            <h3 className="text-right text-gray-700 font-semibold mb-2">مدرب</h3>

            {/* Divider */}
            <hr className="border-gray-200 mb-4" />


            {/* Trainer Info */}
            <div className="flex justify-start gap-8 items-center">
                {/* Trainer Image */}
                <div className="w-20 h-20 rounded-full overflow-hidden shadow-lg">
                    <Image
                        src={teacher}
                        alt="Trainer"
                        width={120}
                        height={120}
                        className="object-cover"
                    />
                </div>
                {/* Trainer Details */}
                <div className="text-right">
                    <h4 className="text-lg font-semibold text-gray-800">محمد ماهر</h4>
                    <div className="flex justify-end items-center text-gray-600 text-sm mt-1 space-x-2 rtl:space-x-reverse">
                        <IoVideocamOutline className="text-xl font-bold" />
                        <span>دورة</span>
                        <MdPeopleOutline className="text-xl font-bold" />
                        <span>متدرب</span>
                    </div>
                </div>

            </div>
        </div>
    );
}
