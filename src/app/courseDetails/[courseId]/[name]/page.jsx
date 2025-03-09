"use client"
import { useParams } from 'next/navigation';
import { useCourse } from '@/app/customKooks/useCourseDet';
import CourseDetailsClient from '@/app/components/courseDetails/CourseDetailsClient';
import { FaChevronLeft } from 'react-icons/fa';
import Image from 'next/image';
import Avatar from "@/images/profile.svg";
import { CiGlobe } from "react-icons/ci";
import { LuCalendar } from 'react-icons/lu';
import CardDetails from '@/app/components/courseDetails/CardDetails';
import Link from 'next/link';
import DotsLoader from '@/app/components/shared/DotsLoader';

export default function Page() {
    const { courseId, name } = useParams();
    const courseName = decodeURI(name);

    // Fetch course data
    const { data: course, isLoading, error } = useCourse(courseId);


    if (error) return <p>Error loading course: {error.message}</p>;
    if (isLoading) return <DotsLoader />;



    return (
        <div className=" ">
            {/* Breadcrumb & Header Section */}
            <div
                className="flex justify-center flex-col items-right min-h-[400px] px-6 py-8 md:px-12 md:py-16 -mt-[119px]"
                style={{
                    background: "linear-gradient(75deg, rgba(162, 57, 240, 0.4), #ffffff, rgba(248, 246, 207, 0.5))",
                    padding: "20px 100px",
                    paddingTop: "170px",
                }}
            >
                <div className="max-w-3xl">
                <p className="text-sm text-[#6B7385] flex items-center gap-1">
                    {course?.description} <FaChevronLeft className="text-xs" />
                    <span className="text-gray-500">{course?.title || courseName}</span>
                </p>

                <h1 className="text-[30px] font-medium mt-2 text-[#121D2F]">{course?.title || courseName}</h1>

                <p className="text-[#121D2F] text-[16px] mt-1 font-medium">
                    {course?.description}
                </p>

                {/* Course Info Section */}
                <div className="flex items-center gap-4 text-gray-600 text-sm mt-4">
                    <span className="flex items-center">
                        <span className="ml-1">0</span> ⭐⭐⭐⭐⭐
                    </span>
                    <span className='flex items-center gap-1'> <LuCalendar /> 02/06/2025</span>
                    <span className='flex items-center gap-1'><CiGlobe /> {course?.language || "عربي"}</span>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-2 mt-4">
                    <Image
                        src={course?.instructor?.avatar || Avatar}
                        width={30}
                        height={30}
                        className="rounded-full"
                        alt={course?.instructor?.name}
                    />
                    <span className="text-[#6B7385] text-sm">بواسطة {course?.instructor?.name}</span>
                    <Link href="/courseDetails" className="text-mainColor text-sm cursor-pointer z-20">
                        مشاهدة كل الدورات
                    </Link>
                </div>
                </div>
            </div>

            {/* Course Details */}
            <div className="px-6 md:px-12 py-6 flex justify-around">
                <div className='w-[60%]'>
                    <CourseDetailsClient course={course} />
                </div>
                <div className='-mt-72'>
                    <CardDetails courseId={courseId} course={course} />
                </div>
            </div>
        </div>
    );
}
