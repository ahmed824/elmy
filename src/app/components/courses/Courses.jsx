"use client"
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaTh, FaList } from "react-icons/fa";
import SidebarFilter from "./SidebarFilter";
import Image from "next/image";
import { FaPlay, FaBook, FaMoneyBillWave } from "react-icons/fa";
import { LuBookmark } from "react-icons/lu";
import PurpleButton from "../shared/btns/PurpleButton";
import { RatingStars } from "../shared/RatingStars";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useCourses } from "@/app/customKooks/getCourses";

export default function Courses({id , name}) {
    
    const router = useRouter();
    const [isListView, setIsListView] = useState(false);
    const [sortOption, setSortOption] = useState("الاحدث");
    const [filters, setFilters] = useState({
        lang: 'ar',
        category_id: id,
        level: '',
        per_page: 9, // Adjust this based on your API's default or desired value
        min_price: '',
        max_price: '',
        min_rating: '',
        search: '',
        sort_by: 'latest',
        page: 1 // Add page to filters
    });

    const handleResetCategory = () => {
        setFilters(prevFilters => ({
            ...prevFilters,
            category_id: 5
        }));
    };

    const sortMapping = {
        "الاحدث": "latest",
        "الاكثر طلبا": "popular",
        "الاعلى تقييما": "rating_desc",
        "السعر: الأقل للأعلى": "price_asc",
        "السعر: الأعلى للأقل": "price_desc"
    };

    useEffect(() => {
        setFilters(prev => ({
            ...prev,
            sort_by: sortMapping[sortOption] || "latest"
        }));
    }, [sortOption]);

    const { data: coursesQuery, isLoading, isError } = useCourses(filters);

    const handleCourseClick = (courseId, title) => {
        router.push(`/courseDetails/${courseId}/${title.replace(/\s+/g, "-")}`);
    };

    const handleFilterChange = (newFilters) => {
        setFilters(prev => ({
            ...prev,
            ...newFilters,
            page: 1 // Reset to page 1 when filters change
        }));
    };

    const handlePageChange = (page) => {
        setFilters(prev => ({
            ...prev,
            page
        }));
    };

    const courses = coursesQuery?.data?.data || [];
    const pagination = coursesQuery?.data?.pagination || {
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 0
    };

    // Generate pagination buttons
    const renderPagination = () => {
        const { current_page, last_page } = pagination;
        const pageButtons = [];
        const maxVisiblePages = 4; // Limit the number of visible page buttons

        let startPage = Math.max(1, current_page - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(last_page, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        // Previous Button
        pageButtons.push(
            <button
                key="prev"
                onClick={() => handlePageChange(current_page - 1)}
                disabled={current_page === 1}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${current_page === 1 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-purple-100 text-purple-600 hover:bg-purple-200"}`}
            >
                &lt;
            </button>
        );

        // Page Numbers
        for (let i = startPage; i <= endPage; i++) {
            pageButtons.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${i === current_page ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-purple-100"}`}
                >
                    {i}
                </button>
            );
        }

        // Next Button
        pageButtons.push(
            <button
                key="next"
                onClick={() => handlePageChange(current_page + 1)}
                disabled={current_page === last_page}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${current_page === last_page ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-purple-100 text-purple-600 hover:bg-purple-200"}`}
            >
                &gt;
            </button>
        );

        return pageButtons;
    };

    return (
        <>
            {/* Breadcrumb & Header Section */}
            <div
                className="flex justify-center flex-col pb-20 items-right min-h-[400px] px-6 py-8 md:px-12 md:py-16 -mt-[116px]"
                style={{
                    background: "linear-gradient(75deg, rgba(162, 57, 240, 0.4), #ffffff, rgba(248, 246, 207, 0.5))",
                    padding: "20px 100px",
                }}
            >
                <div className="w-full mt-20">
                    <h1 className="text-[30px] text-center font-medium text-[#121D2F]">{name}</h1>

                    <p className="text-[#121D2F] text-[16px] mt-12 font-medium">
                        {name}
                    </p>

                </div>
            </div>
            <div className="flex items-center justify-between container mt-8 m-auto">
                <div>
                    <span className="bg-purple-100 text-purple-600 px-3 py-1 text-xs rounded-full whitespace-nowrap">
                        تعلم أينما كنت
                    </span>
                    <h2 className="text-gray-900 text-lg font-bold text-center flex-1 mt-6">
                        فئات مرتبطه بـ {name}
                    </h2>
                </div>
                {/* <button onClick={handleResetCategory} className="bg-gradient-to-r from-[#A436F0] via-[#637FEA] to-[#A436F0] 
                    text-white px-4 md:px-6 py-2 rounded-full 
                    flex items-center gap-2 -mr-14 
                    shadow-lg transition-all duration-300 
                    hover:opacity-90 hover:scale-105 
                    hover:bg-gradient-to-r hover:from-[#7A2CD4] hover:via-[#4C6EDB] hover:to-[#7A2CD4]">
                    كل الفئات <FaArrowLeft className="text-white text-xs" />
                </button> */}
            </div>

            <div className="container m-auto mt-10 flex flex-col md:flex-row">
                <div className="w-full md:w-1/4 mb-6 md:mb-0">
                    <SidebarFilter
                        filters={filters}
                        onFilterChange={handleFilterChange}
                    />
                </div>

                <div className="w-full md:w-3/4 md:pl-6">
                    {isLoading ? (
                        <div className="text-center flex items-center content-center flex-col py-16">
                            <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                            <p className="mt-4 text-gray-600">جاري تحميل الدورات...</p>
                        </div>
                    ) : isError ? (
                        <div className="text-center flex items-center content-center flex-col py-16">
                            <p className="text-red-500">حدث خطأ أثناء تحميل الدورات. الرجاء المحاولة مرة أخرى.</p>
                        </div>
                    ) : (
                        <>
                            <div className="flex justify-between items-center mb-4">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button className="p-2 bg-purple-100 text-purple-600 rounded-full hover:bg-purple-200 transition-colors flex items-center gap-2">
                                            الترتيب على حسب: {sortOption}
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="min-w-[200px]">
                                        <DropdownMenuItem onClick={() => setSortOption("الاحدث")}>الاحدث</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => setSortOption("الاكثر طلبا")}>الاكثر طلبا</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => setSortOption("الاعلى تقييما")}>الاعلى تقييما</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => setSortOption("السعر: الأقل للأعلى")}>السعر: الأقل للأعلى</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => setSortOption("السعر: الأعلى للأقل")}>السعر: الأعلى للأقل</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <button
                                    onClick={() => setIsListView(!isListView)}
                                    className="p-2 bg-purple-100 text-purple-600 rounded-full hover:bg-purple-200 transition-colors"
                                >
                                    {isListView ? <FaTh /> : <FaList />}
                                </button>
                            </div>

                            <div className="mb-4 text-gray-600">
                                {pagination.total} دورة متاحة
                            </div>

                            {courses.length === 0 ? (
                                <div className="text-center py-16 bg-gray-50 rounded-xl">
                                    <p className="text-gray-500">لا توجد دورات متاحة بالفلاتر المحددة</p>
                                </div>
                            ) : (
                                <div className={`${isListView ? "space-y-6" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"}`}>
                                    {courses.map((course) => (
                                        <div
                                            key={course.id}
                                            className={`w-full bg-white border-2 border-purple-300 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl mx-auto ${isListView ? "flex" : ""}`}
                                        >
                                            <div className={`relative ${isListView ? "w-1/3 h-64" : "h-52"} group overflow-hidden`}>
                                                <Image
                                                    src={course.image || "/course-image.jpg"}
                                                    alt={course.title}
                                                    layout="fill"
                                                    objectFit="cover"
                                                    className="transition-transform duration-300 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                            <div className={`p-6 text-right flex flex-col justify-between ${isListView ? "w-2/3" : "h-[calc(100%-208px)]"}`}>
                                                <div>
                                                    <h3 className="text-xl font-bold text-[15px] text-gray-800 line-clamp-2 hover:line-clamp-none mb-4">
                                                        {course.title}
                                                    </h3>
                                                    <div className="flex flex-col gap-3">
                                                        <div className="flex items-center justify-start gap-2 text-gray-600 text-right">
                                                            <span className="flex items-center gap-2">
                                                                <FaPlay className="text-purple-600" />
                                                                <span className="text-purple-600">فيديوهات: <span className="text-black">22</span></span>
                                                            </span>
                                                            <span className="flex items-center gap-2">
                                                                <FaBook className="text-purple-600" />
                                                                <span className="text-purple-600">دروس: <span className="text-black">22</span></span>
                                                            </span>
                                                        </div>
                                                        <div className="text-sm text-gray-600">
                                                            المستوى: {course.level}
                                                        </div>
                                                        <div className="flex items-center justify-between gap-2 mb-4">
                                                            <RatingStars rating={course.rating} />
                                                            <span className="text-gray-600">({course.max_students} تقييمات)</span>
                                                        </div>
                                                        <div className="flex items-center justify-between mt-2">
                                                            <div className="flex items-center gap-2 text-purple-700 font-bold">
                                                                <FaMoneyBillWave className="text-purple-600" />
                                                                {course.discount_price ? (
                                                                    <div className="flex flex-col">
                                                                        <span className="line-through text-gray-400 text-sm">{course.price} ريال</span>
                                                                        <span>{course.discount_price} <span className='text-[#121D2F]'>ريال</span></span>
                                                                    </div>
                                                                ) : (
                                                                    <span>{course.price} <span className='text-[#121D2F]'>ريال</span></span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center mt-6">
                                                    <PurpleButton label="معرفة المزيد" onClick={() => handleCourseClick(course.id, course.title)} />
                                                    <button className="p-2 group hover:bg-purple-100 border-2 border-mainColor rounded-full transition-colors duration-300">
                                                        <LuBookmark className="text-mainColor text-2xl group-hover:scale-110 transition-transform" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {pagination.total > 0 && (
                                <div className="flex justify-center mt-10">
                                    <div className="flex gap-2">
                                        {renderPagination()}
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    );
}