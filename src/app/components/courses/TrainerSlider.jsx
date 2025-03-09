"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import { RiBookShelfLine } from "react-icons/ri";
import { IoIosPeople } from "react-icons/io";
import Avatar from "@/images/profile.svg";
import { useInstructors } from "@/app/customKooks/getInstructors";

const TrainerCarousel = () => {
    const { data: instructorsData, isLoading, isError } = useInstructors(10, "ar");

    if (isLoading) {
        return (
            <div className="py-12 container mx-auto px-4 text-center">
                <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="mt-4 text-gray-600">جاري تحميل المدربين...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="py-12 container mx-auto px-4 text-center">
                <p className="text-red-500">حدث خطأ أثناء تحميل المدربين. الرجاء المحاولة لاحقًا.</p>
            </div>
        );
    }

    const trainers = instructorsData?.data?.map((instructor) => ({
        id: instructor.id,
        name: instructor.name,
        title: "",  
        courses: instructor.statistics.courses_count.value,
        students: instructor.statistics.students_count.value,
        image: null,  
    })) || [];

    return (
        <div className="py-12 mt-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8">
                    <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm">
                        تعلم أينما كنت
                    </span>
                    <h2 className="text-3xl font-bold mt-2 text-center">
                        أشهر المدربين المحترفين
                    </h2>
                </div>

                <Swiper
                    modules={[Pagination, Navigation]}
                    spaceBetween={20}
                    slidesPerView={1}
                    pagination={{
                        clickable: true,
                        bulletClass: "swiper-pagination-bullet",
                        bulletActiveClass: "swiper-pagination-bullet-active",
                        el: ".swiper-custom-pagination",
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                    }}
                    style={{ paddingBottom: "30px" }}
                >
                    {trainers.map((trainer) => (
                        <SwiperSlide key={trainer.id}>
                            <div className="bg-white rounded-lg shadow-md text-right rtl">
                                <div className="p-6 flex items-center">
                                    <div className="w-16 h-16 rounded-full overflow-hidden relative shrink-0">
                                        <Image
                                            src={trainer.image ? trainer.image : Avatar}
                                            alt={trainer.name}
                                            layout="fill"
                                            objectFit="cover"
                                            className="rounded-full"
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold">{trainer.name}</h3>
                                        <p className="text-gray-600 text-sm">{trainer.title}</p>
                                        <div className="mt-3 flex items-center">
                                            <div className="flex items-center ml-4">
                                                <RiBookShelfLine className="text-mainColor mx-1" />
                                                <span className="text-gray-700">{trainer.courses}</span>
                                                <span className="text-gray-500 mr-1">دورة</span>
                                            </div>
                                            <div className="flex items-center">
                                                <IoIosPeople className="text-mainColor mx-1" />
                                                <span className="text-gray-700">{trainer.students}</span>
                                                <span className="text-gray-500 mr-1">متدرب</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Custom pagination */}
                <div className="swiper-custom-pagination flex justify-center gap-1 mt-4"></div>
            </div>

            {/* Custom Pagination Styles */}
            <style jsx global>{`
        .swiper-pagination-bullet {
          background: #d1d5db; /* Gray color for inactive dots */
          opacity: 1;
          width: 8px;
          height: 8px;
          margin: 0 4px;
        }
        .swiper-pagination-bullet-active {
          background: #a855f7; /* Purple color for active dot */
          width: 8px;
          height: 8px;
        }
        .swiper-pagination {
          margin-top: 20px;
        }
      `}</style>
        </div>
    );
};

export default TrainerCarousel;