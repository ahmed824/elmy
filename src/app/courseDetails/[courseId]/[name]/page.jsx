"use client";
import { useParams } from 'next/navigation';
import { useCourse } from '@/app/customKooks/useCourseDet';
import CourseDetailsClient from '@/app/components/courseDetails/CourseDetailsClient';
import { FaChevronLeft } from 'react-icons/fa';
import Image from 'next/image';
import Avatar from "@/images/profile.svg";
import CardDetails from '@/app/components/courseDetails/CardDetails';
import DotsLoader from '@/app/components/shared/DotsLoader';

export default function Page() {
    const { courseId, name } = useParams();
    const courseName = decodeURI(name);

    // Fetch course data
    const { data: course, isLoading, error } = useCourse(courseId);

    if (error) return <p>Error loading course: {error.message}</p>;
    if (isLoading) return <DotsLoader />;

    return (
        <div className="bg-white">
            {/* Breadcrumb & Header Section */}
            <div
                className="flex justify-center flex-col items-center md:items-start min-h-[400px] px-4 py-8 md:px-12 md:py-16 -mt-[119px]"
                style={{
                    background: "linear-gradient(75deg, rgba(162, 57, 240, 0.4), #ffffff, rgba(248, 246, 207, 0.5))",
                    paddingTop: "170px",
                }}
            >
                <div className="max-w-3xl w-full">
                    {/* Breadcrumb */}
                    <p className="text-sm text-[#6B7385] flex items-center gap-1">
                        {course?.description} <FaChevronLeft className="text-xs" />
                        <span className="text-gray-500">{course?.title || courseName}</span>
                    </p>

                    {/* Course Title */}
                    <h1 className="text-2xl md:text-[30px] font-medium mt-2 text-[#121D2F]">
                        {course?.title || courseName}
                    </h1>

                    {/* Course Description */}
                    <p className="text-[#121D2F] text-base md:text-[16px] mt-1 font-medium">
                        {course?.description}
                    </p>

                    {/* Course Info Section */}
                    <div className="flex items-center gap-4 text-gray-600 text-sm mt-4">
                        <span className="flex items-center">
                            <span className="ml-1">{course?.rating?.average}</span>
                            {Array.from({ length: Math.round(course?.rating?.average || 0) }).map((_, i) => (
                                <span key={i}>⭐</span>
                            ))}
                        </span>
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
                        <span className="text-[#6B7385] text-sm">
                            بواسطة {course?.instructor?.name}
                        </span>
                    </div>
                </div>
            </div>

            {/* Course Details */}
            <div className="px-4 md:px-12 py-6 flex flex-col-reverse md:flex-row justify-around gap-6">
                {/* Course Content */}
                <div className="w-full md:w-[60%]">
                    <CourseDetailsClient course={course} />
                </div>

                {/* Card Details */}
                <div className="w-full md:w-[35%] mt-2 md:-mt-72">
                    <CardDetails courseId={courseId} course={course} />
                </div>
            </div>
        </div>
    );
}