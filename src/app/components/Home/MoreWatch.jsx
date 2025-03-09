'use client';
import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { LuBookmark } from 'react-icons/lu';
import PurpleButton from '../shared/btns/PurpleButton';
import { FaBook, FaMoneyBillWave, FaPlay, FaStar } from 'react-icons/fa';
import { useCourses } from '@/app/customKooks/useCourses';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { RatingStars } from '../shared/RatingStars';


export default function MoreWatch() {
    const { t } = useTranslation();
    const router = useRouter();
    const { data, isLoading, isError } = useCourses({ lang: 'ar', filter: 'popular' });

    if (isLoading) {
        return <div className="text-center py-10">{t('moreWatch.loading')}</div>;
    }

    if (isError) {
        return <div className="text-center py-10 text-red-500">{t('moreWatch.error')}</div>;
    }

    const courses = data?.data || [];

    const handleCourseClick = (courseId, name) => {
        router.push(`/courseDetails/${courseId}/${name.replace(/\s+/g, "-")}`);
    };

    return (
        <section className="container mx-auto px-4 my-10 overflow-hidden">
            <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-purple-600 mb-4">
                    {t('moreWatch.mostWatchedCourses')}
                </h2>
                <div className="border-b-2 border-purple-600 w-32 mx-auto mb-8"></div>
            </div>

            <div className="more-watch-swiper">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={30}
                    navigation
                    pagination={{
                        clickable: true,
                        el: '.more-watch-pagination',
                    }}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    className="py-8 relative"
                >
                    {courses.map((course) => (
                        <SwiperSlide key={course.id}>
                            <div className="bg-white border-2 border-purple-300 rounded-xl shadow-lg overflow-hidden w-full max-w-sm transition-all duration-300 hover:scale-105 hover:shadow-xl mx-auto my-8 h-[500px]">
                                <div className="relative h-52 group overflow-hidden">
                                    <Image
                                        src={course.image}
                                        alt={course.name || t('moreWatch.courseImage')}
                                        layout="fill"
                                        objectFit="cover"
                                        className="transition-transform duration-300 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>

                                <div className="p-6 text-right h-[calc(100%-208px)] flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-xl font-bold text-[15px] text-gray-800 line-clamp-2 hover:line-clamp-none mb-4">
                                            {course.name}
                                        </h3>

                                        <div className="flex flex-col gap-3">
                                            <div className="flex items-center justify-start gap-2 text-gray-600 text-right">
                                                <span className="flex items-center gap-2">
                                                    <FaPlay className="text-purple-600" />
                                                    <span className="text-purple-600">{t('moreWatch.videos')}: <span className="text-black">22</span></span>
                                                </span>
                                                <span className="flex items-center gap-2">
                                                    <FaBook className="text-purple-600" />
                                                    <span className="text-purple-600">{t('moreWatch.lessons')}: <span className="text-black">22</span></span>
                                                </span>
                                            </div>

                                            {/* Rating Stars */}
                                            <div className="flex items-center justify-between gap-2 mb-4">
                                                <RatingStars rating={course.rating} />
                                                <span className="text-gray-600">({course.enrollments} {t('moreWatch.ratings')})</span>
                                            </div>

                                            <div className="flex items-center justify-between mt-2">
                                                <div className="flex items-center gap-2 text-purple-700 font-bold">
                                                    <FaMoneyBillWave className="text-purple-600" />
                                                    <span>{course.price} <span className='text-[#121D2F] '>{t('moreWatch.price')}</span></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center mt-6">
                                        <PurpleButton label={t('moreWatch.learnMore')} onClick={() => handleCourseClick(course.id, course.name)} />
                                        <button className="p-2 group hover:bg-purple-100 border-2 border-mainColor rounded-full transition-colors duration-300">
                                            <LuBookmark className="text-mainColor text-2xl group-hover:scale-110 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="more-watch-pagination flex justify-center mt-4"></div>
            </div>

            <style jsx>{`
                .more-watch-swiper :global(.more-watch-pagination .swiper-pagination-bullet) {
                    width: 12px !important;
                    height: 12px !important;
                    background-color: #d1d5db !important;
                    opacity: 1 !important;
                    transition: all 0.3s ease !important;
                    margin: 0 4px !important;
                }

                .more-watch-swiper :global(.more-watch-pagination .swiper-pagination-bullet-active) {
                    background-color: #9333ea !important;
                    width: 24px !important;
                    border-radius: 6px !important;
                }
            `}</style>
        </section>
    );
}